const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");

require("dotenv").config();

const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employee");

const app = express();
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", employeeRoutes);

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
