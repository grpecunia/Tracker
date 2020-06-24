const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Clocker = new Schema({
  datestamp: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  type: {
    type: String,
    default: "Break",
  },
  ip: {
    type: String,
    default: "12345",
  },
  city: {
    type: String,
    default: "San Juan",
  },
  state: {
    type: String,
    default: "Puerto Rico",
  },
  zip: {
    type: String,
    default: "00969",
  },
  country: {
    type: String,
    default: "US",
  },
});

module.exports = mongoose.model("Clocker", Clocker);
