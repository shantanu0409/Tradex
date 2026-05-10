import React, {
  useState,
  useEffect,
} from "react";

import API from "../api";



import AnalyticsModal from "./AnalyticsModal";
import BuyActionWindow
  from "./BuyActionWindow";

import SellActionWindow
  from "./SellActionWindow";

import io from "socket.io-client";
import {
  Tooltip,
  Grow,
  Menu,
  MenuItem,
} from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import {
  DoughnutChart,
} from "./DoughnoutChart";


const socket = io(
  process.env.REACT_APP_API_URL ||
    "http://localhost:3002"
);
// =========================
// WATCHLIST COMPONENT
// =========================

const WatchList = () => {

  const [watchlist, setWatchlist] =
    useState([]);

  const [search, setSearch] =
    useState("");
const [
  filterText,
  setFilterText,
] = useState("");
  const [
    searchResults,

    setSearchResults,
  ] = useState([]);

  const [
    showDropdown,

    setShowDropdown,
  ] = useState(false);

  const [
    selectedStock,

    setSelectedStock,
  ] = useState(null);

  const userId =
  JSON.parse(
    localStorage.getItem("user")
  )?._id;

  const loadSavedWatchlist =
  async () => {
    try {
      if (!userId) return;

      const res =
        await API.get(
  `/watchlist/${userId}`
);

      const savedStocks =
        await Promise.all(
          res.data.map(
            async (item) => {
              try {
                const stockRes =
  await API.get(
    `/stock/${item.symbol}`
  );

                return {
                  ...stockRes.data,
                  previousPrice:
                    stockRes.data.price,
                };
              } catch {
                return null;
              }
            }
          )
        );

      setWatchlist(
        savedStocks.filter(Boolean)
      );
    } catch (error) {
      console.log(
        "Load Watchlist Error:",
        error
      );
    }
  };
  const saveToWatchlist =
  async (stock) => {
    try {
      if (!userId) return;

      await API.post(
  "/watchlist",
        {
          userId,
          symbol: stock.symbol,
          name: stock.name,
        }
      );
    } catch (error) {
      // Ignore duplicate stock errors
      console.log(
        "Save Watchlist Error:",
        error.response?.data?.message ||
          error.message
      );
    }
  };
  const removeFromWatchlist =
  async (symbol) => {
    try {
      if (!userId) return;

     await API.delete(
  `/watchlist/${userId}/${symbol}`
);

      setWatchlist((prev) =>
        prev.filter(
          (stock) =>
            stock.symbol !== symbol
        )
      );
    } catch (error) {
      console.log(
        "Remove Watchlist Error:",
        error
      );
    }
  };
  // =========================
  // FETCH LIVE STOCKS
  // =========================

  const fetchStocks =
    async () => {

      try {

       const res =
  await API.get(
    "/stocks"
  );

const results =
  res.data;

        setWatchlist((prev) => {

          const mergedStocks = [
            ...results,
          ];

          prev.forEach((stock) => {

            const exists =
              mergedStocks.find(
                (s) =>
                  s.symbol ===
                  stock.symbol
              );

            if (!exists) {

              mergedStocks.push(stock);
            }
          });

          return mergedStocks.map(
            (newStock) => {

              const oldStock =
                prev.find(
                  (s) =>
                    s.symbol ===
                    newStock.symbol
                );

              return {

                ...newStock,

                previousPrice:
                  oldStock?.price || 0,
              };
            }
          );
        });

      } catch (error) {

        console.log(
          "Fetch Error:",
          error
        );
      }
    };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
  loadSavedWatchlist();
}, [userId]);
  useEffect(() => {

  if (
    watchlist.length === 0
  ) {

    return;
  }

  const symbols =
    watchlist.map(
      (stock) =>

        stock.symbol
    );

  // REQUEST LIVE DATA

  socket.emit(
    "subscribeStocks",

    symbols
  );

  // RECEIVE LIVE DATA

  socket.on(
    "liveStocks",

    (liveData) => {

      setWatchlist(
        (prevStocks) =>

          prevStocks.map(
            (stock) => {

              const updated =
                liveData.find(

                  (item) =>

                    item.symbol ===
                    stock.symbol
                );

              return updated

                ? {

                    ...stock,

                    previousPrice:
                      stock.price,

                    price:
                      updated.price,

                    percent:
                      updated.percent,

                    isDown:
                      updated.isDown,
                  }

                : stock;
            }
          )
      );
    }
  );

  // REFRESH EVERY 5 SEC

 const interval =
  setInterval(() => {
    socket.emit(
      "subscribeStocks",
      symbols
    );
  }, 3000);
  return () => {

    clearInterval(
      interval
    );

    socket.off(
      "liveStocks"
    );
  };

}, [watchlist.length]);
  // =========================
  // DYNAMIC SEARCH
  // =========================

  const handleDynamicSearch =
    async (value) => {

      setSearch(value);

      if (!value.trim()) {

        setSearchResults([]);

        setShowDropdown(false);

        return;
      }

      try {

        const res =
         await API.get(
  `/search/${value}`
);

        setSearchResults(
          res.data
        );

        setShowDropdown(true);

      } catch {

        setSearchResults([]);

        setShowDropdown(true);
      }
    };

  // =========================
  // ENTER SEARCH
  // =========================

  const handleSearchStock =
    async (e) => {

      if (
        e.key !== "Enter"
      ) return;

      try {

        const symbol =
          search
            .toUpperCase()
            .trim();

        if (!symbol) return;

        const res =
          await API.get(
  `/stock/${symbol}`
);

        const stock =
          res.data;

        const exists =
          watchlist.find(
            (s) =>
              s.symbol ===
              stock.symbol
          );

        if (!exists) {

         setWatchlist((prev) => [
  {
    ...stock,
    previousPrice: stock.price,
  },
  ...prev,
]);

await saveToWatchlist(stock);
        }

        setSearch("");

        setSearchResults([]);

        setShowDropdown(false);

      } catch (error) {

        alert(
          "Stock not found"
        );
      }
    };

  // =========================
  // WATCHLIST
  // =========================

  const filteredStocks =
  watchlist.filter(
    (stock) =>
      stock.symbol
        ?.toLowerCase()
        .includes(
          filterText.toLowerCase()
        ) ||
      stock.name
        ?.toLowerCase()
        .includes(
          filterText.toLowerCase()
        )
  );
  // =========================
  // CHART DATA
  // =========================

  const data = {

    labels:

      filteredStocks.length > 0

        ? filteredStocks.map(
            (stock) =>
              stock.name
          )

        : ["Loading"],

    datasets: [
      {
        label:
          "Portfolio Distribution",

        data:

          filteredStocks.length > 0

            ? filteredStocks.map(
                (stock) =>
                  Number(
                    stock.price
                  ) || 0
              )

            : [1],

        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
          "#8dd17e",
          "#d45087",
          "#2f4b7c",
          "#f95d6a",
        ],

        borderColor:
          "#111827",

        borderWidth: 2,

        hoverOffset: 12,
      },
    ],
  };

  return (

    <div className="watchlist-container">

      {/* SEARCH */}

      <div
        className="search-container"

        style={{
          position: "relative",
        }}
      >

        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search stocks..."
          className="search"
          value={search || filterText}

          style={{
  color: "#333",
  background: "#ffffff",
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  outline: "none",
  fontSize: "14px",
}}

         onChange={(e) => {
  const value =
    e.target.value;

  setFilterText(value);
  handleDynamicSearch(value);
}}

          onKeyDown={
            handleSearchStock
          }
        />

        <span
          className="counts"

          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            color: "#777",
          }}
        >

          {filteredStocks.length}

        </span>

        {/* DROPDOWN */}

        {
          showDropdown && (

            <div
              style={{
                position:
                  "absolute",

                top: "55px",

                left: "0",

                width: "100%",

                background: "#ffffff",
border: "1px solid #d1d5db",
borderRadius: "6px",
boxShadow: "0 2px 8px rgba(0,0,0,0.08)",

                overflow:
                  "hidden",

                zIndex: 999,

                maxHeight:
                  "300px",

                overflowY:
                  "auto",

                
              }}
            >

              {
                Array.isArray(searchResults) &&
searchResults.length > 0 ? (

(searchResults || []).map(
                    (
                      stock,
                      index
                    ) => (

                      <div
                        key={index}

                        onClick={
                          async () => {

                            const exists =
                              watchlist.find(
                                (
                                  s
                                ) =>

                                  s.symbol ===
                                  stock.symbol
                              );

                            if (
                              !exists
                            ) {

                              try {

                                const res =
  await API.get(
    `/stock/${stock.symbol}`
  );
                                  console.log(
  "SEARCH RESULTS:",
  res.data
);

                                const fullStock =
                                  res.data;

                                setWatchlist((prev) => [
  {
    ...fullStock,
    previousPrice: fullStock.price,
  },
  ...prev,
]);

await saveToWatchlist(fullStock);
                              } catch (
                                error
                              ) {

                                console.log(
                                  error
                                );
                              }
                            }

                            setSearch("");

                            setSearchResults(
                              []
                            );

                            setShowDropdown(
                              false
                            );
                          }
                        }

                        style={{
                          padding:
                            "12px",

                          cursor:
                            "pointer",

                          borderBottom: "1px solid #e5e7eb",

                          color: "#333",
                        }}
                      >

                        <div>
                          {
                            stock.name
                          }
                        </div>

                        <div
                          style={{
                            fontSize:
                              "12px",

                            color: "#777",
                          }}
                        >
                          {
                            stock.symbol?.replace(
                              ".NS",
                              ""
                            )
                          }
                        </div>

                      </div>
                    )
                  )

                ) : (

                  <div
                    style={{
                      padding:
                        "12px",

                      color: "#777",
                    }}
                  >
                    No matching stocks found
                  </div>
                )
              }

            </div>
          )
        }

      </div>

      {/* STOCK LIST */}

      <ul className="list">

        {filteredStocks.map(
          (stock, index) => {

            return (

              <WatchListItem
  stock={stock}
  key={index}
  openAnalytics={setSelectedStock}
  removeFromWatchlist={
    removeFromWatchlist
  }
/>
            );
          }
        )}

      </ul>

      {/* ANALYTICS */}

      {selectedStock && (

        <AnalyticsModal
  key={selectedStock}
  symbol={selectedStock}
  onClose={() =>
    setSelectedStock(null)
  }
/>

      )}

      {/* CHART */}

      <DoughnutChart
        data={data}
      />

    </div>
  );
};

export default WatchList;

// =========================
// WATCHLIST ITEM
// =========================

const WatchListItem = ({
  stock,
  openAnalytics,
  removeFromWatchlist,
}) => {

  const [
    showWatchlistActions,

    setShowWatchlistActions,
  ] = useState(false);

  return (

    <li

      onMouseEnter={() =>
        setShowWatchlistActions(
          true
        )
      }

      onMouseLeave={() =>
        setShowWatchlistActions(
          false
        )
      }
    >

      <div className="item">

        <p
          className={
            stock.isDown
              ? "down"
              : "up"
          }
        >
          {stock.name}
        </p>

        <div className="itemInfo">

          <span className="percent">
            {stock.percent}%
          </span>

          {stock.isDown ? (

            <KeyboardArrowDown className="down" />

          ) : (

            <KeyboardArrowUp className="up" />

          )}

          <span
            className="price"

            style={{

              color:

                (stock.previousPrice || 0)
                <
                stock.price

                  ? "#22c55e"

                  :

                (stock.previousPrice || 0)
                >
                stock.price

                  ? "#ef4444"

                  : "#333",

              transition:
                "0.3s ease",
            }}
          >

            ₹{stock.price}

          </span>

        </div>

      </div>

     <WatchListActions
  stock={stock}
  openAnalytics={openAnalytics}
  visible={showWatchlistActions}
  removeFromWatchlist={
    removeFromWatchlist
  }
/>
    </li>
  );
};

// =========================
// WATCHLIST ACTIONS
// =========================
const WatchListActions = ({
  stock,
  openAnalytics,
  visible,
  removeFromWatchlist,
}) => {

  const [
    anchorEl,

    setAnchorEl,
  ] = useState(null);

  const [
    showBuyWindow,

    setShowBuyWindow,
  ] = useState(false);

  const [
    showSellWindow,

    setShowSellWindow,
  ] = useState(false);

  // BUY WINDOW

  const handleBuyClick =
    () => {

      setShowBuyWindow(
        true
      );
    };

  // SELL WINDOW

  const handleSellClick =
    () => {

      setShowSellWindow(
        true
      );
    };

  // ANALYTICS

  const handleAnalytics =
    () => {

      openAnalytics(
        stock.symbol
      );
    };

  // MENU

  const handleMoreClick =
    (event) => {

      setAnchorEl(
        event.currentTarget
      );
    };

  const handleCloseMenu =
    () => {

      setAnchorEl(null);
    };

  return (

    <>

      <span

  className="actions"

  style={{

    opacity:
      visible ? 1 : 0,

    pointerEvents:
      visible
        ? "auto"
        : "none",

    transition:
      "0.2s ease",
  }}
>

          {/* BUY */}

          <Tooltip
            title="Buy (B)"
            placement="top"
            arrow
            TransitionComponent={
              Grow
            }
          >

            <button
              className="buy"

              onClick={
                handleBuyClick
              }
            >
              Buy
            </button>

          </Tooltip>

          {/* SELL */}

          <Tooltip
            title="Sell (S)"
            placement="top"
            arrow
            TransitionComponent={
              Grow
            }
          >

            <button
              className="sell"

              onClick={
                handleSellClick
              }
            >
              Sell
            </button>

          </Tooltip>

          {/* ANALYTICS */}

          <Tooltip
            title="Analytics (A)"
            placement="top"
            arrow
            TransitionComponent={
              Grow
            }
          >

            <button
              className="action"

              onClick={
                handleAnalytics
              }
            >

              <BarChartOutlined className="icon" />

            </button>

          </Tooltip>

          {/* MORE */}

          <Tooltip
            title="More"
            placement="top"
            arrow
            TransitionComponent={
              Grow
            }
          >

            <button
              className="action"

              onClick={
                handleMoreClick
              }
            >

              <MoreHoriz className="icon" />

            </button>

          </Tooltip>

          {/* MENU */}

          <Menu
            anchorEl={anchorEl}

            open={Boolean(anchorEl)}

            onClose={
              handleCloseMenu
            }
          >

            <MenuItem
              onClick={() => {

                alert(
                  `Added ${stock.symbol} to Watchlist`
                );

                handleCloseMenu();
              }}
            >
              Add to Watchlist
            </MenuItem>

              <MenuItem
  onClick={() => {
    removeFromWatchlist(
      stock.symbol
    );
    handleCloseMenu();
  }}
>
  Remove from Watchlist
</MenuItem>
            <MenuItem
              onClick={() => {

                navigator.clipboard.writeText(
                  stock.symbol
                );

                alert(
                  `${stock.symbol} copied`
                );

                handleCloseMenu();
              }}
            >
              Copy Symbol
            </MenuItem>

            <MenuItem
              onClick={() => {

                window.open(
                  `https://www.tradingview.com/chart/?symbol=NSE:${stock.symbol}`,

                  "_blank"
                );

                handleCloseMenu();
              }}
            >
              Open in TradingView
            </MenuItem>

          </Menu>

        </span>

      

      {/* BUY WINDOW */}

      {
        showBuyWindow && (

          <BuyActionWindow

            uid={
              stock.symbol
            }

            closeWindow={() =>

              setShowBuyWindow(
                false
              )
            }
          />
        )
      }

      {/* SELL WINDOW */}

      {
        showSellWindow && (

          <SellActionWindow

            uid={
              stock.symbol
            }

            closeWindow={() =>

              setShowSellWindow(
                false
              )
            }
          />
        )
      }

    </>
  );
};