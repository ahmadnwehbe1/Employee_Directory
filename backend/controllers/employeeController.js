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
    res.status(201).json({ success: true, message: employee });
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

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, message: employee });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Update employee properties
    employee.first_name = req.body.first_name || employee.first_name;
    employee.last_name = req.body.last_name || employee.last_name;
    employee.email = req.body.email || employee.email;
    employee.phone = req.body.phone || employee.phone;
    employee.job_title = req.body.job_title || employee.job_title;
    employee.department = req.body.department || employee.department;

    console.log(req.body);

    // Set picture property to filename if a file was uploaded
    if (req.file) {
      employee.picture = req.file.filename;
    }

    await employee.validate();
    await employee.save();
    res.json({ success: true, message: employee });
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
