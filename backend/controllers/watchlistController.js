const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} = require("../services/watchlistService");

const getAll = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getWatchlist(
        req.params.userId
      );

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const create = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await addToWatchlist(
        req.body
      );

    // If stock already exists,
    // return normal success response
    if (
      result?.message ===
      "Stock already exists in watchlist"
    ) {
      return res.json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    // Handle Mongo duplicate key error
    if (error.code === 11000) {
      return res.json({
        message:
          "Stock already exists in watchlist",
      });
    }

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
      await removeFromWatchlist(
        req.params.userId,
        req.params.symbol
      );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  remove,
};