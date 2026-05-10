const { Schema, model } = require("mongoose");

const WatchlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate stocks for same user
WatchlistSchema.index(
  { userId: 1, symbol: 1 },
  { unique: true }
);

const WatchlistModel = model(
  "watchlists",
  WatchlistSchema
);

module.exports = { WatchlistModel };