const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Clocker = new Schema(
  {
    datestamp: {
      type: Date,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    type: {
      type: Array,
      options: ["In", "Out", "Break", "Lunch"],
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Clocker", Clocker);
