const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: {
    required: [true, "Please enter first name"],
    type: String,
  },
  last_name: {
    required: [true, "Please enter last name"],
    type: String,
  },
  full_name: {
    type: String,
  },
  email: {
    required: [true, "Please enter email address"],
    type: String,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  phone: {
    required: [true, "Please enter phone number"],
    type: String,
  },
  job_title: {
    required: [true, "Please enter job title"],
    type: String,
  },
  department: {
    required: [true, "Please enter department"],
    type: String,
  },
  address: {
    required: [true, "Please enter an address"],
    type: String,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
