const {
  createAlert,
  getUserAlerts,
  deleteAlert,
} = require("../services/alertService");

const create = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await createAlert(
        req.body
      );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (
  req,
  res,
  next
) => {
  try {
    const alerts =
      await getUserAlerts(
        req.params.userId
      );
    res.json(alerts);
  } catch (error) {
    next(error);
  }
};

const remove = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await deleteAlert(
        req.params.id
      );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  remove,
};