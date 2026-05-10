const express = require("express");
const router = express.Router();

const auth =
  require("../middleware/auth");

const {
  allHoldings,
  allPositions,
} = require("../controllers/portfolioController");

router.get(
  "/allHoldings",
  auth,
  allHoldings
);

router.get(
  "/allPositions",
  auth,
  allPositions
);

module.exports = router;