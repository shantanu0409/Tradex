const {
  UserModel,
} = require("../model/UserModel");

const addFunds = async (
  userId,
  amount
) => {
  const user =
    await UserModel.findById(
      userId
    );

  if (!user) {
    const error = new Error(
      "User not found"
    );
    error.statusCode = 404;
    throw error;
  }

  user.balance +=
    Number(amount);

  await user.save();

  return user;
};

const withdrawFunds = async (
  userId,
  amount
) => {
  const user =
    await UserModel.findById(
      userId
    );

  if (!user) {
    const error = new Error(
      "User not found"
    );
    error.statusCode = 404;
    throw error;
  }

  if (
    user.balance <
    Number(amount)
  ) {
    const error = new Error(
      "Insufficient Balance"
    );
    error.statusCode = 400;
    throw error;
  }

  user.balance -=
    Number(amount);

  await user.save();

  return user;
};

const getBalance = async (
  userId
) => {
  const user =
    await UserModel.findById(
      userId
    );

  if (!user) {
    const error = new Error(
      "User not found"
    );
    error.statusCode = 404;
    throw error;
  }

  return {
    balance:
      user.balance,
  };
};

module.exports = {
  addFunds,
  withdrawFunds,
  getBalance,
};