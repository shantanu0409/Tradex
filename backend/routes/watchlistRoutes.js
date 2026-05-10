const express = require("express");
const router = express.Router();

const auth =
  require("../middleware/auth");

const {
  getAll,
  create,
  remove,
} = require("../controllers/watchlistController");

router.get(
  "/watchlist/:userId",
  auth,
  getAll
);

router.post(
  "/watchlist",
  auth,
  create
);

router.delete(
  "/watchlist/:userId/:symbol",
  auth,
  remove
);

module.exports = router;