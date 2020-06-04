const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  department: {
    type: String,
    default: "Administration",
  },
  hireDate: {
    type: Date,
    default: "0001-01-01",
  },
  terminationDate: {
    type: Date,
    default: "0001-01-01",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isManager: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    default: "Main Office",
  },
  weeklyHours: {
    type: Number,
    default: 40,
  },
  hourlyRate: {
    type: Number,
    default: 10,
  },
  anualSalary: {
    type: Number,
    default: 40000,
  },
  email: {
    type: String,
    default: "email@company.com",
  },
  username: {
    type: String,
  },
  secLevel: {
    type: Number,
    default: 0,
  },
  fundAccess_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funds",
    default: null
  },
});

module.exports = mongoose.model("Users", Users);
