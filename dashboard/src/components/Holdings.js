import React, {
  useState,
  useEffect,
} from "react";
import API from "../api";

import { VerticalGraph } from "./VerticalGraph";
import {
  DoughnutChart,
} from "./DoughnoutChart";
import AnalyticsModal from "./AnalyticsModal";

const Holdings = () => {
  const [allHoldings, setAllHoldings] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

    const [search, setSearch] =
  useState("");
  const [
    selectedStock,
    setSelectedStock,
  ] = useState(null);

  // Open analytics modal
  const openChart = (
    symbol
  ) => {
    setSelectedStock(
      symbol
    );
  };

  // Close analytics modal
  const closeChart = () => {
    setSelectedStock(null);
  };

  // Fetch holdings
  useEffect(() => {
    const fetchHoldings =
      async () => {
        try {
          const currentUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          if (
            !currentUser ||
            !currentUser._id
          ) {
            setLoading(false);
            return;
          }

          const res =
            await API.get(
  `/allHoldings?userId=${currentUser._id}`
);

          setAllHoldings(
            res.data
          );
          setLoading(false);
        } catch (err) {
          console.log(
            "Holdings Error:",
            err
          );
          setLoading(false);
        }
      };

    fetchHoldings();

    const interval =
      setInterval(
        fetchHoldings,
        5000
      );

    return () =>
      clearInterval(interval);
  }, []);

  const filteredHoldings =
  allHoldings.filter(
    (stock) =>
      stock.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      stock.symbol
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  // Loading screen
  if (loading) {
    return (
      <div
        style={{
          color: "#666",
          textAlign:
            "center",
          marginTop:
            "100px",
          fontSize: "24px",
        }}
      >
        Loading Holdings...
      </div>
    );
  }

  // Totals
  const totalInvestment =
    allHoldings.reduce(
      (total, stock) =>
        total +
        Number(
          stock.avg || 0
        ) *
          Number(
            stock.qty || 0
          ),
      0
    );

  const currentValue =
    allHoldings.reduce(
      (total, stock) =>
        total +
        Number(
          stock.price || 0
        ) *
          Number(
            stock.qty || 0
          ),
      0
    );

  const pnl =
    currentValue -
    totalInvestment;

  const pnlPercent =
    totalInvestment > 0
      ? (
          (pnl /
            totalInvestment) *
          100
        ).toFixed(2)
      : "0.00";

  // Bar chart data
  const data = {
    labels:
      allHoldings.map(
        (stock) =>
          stock.name
      ),
    datasets: [
      {
        label:
          "Stock Price",
        data:
          allHoldings.map(
            (stock) =>
              stock.price
          ),
        backgroundColor:
          "rgba(56, 126, 209, 0.7)",
        borderRadius: 4,
      },
    ],
  };

  // Doughnut chart data
  const pieData = {
    labels:
      allHoldings.map(
        (stock) =>
          stock.name
      ),
    datasets: [
      {
        data:
          allHoldings.map(
            (stock) =>
              Number(
                stock.price ||
                  0
              ) *
              Number(
                stock.qty ||
                  0
              )
          ),
        backgroundColor: [
          "#387ed1",
          "#16a34a",
          "#f59e0b",
          "#dc2626",
          "#8b5cf6",
          "#14b8a6",
          "#f97316",
          "#ec4899",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        padding: "30px",
        color: "#333",
        background:
          "#f7f7f7",
        minHeight:
          "100vh",
      }}
    >
      {/* Heading */}
      <div
        style={{
          marginBottom:
            "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom:
              "8px",
            fontSize:
              "30px",
            fontWeight:
              "600",
            color: "#222",
          }}
        >
          Holdings (
          {
            filteredHoldings.length
          }
          )
        </h1>

        <p
          style={{
            margin: 0,
            color: "#777",
            fontSize: "14px",
          }}
        >
          View your
          portfolio and
          performance
        </p>
      </div>
          <div
  style={{
    ...cardStyle,
    marginBottom: "20px",
    padding: "16px",
  }}
>
  <input
    type="text"
    placeholder="Search holdings..."
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    style={{
      width: "100%",
      padding: "10px 12px",
      border:
        "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      boxSizing:
        "border-box",
    }}
  />
</div>
      {/* Empty State */}
      {filteredHoldings.length === 0 ?(
        <div
          style={{
            ...cardStyle,
            padding:
              "50px",
            textAlign:
              "center",
            color: "#777",
            fontSize:
              "18px",
          }}
        >
          No holdings
          found.
        </div>
      ) : (
        <>
          {/* Holdings Table */}
          <div
            style={{
              ...cardStyle,
              overflowX:
                "auto",
              padding: 0,
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "#f9fafb",
                    textAlign:
                      "left",
                  }}
                >
                  <th
                    style={
                      thStyle
                    }
                  >
                    Instrument
                  </th>
                  <th
                    style={
                      thStyle
                    }
                  >
                    Qty
                  </th>
                  <th
                    style={
                      thStyle
                    }
                  >
                    Avg Cost
                  </th>
                  <th
                    style={
                      thStyle
                    }
                  >
                    LTP
                  </th>
                  <th
                    style={
                      thStyle
                    }
                  >
                    Current
                    Value
                  </th>
                  <th
                    style={
                      thStyle
                    }
                  >
                    P&amp;L
                  </th>
                  <th
                    style={
                      thStyle
                    }
                  >
                    Net Chg.
                  </th>
                  <th
                    style={
                      thStyle
                    }
                  >
                    Day Chg.
                  </th>
                  <th
                    style={
                      thStyle
                    }
                  >
                    Analytics
                  </th>
                </tr>
              </thead>

              <tbody>
               {filteredHoldings.map(
                  (
                    stock
                  ) => {
                    const curValue =
                      Number(
                        stock.price ||
                          0
                      ) *
                      Number(
                        stock.qty ||
                          0
                      );

                    const pnlValue =
                      curValue -
                      Number(
                        stock.avg ||
                          0
                      ) *
                        Number(
                          stock.qty ||
                            0
                        );

                    const isProfit =
                      pnlValue >= 0;

                    return (
                      <tr
                        key={
                          stock._id ||
                          stock.name
                        }
                        style={{
                          borderTop:
                            "1px solid #e5e7eb",
                        }}
                      >
                        <td
                          style={{
                            ...tdStyle,
                            fontWeight:
                              "600",
                            color:
                              "#222",
                          }}
                        >
                          {
                            stock.name
                          }
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {
                            stock.qty
                          }
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          ₹
                          {Number(
                            stock.avg ||
                              0
                          ).toFixed(
                            2
                          )}
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          ₹
                          {Number(
                            stock.price ||
                              0
                          ).toFixed(
                            2
                          )}
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          ₹
                          {curValue.toFixed(
                            2
                          )}
                        </td>

                        <td
                          style={{
                            ...tdStyle,
                            color:
                              isProfit
                                ? "#16a34a"
                                : "#dc2626",
                            fontWeight:
                              "600",
                          }}
                        >
                          ₹
                          {pnlValue.toFixed(
                            2
                          )}
                        </td>

                        <td
                          style={{
                            ...tdStyle,
                            color:
                              isProfit
                                ? "#16a34a"
                                : "#dc2626",
                          }}
                        >
                          {
                            stock.net
                          }
                        </td>

                        <td
                          style={{
                            ...tdStyle,
                            color:
                              stock.isLoss
                                ? "#dc2626"
                                : "#16a34a",
                          }}
                        >
                          {
                            stock.day
                          }
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <button
                            onClick={() =>
                              openChart(
                                stock.name
                              )
                            }
                            style={
                              chartButtonStyle
                            }
                          >
                            Chart
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Cards */}
          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginTop:
                "30px",
            }}
          >
            <div
              style={
                cardStyle
              }
            >
              <h3
                style={
                  metricValueStyle
                }
              >
                ₹
                {totalInvestment.toFixed(
                  2
                )}
              </h3>
              <p
                style={
                  metricLabelStyle
                }
              >
                Total
                Investment
              </p>
            </div>

            <div
              style={
                cardStyle
              }
            >
              <h3
                style={
                  metricValueStyle
                }
              >
                ₹
                {currentValue.toFixed(
                  2
                )}
              </h3>
              <p
                style={
                  metricLabelStyle
                }
              >
                Current
                Value
              </p>
            </div>

            <div
              style={
                cardStyle
              }
            >
              <h3
                style={{
                  ...metricValueStyle,
                  color:
                    pnl >= 0
                      ? "#16a34a"
                      : "#dc2626",
                }}
              >
                ₹
                {pnl.toFixed(
                  2
                )}{" "}
                (
                {pnlPercent}
                %)
              </h3>
              <p
                style={
                  metricLabelStyle
                }
              >
                Total
                P&amp;L
              </p>
            </div>
          </div>

          {/* Portfolio Allocation */}
          <div
            style={{
              ...cardStyle,
              marginTop:
                "30px",
            }}
          >
            <h3
              style={
                sectionTitleStyle
              }
            >
              Portfolio
              Allocation
            </h3>

            <DoughnutChart
              data={
                pieData
              }
            />
          </div>

          {/* Price Chart */}
          <div
            style={{
              ...cardStyle,
              marginTop:
                "30px",
            }}
          >
            <h3
              style={
                sectionTitleStyle
              }
            >
              Holdings
              Performance
            </h3>

            <VerticalGraph
              data={data}
            />
          </div>

          {/* Analytics Modal */}
          {selectedStock && (
            <AnalyticsModal
              symbol={
                selectedStock
              }
              onClose={
                closeChart
              }
            />
          )}
        </>
      )}
    </div>
  );
};

// Shared Styles
const cardStyle = {
  background: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  border:
    "1px solid #e5e7eb",
  boxShadow: "none",
};

const thStyle = {
  padding: "15px 10px",
  color: "#777",
  fontSize: "13px",
  fontWeight: "600",
  textTransform:
    "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle = {
  padding: "16px 10px",
  color: "#333",
};

const chartButtonStyle = {
  background: "#387ed1",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
};

const metricValueStyle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "600",
  color: "#222",
};

const metricLabelStyle = {
  margin: "8px 0 0 0",
  color: "#777",
  fontSize: "14px",
};

const sectionTitleStyle = {
  margin: 0,
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: "600",
  color: "#222",
};

export default Holdings;