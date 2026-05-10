import React, {
  useState,
} from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

const Menu = () => {
  const [
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
  ] = useState(false);

  const location =
    useLocation();

  // Logged-in user
  const userData =
    localStorage.getItem("user");

  const user = userData
    ? JSON.parse(userData)
    : null;

  // Username
  const fullName =
    user?.fullname ||
    "Trader";

  // Generate initials from full name
  const initials =
    fullName
      .split(" ")
      .map((word) =>
        word[0]?.toUpperCase()
      )
      .slice(0, 2)
      .join("");

  const handleProfileClick =
    () => {
      setIsProfileDropdownOpen(
        !isProfileDropdownOpen
      );
    };

  const menuClass = "menu";
  const activeMenuClass =
    "menu selected";

  // Returns active class based on current URL
  const getMenuClass = (
    path
  ) => {
    if (
      path === "/" &&
      location.pathname ===
        "/"
    ) {
      return activeMenuClass;
    }

    if (
      path !== "/" &&
      location.pathname.startsWith(
        path
      )
    ) {
      return activeMenuClass;
    }

    return menuClass;
  };

  // Logout
  const handleLogout =
    () => {
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

  return (
    <div className="menu-container">
      {/* Logo */}
      <img
        src="/media/images/kite-logo.svg"
        alt="Logo"
        style={{
          width: "30px",
        }}
      />

      <div className="menus">
        <ul>
          {/* Dashboard */}
          <li>
            <Link
              to="/"
              style={{
                textDecoration:
                  "none",
              }}
            >
              <p
                className={getMenuClass(
                  "/"
                )}
              >
                Dashboard
              </p>
            </Link>
          </li>

          {/* Orders */}
          <li>
            <Link
              to="/orders"
              style={{
                textDecoration:
                  "none",
              }}
            >
              <p
                className={getMenuClass(
                  "/orders"
                )}
              >
                Orders
              </p>
            </Link>
          </li>

          {/* Holdings */}
          <li>
            <Link
              to="/holdings"
              style={{
                textDecoration:
                  "none",
              }}
            >
              <p
                className={getMenuClass(
                  "/holdings"
                )}
              >
                Holdings
              </p>
            </Link>
          </li>

          {/* Positions */}
          <li>
            <Link
              to="/positions"
              style={{
                textDecoration:
                  "none",
              }}
            >
              <p
                className={getMenuClass(
                  "/positions"
                )}
              >
                Positions
              </p>
            </Link>
          </li>

          {/* Funds */}
          <li>
            <Link
              to="/funds"
              style={{
                textDecoration:
                  "none",
              }}
            >
              <p
                className={getMenuClass(
                  "/funds"
                )}
              >
                Funds
              </p>
            </Link>
          </li>

          {/* Apps */}
          <li>
            <Link
              to="/apps"
              style={{
                textDecoration:
                  "none",
              }}
            >
              <p
                className={getMenuClass(
                  "/apps"
                )}
              >
                Apps
              </p>
            </Link>
          </li>

          {/* Alerts */}
          <li>
            <Link
              to="/alerts"
              style={{
                textDecoration:
                  "none",
              }}
            >
              <p
                className={getMenuClass(
                  "/alerts"
                )}
              >
                Alerts
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {/* Profile Section */}
        <div
          className="profile"
          onClick={
            handleProfileClick
          }
          style={{
            cursor: "pointer",
            position:
              "relative",
          }}
        >
          <div className="avatar">
            {initials}
          </div>

          <p className="username">
            {fullName}
          </p>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div
              style={{
                position:
                  "absolute",
                bottom: "60px",
                right: 0,
                background:
                  "#ffffff",
                border:
                  "1px solid #e5e7eb",
                borderRadius:
                  "8px",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.12)",
                minWidth:
                  "180px",
                zIndex: 1000,
                overflow:
                  "hidden",
              }}
            >
              {/* User Info */}
              <div
                style={{
                  padding:
                    "12px 16px",
                  borderBottom:
                    "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    fontWeight:
                      "600",
                    color:
                      "#222",
                    fontSize:
                      "14px",
                  }}
                >
                  {fullName}
                </div>

                <div
                  style={{
                    color:
                      "#777",
                    fontSize:
                      "12px",
                    marginTop:
                      "4px",
                  }}
                >
                  My Account
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={(
                  e
                ) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                style={{
                  width: "100%",
                  padding:
                    "12px 16px",
                  background:
                    "white",
                  border:
                    "none",
                  textAlign:
                    "left",
                  cursor:
                    "pointer",
                  color:
                    "#ef4444",
                  fontWeight:
                    "500",
                  fontSize:
                    "14px",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;