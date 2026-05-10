const express = require("express");
const router = express.Router();

const {
  signup,
  login,
} = require("../controllers/authController");

const {
  authLimiter,
} = require("../middleware/rateLimiter");

const validate =
  require("../middleware/validate");

const {
  signupValidator,
  loginValidator,
} = require("../middleware/validators");

const passport =
  require("../config/passport");

router.post(
  "/signup",
  authLimiter,
  signupValidator,
  validate,
  signup
);

router.post(
  "/login",
  authLimiter,
  loginValidator,
  validate,
  login
);

router.get(
  "/auth/google",
  passport.authenticate(
    "google",
    {
      scope: [
        "profile",
        "email",
      ],
    }
  )
);

router.get(
  "/auth/google/callback",
  passport.authenticate(
    "google",
    {
      session: false,
      failureRedirect:
        "/login",
    }
  ),
  (req, res) => {
    const {
      token,
      user,
    } = req.user;

    const dashboardUrl =
      process.env
        .DASHBOARD_URL ||
      "http://localhost:3001";

    res.redirect(
      `${dashboardUrl}/?token=${encodeURIComponent(
        token
      )}&user=${encodeURIComponent(
        JSON.stringify(user)
      )}`
    );
  }
);

module.exports = router;