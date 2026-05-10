import React, {
  useState,
  useEffect,
} from "react";
import API from "../api";

const Positions = () => {
  const [positions, setPositions] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchPositions =
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
  `/allPositions?userId=${currentUser._id}`
);
          setPositions(
            res.data
          );
          setLoading(false);
        } catch (error) {
          console.log(
            "Fetch Positions Error:",
            error
          );
          setLoading(false);
        }
      };

    fetchPositions();

    const interval =
      setInterval(
        fetchPositions,
        5000
      );

    return () =>
      clearInterval(interval);
  }, []);

  // Loading
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
        Loading Positions...
      </div>
    );
  }

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
      {/* Header */}
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
          Positions (
          {positions.length})
        </h1>

        <p
          style={{
            margin: 0,
            color: "#777",
            fontSize: "14px",
          }}
        >
          Track your open positions
          and real-time profit &amp;
          loss
        </p>
      </div>

      {/* Empty State */}
      {positions.length ===
      0 ? (
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
          No positions found.
        </div>
      ) : (
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
                }}
              >
                <th style={thStyle}>
                  Product
                </th>
                <th style={thStyle}>
                  Instrument
                </th>
                <th style={thStyle}>
                  Qty
                </th>
                <th style={thStyle}>
                  Avg
                </th>
                <th style={thStyle}>
                  LTP
                </th>
                <th style={thStyle}>
                  P&amp;L
                </th>
                <th style={thStyle}>
                  Chg.
                </th>
              </tr>
            </thead>

            <tbody>
              {positions.map(
                (
                  stock,
                  index
                ) => {
                  const qty =
                    Number(
                      stock.qty ||
                        0
                    );

                  const avg =
                    Number(
                      stock.avg ||
                        0
                    );

                  const price =
                    Number(
                      stock.price ||
                        0
                    );

                  const pnl =
                    price *
                      qty -
                    avg * qty;

                  const isProfit =
                    pnl >= 0;

                  return (
                    <tr
                      key={
                        stock._id ||
                        index
                      }
                      style={{
                        borderTop:
                          "1px solid #e5e7eb",
                      }}
                    >
                      <td
                        style={
                          tdStyle
                        }
                      >
                        {stock.product ||
                          "CNC"}
                      </td>

                      <td
                        style={{
                          ...tdStyle,
                          fontWeight:
                            "600",
                          color:
                            "#222",
                        }}
                      >
                        {stock.name}
                      </td>

                      <td
                        style={
                          tdStyle
                        }
                      >
                        {qty}
                      </td>

                      <td
                        style={
                          tdStyle
                        }
                      >
                        ₹
                        {avg.toFixed(
                          2
                        )}
                      </td>

                      <td
                        style={{
                          ...tdStyle,
                          fontWeight:
                            "600",
                        }}
                      >
                        ₹
                        {price.toFixed(
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
                        {pnl.toFixed(
                          2
                        )}
                      </td>

                      <td
                        style={{
                          ...tdStyle,
                          color:
                            stock.isLoss
                              ? "#dc2626"
                              : "#16a34a",
                          fontWeight:
                            "600",
                        }}
                      >
                        {stock.day ||
                          "0.00%"}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
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
  textAlign: "left",
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

export default Positions;