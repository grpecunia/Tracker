const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("TimeTracker database connection established successfully");
});

app.listen(PORT, () => {
  console.log("Node Server is running on Port: " + PORT);
});
