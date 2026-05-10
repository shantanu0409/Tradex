import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const token =
    localStorage.getItem("token");

  const userData =
    localStorage.getItem("user");

  const user = userData
    ? JSON.parse(userData)
    : null;

  const logout = () => {
    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";
  };

  const dashboardUrl =
    process.env
      .REACT_APP_DASHBOARD_URL ||
    "http://localhost:3001";

  return (
    <nav className="navbar navbar-expand-lg border-bottom bg-white sticky-top shadow-sm">
      <div className="container py-2">
        {/* Brand */}
        <Link
         className="navbar-brand fw-bold fs-4 text-primary"
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          TradeX
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {/* Home Link */}
            <li className="nav-item">
              <Link
                className="nav-link fw-medium"
                to="/"
              >
                Home
              </Link>
            </li>

            {/* Logged In */}
            {token ? (
              <>
                <li className="nav-item">
                  <span className="text-muted me-2">
                    Hi,{" "}
                    <strong>
                     {user?.name || user?.fullname || "Trader"}
                    </strong>
                  </span>
                </li>

                <li className="nav-item">
                  <a
                    href={dashboardUrl}
                    className="btn btn-outline-primary rounded-pill px-4"
                  >
                    Dashboard
                  </a>
                </li>

                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-danger rounded-pill px-4"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Login */}
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="btn btn-outline-primary rounded-pill px-4"
                  >
                    Login
                  </Link>
                </li>

                {/* Signup */}
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="btn btn-primary rounded-pill px-4"
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;