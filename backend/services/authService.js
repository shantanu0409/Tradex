const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const signupUser = async ({
  name,
  email,
  password,
  mobile,
}) => {
  const existingUser =
    await UserModel.findOne({ email });

  if (existingUser) {
    const error = new Error(
      "User already exists"
    );
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    fullname: name,
    email,
    password: hashedPassword,
    mobile,
  });

  await newUser.save();

  return {
    message: "Signup Successful",
  };
};

const loginUser = async ({
  email,
  password,
}) => {
  const user =
    await UserModel.findOne({ email });

  if (!user) {
    const error = new Error(
      "Invalid Email"
    );
    error.statusCode = 400;
    throw error;
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    const error = new Error(
      "Invalid Password"
    );
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    message: "Login Successful",
    token,
    user,
  };
};

module.exports = {
  signupUser,
  loginUser,
};