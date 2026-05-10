import React, {
  useState,
  useEffect,
} from "react";
import API from "../api";

const Summary = () => {
  const userData =
    localStorage.getItem("user");

  const user = userData
    ? JSON.parse(userData)
    : null;

  const [holdings, setHoldings] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchHoldings =
      async () => {
        try {
          if (
            !user ||
            !user._id
          ) {
            setLoading(false);
            return;
          }

          const res =
            await API.get(
  `/allHoldings?userId=${user._id}`
);

          setHoldings(
            res.data
          );
          setLoading(false);
        } catch (error) {
          console.log(
            "Summary Error:",
            error
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
  }, [user?._id]);

  // Loading State
  if (loading) {
    return (
      <div
        style={{
          padding: "30px",
          color: "#666",
          fontSize: "18px",
        }}
      >
        Loading Summary...
      </div>
    );
  }

  // Calculations
  const totalInvestment =
    holdings.reduce(
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
    holdings.reduce(
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

  // Demo values
 const marginAvailable =
  Number(
    user?.balance || 0
  );

const marginsUsed =
  totalInvestment;

const openingBalance =
  marginAvailable +
  marginsUsed;
  // Currency formatter
  const formatCurrency =
    (value) =>
      `₹${Number(
        value
      ).toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
        }
      )}`;

  return (
    <div
      style={{
        padding: "30px",
        color: "#333",
      }}
    >
      {/* Greeting */}
      <div
        style={{
          marginBottom:
            "30px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight:
              "600",
            color: "#222",
          }}
        >
          Hi,{" "}
          {user?.fullname ||
            "Trader"}
        </h2>

        <p
          style={{
            marginTop: "6px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          Welcome back to your dashboard
        </p>
      </div>

      {/* Equity Section */}
      <div style={cardStyle}>
        <h3 style={titleStyle}>
          Equity
        </h3>

        <div style={dataStyle}>
          <div>
            <h2
              style={{
                ...valueStyle,
                color: "#222",
              }}
            >
              {formatCurrency(
                marginAvailable
              )}
            </h2>

            <p style={labelStyle}>
              Margin Available
            </p>
          </div>

          <div>
            <p style={labelStyle}>
              Margins Used
            </p>

            <p style={subValueStyle}>
              {formatCurrency(
                marginsUsed
              )}
            </p>

            <p
              style={{
                ...labelStyle,
                marginTop:
                  "12px",
              }}
            >
              Opening Balance
            </p>

            <p style={subValueStyle}>
              {formatCurrency(
                openingBalance
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Holdings Section */}
      <div
        style={{
          ...cardStyle,
          marginTop: "20px",
        }}
      >
        <h3 style={titleStyle}>
          Holdings (
          {
            holdings.length
          }
          )
        </h3>

        <div style={dataStyle}>
          <div>
            <h2
              style={{
                ...valueStyle,
                color:
                  pnl >= 0
                    ? "#16a34a"
                    : "#dc2626",
              }}
            >
              {formatCurrency(
                pnl
              )}
            </h2>

            <p style={labelStyle}>
              P&amp;L (
              {pnl >= 0
                ? "+"
                : ""}
              {pnlPercent}
              %)
            </p>
          </div>

          <div>
            <p style={labelStyle}>
              Current Value
            </p>

            <p style={subValueStyle}>
              {formatCurrency(
                currentValue
              )}
            </p>

            <p
              style={{
                ...labelStyle,
                marginTop:
                  "12px",
              }}
            >
              Investment
            </p>

            <p style={subValueStyle}>
              {formatCurrency(
                totalInvestment
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Card Style
const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "24px",
};

// Section Title
const titleStyle = {
  margin: 0,
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: "600",
  color: "#222",
};

// Layout
const dataStyle = {
  display: "flex",
  justifyContent:
    "space-between",
  gap: "40px",
  flexWrap: "wrap",
};

// Main Values
const valueStyle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "600",
};

// Secondary Values
const subValueStyle = {
  margin: "4px 0 0 0",
  color: "#333",
  fontSize: "15px",
  fontWeight: "500",
};

// Labels
const labelStyle = {
  margin: "6px 0 0 0",
  color: "#777",
  fontSize: "12px",
  fontWeight: "500",
  textTransform: "uppercase",
};

export default Summary;