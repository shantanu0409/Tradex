import React from "react";

function Footer() {
  return (
    <footer
      className="border-top mt-5"
      style={{
        backgroundColor: "#fafafa",
      }}
    >
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-md-4">
            <h3 className="fw-bold text-primary">
              TradeX
            </h3>

            <p className="text-muted mt-3">
              A real-time stock trading
              platform built with React,
              Node.js, Express, MongoDB,
              and Socket.IO.
            </p>

            <p className="text-muted small mb-0">
              © 2026 TradeX. All rights
              reserved.
            </p>
          </div>

          {/* Product Links */}
          <div className="col-md-2">
            <h6 className="fw-semibold">
              Product
            </h6>

            <a
              href="/"
              className="footer-link"
            >
              Home
            </a>
            <br />

            <a
              href="/login"
              className="footer-link"
            >
              Login
            </a>
            <br />

            <a
              href="/signup"
              className="footer-link"
            >
              Signup
            </a>
          </div>

          {/* Features */}
          <div className="col-md-3">
            <h6 className="fw-semibold">
              Features
            </h6>

            <p className="text-muted small mb-1">
              Real-Time Prices
            </p>
            <p className="text-muted small mb-1">
              Portfolio Analytics
            </p>
            <p className="text-muted small mb-1">
              Smart Alerts
            </p>
            <p className="text-muted small mb-1">
              Wallet Management
            </p>
            <p className="text-muted small mb-1">
              Automated Orders
            </p>
          </div>

          {/* Tech Stack */}
          <div className="col-md-3">
            <h6 className="fw-semibold">
              Built With
            </h6>

            <p className="text-muted small mb-1">
              React
            </p>
            <p className="text-muted small mb-1">
              Node.js
            </p>
            <p className="text-muted small mb-1">
              Express
            </p>
            <p className="text-muted small mb-1">
              MongoDB
            </p>
            <p className="text-muted small mb-1">
              Socket.IO
            </p>
          </div>
        </div>

{/* Developer Information */}
<div className="mt-5 pt-4 border-top">
  <div className="row align-items-center gy-3">
    {/* Left Side */}
    <div className="col-md-6 text-center text-md-start">
      <p className="text-muted small mb-1">
        Built and designed by
      </p>

      <h5 className="fw-bold mb-1 text-dark">
        Shantanu Halgaonkar
      </h5>

      <p className="text-muted small mb-0">
        Computer Science & Design Engineering • Full-Stack Developer
      </p>
    </div>

    {/* Right Side */}
    <div className="col-md-6 text-center text-md-end">
  
  <a
    href="mailto:shantanuhalgaonkar666@gmail.com"
    className="footer-link me-3"
  >
    shantanuhalgaonkar666@gmail.com
  </a>


      <a
        href="https://github.com/shantanu0409/Tradex.git"
        target="_blank"
        rel="noreferrer"
        className="footer-link me-3"
      >
        GitHub
      </a>

      <a
        href="https://www.linkedin.com/in/shantanuhalgaonkar/"
        target="_blank"
        rel="noreferrer"
        className="footer-link"
      >
        LinkedIn
      </a>
    </div>
  </div>
</div>
      </div>

      <style>{`
        .footer-link {
          color: #6c757d;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 6px;
        }

        .footer-link:hover {
          color: #0d6efd;
        }
      `}</style>
    </footer>
  );
}

export default Footer;