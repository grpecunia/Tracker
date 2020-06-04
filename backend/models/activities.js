const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Activities = new Schema({
  activityName: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model("Activities", Activities);
