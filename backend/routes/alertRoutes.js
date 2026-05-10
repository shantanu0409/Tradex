const express = require("express");
const router = express.Router();

const auth =
  require("../middleware/auth");

const {
  create,
  getAll,
  remove,
} = require("../controllers/alertController");

router.post(
  "/alerts",
  auth,
  create
);

router.get(
  "/alerts/:userId",
  auth,
  getAll
);

router.delete(
  "/alerts/:id",
  auth,
  remove
);

module.exports = router;