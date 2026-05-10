const YahooFinance =
  require("yahoo-finance2")
    .default;

const stocksDatabase =
  require("../stocks.json");

const yahooFinance =
  new YahooFinance({
    suppressNotices: [
      "yahooSurvey",
    ],
  });

const stockCache = {};
const CACHE_DURATION =
  30 * 1000; // 30 seconds

const getPopularStocks =
  async () => {
    const symbols = [
      "RELIANCE.NS",
      "TCS.NS",
      "INFY.NS",
      "HDFCBANK.NS",
      "ITC.NS",
      "SBIN.NS",
      "WIPRO.NS",
      "ONGC.NS",
      "TATAMOTORS.NS",
      "ADANIENT.NS",
      "BAJFINANCE.NS",
      "LT.NS",
      "HCLTECH.NS",
      "AXISBANK.NS",
      "ICICIBANK.NS",
      "KOTAKBANK.NS",
      "TATASTEEL.NS",
      "POWERGRID.NS",
      "BHARTIARTL.NS",
      "SUNPHARMA.NS",
    ];

    const result =
      await Promise.all(
        symbols.map(
          async (symbol) => {
            try {
              return await yahooFinance.quote(
                symbol
              );
            } catch {
              return null;
            }
          }
        )
      );

    return result
      .filter(Boolean)
      .map((stock) => ({
        symbol:
          stock.symbol?.replace(
            ".NS",
            ""
          ) || "",
        name:
          stock.shortName ||
          stock.symbol?.replace(
            ".NS",
            ""
          ),
        price:
          stock.regularMarketPrice ||
          0,
        percent:
          stock.regularMarketChangePercent?.toFixed(
            2
          ) || "0.00",
        isDown:
          stock.regularMarketChange <
          0,
      }));
  };

const getSingleStock =
  async (symbol) => {
    const originalSymbol =
      symbol.toUpperCase().trim();

    const cached =
      stockCache[originalSymbol];

    if (
      cached &&
      Date.now() -
        cached.timestamp <
        CACHE_DURATION
    ) {
      return cached.data;
    }

    const result =
      await yahooFinance.quote(
        `${originalSymbol}.NS`
      );

    if (
      !result ||
      result.regularMarketPrice ==
        null
    ) {
      return null;
    }

    const responseData = {
      symbol:
        originalSymbol,
      name:
        result.shortName ||
        originalSymbol,
      price:
        result.regularMarketPrice,
      percent:
        result.regularMarketChangePercent?.toFixed(
          2
        ) || "0.00",
      isDown:
        (result.regularMarketChangePercent ||
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
  };

const searchStocks =
  (query) => {
    const search =
      query
        .toLowerCase()
        .trim();

    return Object.entries(
      stocksDatabase
    )
      .filter(
        ([name, symbol]) =>
          name
            .toLowerCase()
            .includes(search) ||
          symbol
            .toLowerCase()
            .includes(search)
      )
      .slice(0, 15)
      .map(
        ([name, symbol]) => ({
          symbol,
          name,
        })
      );
  };

module.exports = {
  getPopularStocks,
  getSingleStock,
  searchStocks,
};