const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Entries = new Schema(
  {
    datestamp: {
      type: Date,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    duration: {
      type: Number,
    },
    notes: {
      type: String,
    },
    activity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activities",
    },
    fund_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Funds",
    },
    timeEntered: {
      type: Date,
      default: Date.now,
    },
    lastUpdateDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Entries", Entries);
