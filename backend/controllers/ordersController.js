const {
  getOrders,
  cancelOrder,
} = require("../services/ordersService");

const getAll = async (
  req,
  res,
  next
) => {
  try {
    const orders =
      await getOrders(
        req.query.userId
      );
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const cancel = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await cancelOrder(
        req.params.id
      );

    req.app
      .get("io")
      .emit(
        "orderCancelled",
        req.params.id
      );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Temporary placeholder.
// We will move your existing /newOrder logic here.
const {
  OrdersModel,
} = require("../model/OrdersModel");
const {
  UserModel,
} = require("../model/UserModel");
const {
  HoldingsModel,
} = require("../model/HoldingsModel");

const create = async (
  req,
  res,
  next
) => {
  try {
    const io =
      req.app.get("io");

    const user =
      await UserModel.findById(
        req.body.userId
      );

    if (!user) {
      return res
        .status(404)
        .json({
          message:
            "User not found",
        });
    }

    const qty = Number(
      req.body.qty
    );
    const price = Number(
      req.body.price
    );
    const orderValue =
      qty * price;

    // BUY: Check and deduct balance
    if (
      req.body.mode ===
      "BUY"
    ) {
      if (
        user.balance <
        orderValue
      ) {
        return res
          .status(400)
          .json({
            message:
              "Insufficient Balance",
          });
      }

      user.balance -=
        orderValue;
      await user.save();

      io.emit(
        "balanceUpdated",
        {
          userId:
            user._id,
          balance:
            user.balance,
        }
      );
    }

    // Create pending order
    const newOrder =
      new OrdersModel({
        userId:
          user._id,
        name:
          req.body.name,
        qty,
        price,
        mode:
          req.body.mode,
        status:
          "PENDING",
      });

    await newOrder.save();

    io.emit(
      "newOrder",
      newOrder
    );

    // Execute order after 15 seconds
    setTimeout(
      async () => {
        try {
          await OrdersModel.findByIdAndUpdate(
            newOrder._id,
            {
              status:
                "EXECUTED",
            }
          );

          let existingHolding =
            await HoldingsModel.findOne(
              {
                userId:
                  user._id,
                name:
                  newOrder.name,
              }
            );

          // BUY logic
          if (
            newOrder.mode ===
            "BUY"
          ) {
            if (
              existingHolding
            ) {
              const totalQty =
                existingHolding.qty +
                newOrder.qty;

              const newAvg =
                (
                  existingHolding.avg *
                    existingHolding.qty +
                  newOrder.price *
                    newOrder.qty
                ) / totalQty;

              existingHolding.qty =
                totalQty;
              existingHolding.avg =
                newAvg;
              existingHolding.price =
                newOrder.price;
              existingHolding.symbol =
                newOrder.name;

              await existingHolding.save();
            } else {
              const holding =
                new HoldingsModel({
                  userId:
                    user._id,
                  symbol:
                    newOrder.name,
                  name:
                    newOrder.name,
                  qty:
                    newOrder.qty,
                  avg:
                    newOrder.price,
                  price:
                    newOrder.price,
                  net:
                    "+0%",
                  day:
                    "+0%",
                });

              await holding.save();
            }
          }

          // SELL logic
          if (
            newOrder.mode ===
            "SELL"
          ) {
            const sellValue =
              newOrder.qty *
              newOrder.price;

            user.balance +=
              sellValue;
            await user.save();

            io.emit(
              "balanceUpdated",
              {
                userId:
                  user._id,
                balance:
                  user.balance,
              }
            );

            if (
              existingHolding
            ) {
              existingHolding.qty -=
                newOrder.qty;

              existingHolding.price =
                newOrder.price;

              if (
                existingHolding.qty <=
                0
              ) {
                await HoldingsModel.deleteOne(
                  {
                    _id:
                      existingHolding._id,
                  }
                );
              } else {
                await existingHolding.save();
              }
            }
          }

          const updatedOrder =
            await OrdersModel.findById(
              newOrder._id
            );

          io.emit(
            "orderExecuted",
            updatedOrder
          );

          io.emit(
            "portfolioUpdated"
          );
        } catch (err) {
          console.log(
            "Execution Error:",
            err.message
          );
        }
      },
      15000
    );

    res.json({
      message:
        "Order Placed!",
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  cancel,
  create,
};