const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PLM = require("passport-local-mongoose");


const userSchema = new Schema({
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
    default: Date.now,
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
    get: (a = () => {
      let b = weeklyHours * hourlyRate * 52;
      return b;
    }),
  },
  email: {
    type: String,
  },
  secLevel: {
    type: Number,
    default: 0,
  },
  fundAccess_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funds",
    default: null,
  }],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdateDate: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: "email" });
module.exports = mongoose.model("Users", userSchema);
