const {
  getPopularStocks,
  getSingleStock,
  searchStocks,
} = require("../services/stockService");

const getAll = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getPopularStocks();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getOne = async (
  req,
  res,
  next
) => {
  try {
    const stock =
      await getSingleStock(
        req.params.symbol
      );

    if (!stock) {
      return res
        .status(404)
        .json({
          message:
            "Stock not found",
        });
    }

    res.json(stock);
  } catch (error) {
    if (
      error.message.includes(
        "Too Many Requests"
      )
    ) {
      return res
        .status(429)
        .json({
          message:
            "Rate limit exceeded. Please try again in a few seconds.",
        });
    }

    next(error);
  }
};

const search = (
  req,
  res,
  next
) => {
  try {
    const results =
      searchStocks(
        req.params.query
      );
    res.json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  search,
};