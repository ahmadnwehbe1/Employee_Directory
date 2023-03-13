const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());

app.use("/", userRoutes);

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
