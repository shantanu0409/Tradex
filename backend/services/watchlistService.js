const {
  WatchlistModel,
} = require("../model/WatchlistModel");

const getWatchlist = async (userId) => {
  return await WatchlistModel.find({
    userId,
  }).sort({ createdAt: -1 });
};

const addToWatchlist = async ({
  userId,
  symbol,
  name,
}) => {
  if (!userId || !symbol || !name) {
    const error = new Error(
      "userId, symbol and name are required"
    );
    error.statusCode = 400;
    throw error;
  }

  const existing =
    await WatchlistModel.findOne({
      userId,
      symbol: symbol.toUpperCase(),
    });

  if (existing) {
    const error = new Error(
      "Stock already exists in watchlist"
    );
    error.statusCode = 400;
    throw error;
  }

  const stock = new WatchlistModel({
    userId,
    symbol: symbol.toUpperCase(),
    name,
  });

  await stock.save();

  return {
    message: "Stock added to watchlist",
    stock,
  };
};

const removeFromWatchlist = async (
  userId,
  symbol
) => {
  await WatchlistModel.findOneAndDelete({
    userId,
    symbol: symbol.toUpperCase(),
  });

  return {
    message:
      "Stock removed from watchlist",
  };
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};