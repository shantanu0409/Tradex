import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res =
        await API.post(
          "/signup",
          user
        );

      alert(
        res.data.message ||
          "Account created successfully"
      );

      setUser({
        name: "",
        email: "",
        password: "",
        mobile: "",
      });

      window.location.href =
        "/login";
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
          "Signup Failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = () => {
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
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4">
                {/* Header */}
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2">
                    Create Account
                  </h2>

                  <p className="text-muted small mb-0">
                    Open your free
                    TradeX account.
                  </p>
                </div>

                {/* Signup Form */}
                <form
                  onSubmit={
                    handleSignup
                  }
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="form-control rounded-3"
                      value={
                        user.name
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="form-control rounded-3"
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
                      className="form-control rounded-3"
                      value={
                        user.password
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Mobile Number"
                      className="form-control rounded-3"
                      value={
                        user.mobile
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-3 fw-semibold py-2"
                    disabled={
                      loading
                    }
                  >
                    {loading
                      ? "Creating..."
                      : "Create Account"}
                  </button>
                </form>

                {/* Divider */}
                <div className="text-center my-3">
                  <span className="text-muted small">
                    OR
                  </span>
                </div>

                {/* Google Signup */}
                <button
                  onClick={
                    googleSignup
                  }
                  className="btn btn-outline-dark w-100 rounded-3 fw-semibold py-2"
                >
                  Continue with
                  Google
                </button>

                {/* Login Link */}
                <div className="text-center mt-3">
                  <p className="text-muted small mb-1">
                    Already have an
                    account?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-none fw-semibold"
                    >
                      Login
                    </Link>
                  </p>

                  <Link
                    to="/"
                    className="text-muted small text-decoration-none"
                  >
                    ← Back to Home
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

export default Signup;