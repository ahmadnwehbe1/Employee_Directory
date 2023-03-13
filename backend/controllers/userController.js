const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const sendToken = (user, statusCode, res) => {
  const token = getJwtToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

exports.registerUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    sendToken(user, 200, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({ success: false, message: message });
    }
    if (error.code === 11000) {
      const message = `Duplicate email entered`;
      return res.status(400).json({ success: false, message: message });
    }
    return res.status(400).json({ success: false, message: error });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
