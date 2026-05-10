const {
  signupUser,
  loginUser,
} = require("../services/authService");

const signup = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await signupUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};