const { Schema } =
  require("mongoose");

const HoldingsSchema =
  new Schema({

    userId: {

      type:
        Schema.Types.ObjectId,

      ref: "User",
    },

    name: String,

    qty: Number,

    avg: Number,

    price: Number,

    net: String,

    day: String,
  });

module.exports = {
  HoldingsSchema,
};