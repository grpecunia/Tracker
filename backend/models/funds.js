const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Funds = new Schema({
  fundName: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  source: {
    type: String,
  },
  amount: {
    type: Number,
  },
  createdTimeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Funds", Funds);
