const YahooFinance =
  require("yahoo-finance2")
    .default;

const yahooFinance =
  new YahooFinance({
    suppressNotices: [
      "yahooSurvey",
    ],
  });

const stockCache = {};
const CACHE_DURATION =
  30 * 1000;

const getLiveStock =
  async (symbol) => {
    try {
      const originalSymbol =
        symbol
          .toUpperCase()
          .trim();

      const cached =
        stockCache[
          originalSymbol
        ];

      if (
        cached &&
        Date.now() -
          cached.timestamp <
          CACHE_DURATION
      ) {
        return cached.data;
      }

      const stock =
        await yahooFinance.quote(
          `${originalSymbol}.NS`
        );

      if (
        !stock ||
        stock.regularMarketPrice ==
          null
      ) {
        return null;
      }

      const responseData = {
        symbol:
          originalSymbol,
        name:
          stock.shortName ||
          stock.longName ||
          originalSymbol,
        price:
          stock.regularMarketPrice,
        percent:
          stock.regularMarketChangePercent?.toFixed(
            2
          ) || "0.00",
        isDown:
          (stock.regularMarketChangePercent ||
            0) < 0,
      };

      stockCache[
        originalSymbol
      ] = {
        data:
          responseData,
        timestamp:
          Date.now(),
      };

      return responseData;
    } catch (error) {
      console.log(
        "Live Stock Error:",
        symbol,
        error.message
      );

      const cached =
        stockCache[
          symbol.toUpperCase()
        ];

      return cached
        ? cached.data
        : null;
    }
  };

module.exports = {
  getLiveStock,
};