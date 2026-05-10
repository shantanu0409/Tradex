const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema({
    fullname: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    mobile: String,

    googleId: String,

    profilePicture: String,

    balance: {
      type: Number,
      default: 100000,
    },
  });

const UserModel =
  mongoose.model(
    "User",
    userSchema
  );

module.exports = {
  UserModel,
};