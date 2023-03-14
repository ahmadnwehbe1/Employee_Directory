const multer = require("multer");
const express = require("express");
const {
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployees,
  getDepartments,
} = require("../controllers/employeeController");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.split("/")[1];
    const filename = "employee_" + uniqueSuffix + "." + extension;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"));
  }

  cb(null, true);
};

// Set up multer upload
const upload = multer({ storage, fileFilter });

router.post("/employee", upload.single("picture"), createEmployee);
router.get("/employee/:id", getEmployee);
router.delete("/employee/:id", deleteEmployee);
router.put("/employee/:id", updateEmployee);
router.get("/employees", getEmployees);
router.get("/departments", getDepartments);

module.exports = router;
