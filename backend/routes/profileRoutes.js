const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/auth");

const {
  getProfile,
  updateProfile,
} = require(
  "../controllers/profileController"
);

router.get(
  "/profile/:userId",
  auth,
  getProfile
);

router.put(
  "/profile/:userId",
  auth,
  updateProfile
);

module.exports =
  router;