const Employee = require("../models/employee");

// Set up multer storage and file filter

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);

    // Set picture property to filename if a file was uploaded
    if (req.file) {
      employee.picture = req.file.filename;
    }

    await employee.validate();
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({ success: false, message: message });
    }
    if (error.code === 11000) {
      const message = `Duplicate email entered`;
      return res.status(400).json({ success: false, message: message });
    }
    res.status(500).send(error);
  }
};
