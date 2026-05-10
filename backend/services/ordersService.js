const {
  OrdersModel,
} = require("../model/OrdersModel");

const getOrders = async (userId) => {
  return await OrdersModel.find({
    userId,
  });
};

const cancelOrder = async (id) => {
  const order =
    await OrdersModel.findById(id);

  if (!order) {
    const error = new Error(
      "Order not found"
    );
    error.statusCode = 404;
    throw error;
  }

  if (
    order.status ===
    "EXECUTED"
  ) {
    const error = new Error(
      "Executed orders cannot be cancelled"
    );
    error.statusCode = 400;
    throw error;
  }

  await OrdersModel.findByIdAndDelete(
    id
  );

  return {
    message:
      "Order Cancelled",
  };
};

module.exports = {
  getOrders,
  cancelOrder,
};