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
    default: "2020-01-01",
  },
  terminationDate: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isManager: {
    type: Boolean,
    default: false,
  },
  manager: {
    type: String,
    default: null,
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
    get: a = () => {
      let b = weeklyHours * hourlyRate * 52;
      return b;
    }
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
  fte: {
    type: Number,
    get: a = () => {
      let b = weeklyHours/40;
      return b;
    }
  }
});

module.exports = mongoose.model("Users", Users);
