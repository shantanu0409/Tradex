import React from "react";

const apps = [
  {
    name: "Price Alerts",
    icon: "🔔",
    description:
      "Create alerts and get notified when stocks cross your target price.",
    status: "Active",
  },
  {
    name: "Portfolio Analytics",
    icon: "📊",
    description:
      "View allocation, profit/loss, and portfolio performance charts.",
    status: "Active",
  },
  {
    name: "Candlestick Charts",
    icon: "📈",
    description:
      "Analyze stocks using interactive candlestick charts.",
    status: "Active",
  },
  {
    name: "Email Notifications",
    icon: "📧",
    description:
      "Receive price alerts directly in your email inbox.",
    status: "Active",
  },
  {
    name: "Watchlist",
    icon: "⭐",
    description:
      "Track your favorite stocks with live price updates.",
    status: "Active",
  },
  {
    name: "Backtesting Engine",
    icon: "🧠",
    description:
      "Test trading strategies using historical market data.",
    status: "Coming Soon",
  },
  {
    name: "Broker API Integration",
    icon: "🔗",
    description:
      "Connect to real broker APIs for live trading.",
    status: "Coming Soon",
  },
  {
    name: "AI Trading Assistant",
    icon: "🤖",
    description:
      "Get intelligent insights and trading suggestions.",
    status: "Coming Soon",
  },
];

const Apps = () => {
  return (
    <div
      style={{
        padding: "30px",
        background: "#f7f7f7",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: "8px",
            fontSize: "30px",
            fontWeight: "600",
            color: "#222",
          }}
        >
          Apps
        </h1>

        <p
          style={{
            margin: 0,
            color: "#777",
            fontSize: "14px",
          }}
        >
          Explore tools and features available in your trading platform.
        </p>
      </div>

      {/* Apps Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {apps.map(
          (app, index) => (
            <div
              key={index}
              style={cardStyle}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "14px",
                }}
              >
                {app.icon}
              </div>

              {/* Name */}
              <h3
                style={{
                  margin: 0,
                  marginBottom: "10px",
                  color: "#222",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {app.name}
              </h3>

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  marginBottom: "16px",
                  color: "#777",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                {app.description}
              </p>

              {/* Status Badge */}
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "600",
                  background:
                    app.status ===
                    "Active"
                      ? "#16a34a"
                      : "#f59e0b",
                  color: "white",
                }}
              >
                {app.status}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

// Shared Card Style
const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "none",
};

export default Apps;