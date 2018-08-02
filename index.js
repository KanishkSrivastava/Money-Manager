require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const jwt = require('jsonwebtoken');

//connecting to DB
mongoose.connect(process.env.DB).then(() => {
  console.log("DB CONNECTED");
});

//modals
require("./models/users");
require("./models/expenses");

//middleWares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//require routes
const authRoute = require("./routes/auth");
const expeneseRoute = require("./routes/rli_expenses");

app.use("/auth", authRoute);
app.use("/expenses", expeneseRoute);

app.listen(8080, () => {
  console.log("APP RUNNING");
});

// killall -9 node
