import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res =
        await API.post(
          "/login",
          user
        );

      // Save token and user
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      alert(
        "Login Successful"
      );

      const dashboardUrl =
        process.env
          .REACT_APP_DASHBOARD_URL ||
        "http://localhost:3001";

      // Redirect to dashboard
      window.location.href =
        `${dashboardUrl}/?token=${encodeURIComponent(
          res.data.token
        )}&user=${encodeURIComponent(
          JSON.stringify(
            res.data.user
          )
        )}`;
    } catch (err) {
      console.log(err);

      if (
        err.response?.data
          ?.message
      ) {
        alert(
          err.response.data
            .message
        );
      } else {
        alert(
          "Login Failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    const apiUrl =
      process.env
        .REACT_APP_API_URL ||
      "http://localhost:3002";

    window.location.href =
      `${apiUrl}/auth/google`;
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* Balanced Medium Card */}
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4">
                {/* Header */}
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2">
                    Welcome Back
                  </h2>

                  <p className="text-muted mb-0">
                    Login to your
                    TradeX
                    account.
                  </p>
                </div>

                {/* Email/Password Form */}
                <form
                  onSubmit={
                    handleLogin
                  }
                >
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="form-control form-control-lg rounded-3"
                      value={
                        user.email
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control form-control-lg rounded-3"
                      value={
                        user.password
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 rounded-3 fw-semibold py-2"
                    disabled={
                      loading
                    }
                  >
                    {loading
                      ? "Logging In..."
                      : "Login"}
                  </button>
                </form>

                {/* Divider */}
                <div className="text-center my-3">
                  <span className="text-muted small">
                    OR
                  </span>
                </div>

                {/* Google Login */}
                <button
                  onClick={
                    googleLogin
                  }
                  className="btn btn-outline-dark btn-lg w-100 rounded-3 fw-semibold py-2"
                >
                  Continue with
                  Google
                </button>

                {/* Links */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-1">
                    Don't have an
                    account?{" "}
                    <Link
                      to="/signup"
                      className="text-decoration-none fw-semibold"
                    >
                      Create one
                    </Link>
                  </p>

                  <Link
                    to="/"
                    className="text-muted small text-decoration-none"
                  >
                    ← Back to
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;