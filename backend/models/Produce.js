const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema(
  {
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

    location: {
      type: String,
      required: true,
      trim: true,
    },

    expectedPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    harvestDate: {
      type: Date,
      required: true,
    },

    sellingDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Produce", produceSchema);