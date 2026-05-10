const express = require("express");
const router = express.Router();

const auth =
  require("../middleware/auth");

const {
  getAll,
  create,
  cancel,
} = require("../controllers/ordersController");

router.get(
  "/allOrders",
  auth,
  getAll
);

router.post(
  "/newOrder",
  auth,
  create
);

router.delete(
  "/cancelOrder/:id",
  auth,
  cancel
);

module.exports = router;