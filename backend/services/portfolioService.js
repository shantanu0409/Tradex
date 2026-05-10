const {
  HoldingsModel,
} = require("../model/HoldingsModel");

const {
  PositionsModel,
} = require("../model/PositionsModel");

const getHoldings = async (
  isDbConnected
) => {
  if (!isDbConnected) {
    return [];
  }

  const holdings =
    await HoldingsModel.find({});

  return holdings.map(
    (stock) => {
      const currentValue =
        stock.price *
        stock.qty;

      const investedValue =
        stock.avg *
        stock.qty;

      const profitLoss =
        currentValue -
        investedValue;

      const profitLossPercent =
        investedValue > 0
          ? (
              (profitLoss /
                investedValue) *
              100
            )
          : 0;

      return {
        ...stock._doc,
        currentValue:
          currentValue.toFixed(
            2
          ),
        investedValue:
          investedValue.toFixed(
            2
          ),
        profitLoss:
          profitLoss.toFixed(
            2
          ),
        profitLossPercent:
          profitLossPercent.toFixed(
            2
          ),
      };
    }
  );
};

const getPositions = async (
  isDbConnected
) => {
  if (!isDbConnected) {
    return [];
  }

  return await PositionsModel.find(
    {}
  );
};

module.exports = {
  getHoldings,
  getPositions,
};