import React from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

function TopBar() {
  // Current route
  const location =
    useLocation();

  // Logged-in user
  const userData =
    localStorage.getItem("user");

  const user = userData
    ? JSON.parse(userData)
    : null;

  // Logout
  const logout = () => {
    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem(
      "user"
    );

   window.location.href =
  process.env.REACT_APP_FRONTEND_URL ||
  "http://localhost:3000/login";
  };

  // Active link style
  const getLinkStyle = (
    path
  ) => ({
    color:
      location.pathname ===
      path
        ? "#387ed1"
        : "#666",
    textDecoration:
      "none",
    fontSize: "14px",
    fontWeight:
      location.pathname ===
      path
        ? "600"
        : "400",
    padding: "6px 10px",
    borderBottom:
      location.pathname ===
      path
        ? "2px solid #387ed1"
        : "2px solid transparent",
    whiteSpace:
      "nowrap",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        padding:
          "12px 30px",
        background:
          "#ffffff",
        borderBottom:
          "1px solid #e5e7eb",
        position:
          "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {/* Logo */}
        <h2
          style={{
            margin: 0,
            marginRight:
              "18px",
            color:
              "#387ed1",
            fontSize:
              "24px",
            fontWeight:
              "600",
          }}
        >
          TradeX
        </h2>

        {/* Navigation */}
        <Link
          to="/"
          style={getLinkStyle(
            "/"
          )}
        >
          Dashboard
        </Link>

        <Link
          to="/orders"
          style={getLinkStyle(
            "/orders"
          )}
        >
          Orders
        </Link>

        <Link
          to="/holdings"
          style={getLinkStyle(
            "/holdings"
          )}
        >
          Holdings
        </Link>

        <Link
          to="/positions"
          style={getLinkStyle(
            "/positions"
          )}
        >
          Positions
        </Link>

        <Link
          to="/funds"
          style={getLinkStyle(
            "/funds"
          )}
        >
          Funds
        </Link>

        <Link
          to="/apps"
          style={getLinkStyle(
            "/apps"
          )}
        >
          Apps
        </Link>

        <Link
          to="/alerts"
          style={getLinkStyle(
            "/alerts"
          )}
        >
          Alerts
        </Link>

        <Link
  to="/profile"
  style={getLinkStyle(
    "/profile"
  )}
>
  Profile
</Link>
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: "15px",
        }}
      >
        {/* Username */}
        <span
          style={{
            color: "#444",
            fontSize: "14px",
            fontWeight:
              "500",
            whiteSpace:
              "nowrap",
          }}
        >
          {user?.fullname ||
            "Trader"}
        </span>

        {/* Logout Button */}
        <button
          onClick={logout}
          style={{
            background:
              "#387ed1",
            border: "none",
            color: "white",
            padding:
              "8px 14px",
            borderRadius:
              "4px",
            cursor:
              "pointer",
            fontSize:
              "14px",
            fontWeight:
              "500",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TopBar;