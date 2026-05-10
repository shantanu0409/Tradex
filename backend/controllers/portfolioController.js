const {
  getHoldings,
  getPositions,
} = require("../services/portfolioService");

const allHoldings = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getHoldings(
        req.app.get(
          "isDbConnected"
        )
      );

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const allPositions = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getPositions(
        req.app.get(
          "isDbConnected"
        )
      );

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allHoldings,
  allPositions,
};