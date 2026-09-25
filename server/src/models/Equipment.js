const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    dailyRate: {
      type: Number,
      required: true,
      min: 0,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },
    safetyInstructions: {
      type: String,
      required: true,
    },
    operationalInstructions: {
      type: String,
      required: true,
    },
    specifications: {
      type: [specificationSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Equipment", equipmentSchema);
