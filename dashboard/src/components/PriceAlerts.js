
import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import API from "../api";
import io from "socket.io-client";

const socket = io(
  process.env.REACT_APP_API_URL ||
    "http://localhost:3002"
);

const PriceAlerts = () => {
  const [alerts, setAlerts] =
    useState([]);

  const [symbol, setSymbol] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [searchResults,
    setSearchResults] =
    useState([]);

  const [showDropdown,
    setShowDropdown] =
    useState(false);

  const [condition, setCondition] =
    useState("ABOVE");

  const [targetPrice,
    setTargetPrice] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const userId =
    JSON.parse(
      localStorage.getItem("user")
    )?._id;

  // =========================
  // LOAD ALERTS
  // =========================

  const loadAlerts =
    useCallback(async () => {
      if (!userId) return;

      try {
        const res =
          await API.get(
            `/alerts/${userId}`
          );

        setAlerts(res.data);
      } catch (error) {
        console.log(
          "Load Alerts Error:",
          error
        );
      }
    }, [userId]);

  // =========================
  // DYNAMIC STOCK SEARCH
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
      } catch (error) {
        setSearchResults([]);
        setShowDropdown(true);
      }
    };

  // =========================
  // CREATE ALERT
  // =========================

  const createAlert =
    async (e) => {
      e.preventDefault();

      if (
        !symbol.trim() ||
        Number(targetPrice) <= 0
      ) {
        alert(
          "Please select a stock and enter a valid target price."
        );
        return;
      }

      if (!userId) {
        alert(
          "Please login first."
        );
        return;
      }

      try {
        setLoading(true);

        await API.post(
          "/alerts",
          {
            userId,
            symbol:
              symbol
                .toUpperCase()
                .trim(),
            condition,
            targetPrice:
              Number(
                targetPrice
              ),
          }
        );

        // Reset form
        setSymbol("");
        setSearch("");
        setSearchResults([]);
        setShowDropdown(false);
        setTargetPrice("");

        loadAlerts();
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to create alert"
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // DELETE ALERT
  // =========================

  const deleteAlert =
    async (id) => {
      try {
        await API.delete(
          `/alerts/${id}`
        );

        setAlerts((prev) =>
          prev.filter(
            (alert) =>
              alert._id !== id
          )
        );
      } catch (error) {
        alert(
          "Failed to delete alert"
        );
      }
    };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  // =========================
  // SOCKET NOTIFICATIONS
  // =========================

  useEffect(() => {
    if (
      "Notification" in
        window &&
      Notification.permission !==
        "granted"
    ) {
      Notification.requestPermission();
    }

    socket.on(
      "priceAlertTriggered",
      (data) => {
        if (
          data.userId !==
          userId
        ) {
          return;
        }

        const message =
          `${data.symbol} ${data.condition} ₹${data.targetPrice}. ` +
          `Current Price: ₹${data.currentPrice}`;

        if (
          "Notification" in
            window &&
          Notification.permission ===
            "granted"
        ) {
          new Notification(
            "🔔 Price Alert",
            {
              body: message,
            }
          );
        }

        alert(message);
        loadAlerts();
      }
    );

    return () => {
      socket.off(
        "priceAlertTriggered"
      );
    };
  }, [userId, loadAlerts]);

  // =========================
  // UI
  // =========================

  return (
    <div
      style={{
        padding: "30px",
        background:
          "#f7f7f7",
        minHeight:
          "100vh",
        color: "#333",
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
          Price Alerts
        </h1>

        <p
          style={{
            margin: 0,
            color: "#777",
            fontSize: "14px",
          }}
        >
          Get notified when a
          stock reaches your
          target price.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={
          createAlert
        }
        style={{
          ...cardStyle,
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom:
            "25px",
        }}
      >
        {/* Searchable Stock Input */}
        <div
          style={{
            position:
              "relative",
            minWidth:
              "260px",
            flex: 1,
          }}
        >
          <input
            type="text"
            placeholder="Search stock..."
            value={search}
            onChange={(e) =>
              handleDynamicSearch(
                e.target.value
              )
            }
            style={{
              ...inputStyle,
              width: "100%",
            }}
          />

          {showDropdown && (
            <div
              style={{
                position:
                  "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                background:
                  "#ffffff",
                border:
                  "1px solid #d1d5db",
                borderRadius:
                  "6px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
                zIndex: 999,
                maxHeight:
                  "250px",
                overflowY:
                  "auto",
                marginTop:
                  "4px",
              }}
            >
              {searchResults.length >
              0 ? (
                searchResults.map(
                  (
                    stock,
                    index
                  ) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSymbol(
                          stock.symbol
                        );

                        setSearch(
                          stock.name
                        );

                        setShowDropdown(
                          false
                        );
                      }}
                      style={{
                        padding:
                          "10px 12px",
                        cursor:
                          "pointer",
                        borderBottom:
                          "1px solid #f3f4f6",
                      }}
                    >
                      <div
                        style={{
                          fontWeight:
                            "500",
                        }}
                      >
                        {stock.name}
                      </div>

                      <div
                        style={{
                          fontSize:
                            "12px",
                          color:
                            "#6b7280",
                        }}
                      >
                        {stock.symbol}
                      </div>
                    </div>
                  )
                )
              ) : (
                <div
                  style={{
                    padding:
                      "10px 12px",
                    color:
                      "#6b7280",
                  }}
                >
                  No matching stocks found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Condition */}
        <select
          value={condition}
          onChange={(e) =>
            setCondition(
              e.target.value
            )
          }
          style={inputStyle}
        >
          <option value="ABOVE">
            Above
          </option>
          <option value="BELOW">
            Below
          </option>
        </select>

        {/* Target Price */}
        <input
          type="number"
          min="1"
          placeholder="Target Price"
          value={
            targetPrice
          }
          onChange={(e) =>
            setTargetPrice(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={primaryButton}
        >
          {loading
            ? "Creating..."
            : "Create Alert"}
        </button>
      </form>

      {/* Empty State */}
      {alerts.length ===
      0 ? (
        <div
          style={{
            ...cardStyle,
            textAlign:
              "center",
            color: "#777",
            padding:
              "40px",
          }}
        >
          No alerts created
          yet.
        </div>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert._id}
            style={{
              ...cardStyle,
              marginBottom:
                "12px",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              flexWrap:
                "wrap",
              gap: "10px",
            }}
          >
            <div
              style={{
                color: "#333",
              }}
            >
              <strong>
                {
                  alert.symbol
                }
              </strong>{" "}
              {
                alert.condition
              }{" "}
              ₹
              {
                alert.targetPrice
              }
              {" • "}
              <span
                style={{
                  color:
                    alert.triggered
                      ? "#16a34a"
                      : "#f59e0b",
                  fontWeight:
                    "600",
                }}
              >
                {alert.triggered
                  ? "Triggered"
                  : "Active"}
              </span>
            </div>

            <button
              onClick={() =>
                deleteAlert(
                  alert._id
                )
              }
              style={
                deleteButton
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

// =========================
// SHARED STYLES
// =========================

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "none",
};

const inputStyle = {
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#333",
  outline: "none",
  fontSize: "14px",
  minWidth: "160px",
};

const primaryButton = {
  padding: "10px 16px",
  borderRadius: "4px",
  border: "none",
  background: "#387ed1",
  color: "white",
  fontWeight: "500",
  fontSize: "14px",
  cursor: "pointer",
};

const deleteButton = {
  padding: "8px 14px",
  borderRadius: "4px",
  border: "none",
  background: "#ef4444",
  color: "white",
  fontWeight: "500",
  fontSize: "14px",
  cursor: "pointer",
};

export default PriceAlerts;
