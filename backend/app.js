const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongoose connection successful");
  })
  .catch((err) => {
    console.log("Error connecting to Mongoose");
  });

app.listen(port, () => {
  console.log("Sever started at port " + port);
});
