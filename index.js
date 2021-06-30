const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const router = require("./index.route");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

const connectDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const options = {
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(uri, options);
    console.log("connect success to database");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

connectDatabase();

app.use("/api", router);

module.exports = app;
