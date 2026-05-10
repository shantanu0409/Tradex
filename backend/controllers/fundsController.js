const {
  addFunds,
  withdrawFunds,
  getBalance,
} = require("../services/fundsService");

const add = async (
  req,
  res,
  next
) => {
  try {
    const {
      userId,
      amount,
    } = req.body;

    const user =
      await addFunds(
        userId,
        amount
      );

    req.app
      .get("io")
      .emit(
        "balanceUpdated",
        {
          userId:
            user._id,
          balance:
            user.balance,
        }
      );

    res.json({
      message:
        "Funds Added",
      balance:
        user.balance,
    });
  } catch (error) {
    next(error);
  }
};

const withdraw = async (
  req,
  res,
  next
) => {
  try {
    const {
      userId,
      amount,
    } = req.body;

    const user =
      await withdrawFunds(
        userId,
        amount
      );

    req.app
      .get("io")
      .emit(
        "balanceUpdated",
        {
          userId:
            user._id,
          balance:
            user.balance,
        }
      );

    res.json({
      message:
        "Withdraw Successful",
      balance:
        user.balance,
    });
  } catch (error) {
    next(error);
  }
};

const balance = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await getBalance(
        req.params.userId
      );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  withdraw,
  balance,
};