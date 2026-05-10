const rateLimit = require("express-rate-limit");

// Login / Signup limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // was too low
  message: {
    message:
      "Too many authentication attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stock API limiter
const stockLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // allow many watchlist requests
  message: {
    message:
      "Too many stock requests. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Search limiter
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200,
  message: {
    message:
      "Too many search requests. Please try again shortly.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  authLimiter,
  stockLimiter,
  searchLimiter,
};