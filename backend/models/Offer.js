const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    buyerName: {
      type: String,
      required: true,
      trim: true,
    },

    buyerType: {
      type: String,
      trim: true,
    },

    buyerLocation: {
      type: String,
      trim: true,
    },

    crop: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    offeredPrice: {
      type: Number,
      required: true,
      min: 1,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Sent", "Accepted", "Rejected", "Pending"],
      default: "Sent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);