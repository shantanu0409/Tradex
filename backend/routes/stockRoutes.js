const express = require("express");
const router = express.Router();

const {
  authLimiter,
  searchLimiter,
} = require("../middleware/rateLimiter");

const {
  getAll,
  getOne,
  search,
} = require("../controllers/stockController");

router.get(
  "/stocks",
  authLimiter,
  getAll
);

router.get(
  "/stock/:symbol",
  authLimiter,
  getOne
);

router.get(
  "/search/:query",
  searchLimiter,
  search
);

module.exports = router;