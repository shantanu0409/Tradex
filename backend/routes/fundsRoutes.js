const express = require("express");
const router = express.Router();

const auth =
  require("../middleware/auth");

const validate =
  require("../middleware/validate");

const {
  fundsValidator,
} = require("../middleware/validators");

const {
  add,
  withdraw,
  balance,
} = require("../controllers/fundsController");

router.post(
  "/addFunds",
  auth,
  fundsValidator,
  validate,
  add
);

router.post(
  "/withdrawFunds",
  auth,
  fundsValidator,
  validate,
  withdraw
);

router.get(
  "/balance/:userId",
  auth,
  balance
);

module.exports = router;