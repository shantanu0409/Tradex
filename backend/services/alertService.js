const {
  AlertModel,
} = require("../model/AlertModel");

const createAlert = async ({
  userId,
  symbol,
  condition,
  targetPrice,
}) => {
  const alert = new AlertModel({
    userId,
    symbol: symbol.toUpperCase(),
    condition,
    targetPrice: Number(targetPrice),
  });

  await alert.save();

  return {
    message:
      "Alert created successfully",
    alert,
  };
};

const getUserAlerts = async (
  userId
) => {
  return await AlertModel.find({
    userId,
  }).sort({ createdAt: -1 });
};

const deleteAlert = async (id) => {
  await AlertModel.findByIdAndDelete(
    id
  );

  return {
    message:
      "Alert deleted successfully",
  };
};

module.exports = {
  createAlert,
  getUserAlerts,
  deleteAlert,
};