const { Schema, model } = require("mongoose");

const AlertSchema = new Schema(
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

    condition: {
      type: String,
      enum: ["ABOVE", "BELOW"],
      required: true,
    },

    targetPrice: {
      type: Number,
      required: true,
    },

    triggered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AlertModel = model(
  "alerts",
  AlertSchema
);

module.exports = { AlertModel };