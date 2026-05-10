import React from "react";

function HomePage() {
  const features = [
    {
      title: "Live Stock Prices",
      description:
        "Real-time NSE stock prices powered by Yahoo Finance and Socket.IO.",
    },
    {
      title: "Automated Order Execution",
      description:
        "Place buy and sell orders that execute automatically with live updates.",
    },
    {
      title: "Portfolio Analytics",
      description:
        "Track invested value, current value, and profit/loss in real time.",
    },
    {
      title: "Price Alerts",
      description:
        "Get instant email and real-time notifications when target prices are reached.",
    },
    {
      title: "Wallet Management",
      description:
        "Add and withdraw virtual funds securely from your trading wallet.",
    },
    {
  title: "Secure Authentication",
  description:
    "JWT and Google OAuth authentication with protected APIs, validation, and rate limiting.",
},
  ];

  const steps = [
    {
      number: "01",
      title: "Create Account",
      description:
        "Sign up and securely log in to your personal trading account.",
    },
    {
      number: "02",
      title: "Add Funds",
      description:
        "Deposit virtual funds into your wallet to begin trading.",
    },
    {
      number: "03",
      title: "Place Orders",
      description:
        "Buy and sell stocks using real-time market prices.",
    },
    {
      number: "04",
      title: "Track Portfolio",
      description:
        "Monitor holdings, positions, and profit/loss.",
    },
  ];

  const highlights = [
    "Real-time stock subscriptions",
    "Watchlist and market tracking",
    "Buy and sell order simulation",
    "Automatic order execution",
    "Portfolio and holdings analysis",
    "Wallet and balance management",
    "Email-based price alerts",
    "Responsive dashboard interface",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white border-bottom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="text-primary fw-semibold mb-3">
                Full-Stack MERN Project
              </p>

              <h1 className="display-4 fw-bold mb-4">
                TradeX – Real-Time Stock Trading Platform
              </h1>

              <p className="lead text-muted mb-4">
                A complete stock trading simulation platform
                featuring live market prices, automated order
                execution, portfolio analytics, wallet
                management, watchlists, smart price alerts, and secure JWT + Google OAuth authentication.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <a
                  href="/signup"
                  className="btn btn-primary btn-lg px-4"
                >
                  Get Started
                </a>

                <a
                  href="/login"
                  className="btn btn-outline-dark btn-lg px-4"
                >
                  Login
                </a>
              </div>
            </div>

            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80"
                alt="Trading Dashboard"
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80"
                alt="Stock Market Analytics"
                className="img-fluid rounded-4 shadow-sm"
              />
            </div>

            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">
                Built to Simulate a Real Trading Experience
              </h2>

              <p className="text-muted fs-5 mb-4">
                TradeX combines live stock data, order
                management, and portfolio tracking into a
                single platform designed to replicate the
                workflow of a real online brokerage system.
              </p>

              <ul className="list-unstyled">
                {highlights.map((item, index) => (
                  <li
                    key={index}
                    className="mb-3 text-muted"
                  >
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Key Features
            </h2>
            <p className="text-muted">
              Core functionality implemented in
              the TradeX platform.
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div
                className="col-md-6 col-lg-4"
                key={index}
              >
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                  <h5 className="fw-bold mb-3">
                    {feature.title}
                  </h5>

                  <p className="text-muted mb-0">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Why Trading Platforms Matter
            </h2>
            <p className="text-muted fs-5">
              Modern investors rely on fast execution,
              live data, and analytics to make informed
              decisions.
            </p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h3 className="text-primary fw-bold mb-3">
                  Real-Time Data
                </h3>
                <p className="text-muted mb-0">
                  Market prices change every second,
                  making live updates essential for
                  accurate trading decisions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h3 className="text-primary fw-bold mb-3">
                  Risk Management
                </h3>
                <p className="text-muted mb-0">
                  Portfolio tracking and alerts help
                  traders monitor exposure and react
                  quickly to market movements.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h3 className="text-primary fw-bold mb-3">
                  Automation
                </h3>
                <p className="text-muted mb-0">
                  Automated order execution reduces
                  delays and creates a more realistic
                  trading workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              How It Works
            </h2>
            <p className="text-muted">
              Start trading in four simple steps.
            </p>
          </div>

          <div className="row g-4">
            {steps.map((step, index) => (
              <div
                className="col-md-6 col-lg-3"
                key={index}
              >
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                  <div
                    className="fw-bold text-primary mb-3"
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    {step.number}
                  </div>

                  <h5 className="fw-bold">
                    {step.title}
                  </h5>

                  <p className="text-muted small mb-0">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">
            Technology Stack
          </h2>

          <p className="text-muted fs-5">
            React • Node.js • Express • MongoDB •
Socket.IO • Yahoo Finance API • JWT •
Google OAuth 2.0
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">
            Ready to Explore TradeX?
          </h2>

          <p className="text-muted fs-5 mb-4">
            Experience a professional stock trading
            platform built with the MERN stack.
          </p>

          <a
            href="/signup"
            className="btn btn-primary btn-lg px-5"
          >
            Create Free Account
          </a>
        </div>
      </section>
    </div>
  );
}

export default HomePage;