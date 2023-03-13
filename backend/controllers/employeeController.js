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
    res.status(201).json({ success: true, employee });
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
    res.status(200).json({ success: true, employee });
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

    // Set picture property to filename if a file was uploaded
    if (req.file) {
      employee.picture = req.file.filename;
    }

    await employee.validate();
    await employee.save();
    res.json({ success: true, employee });
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

exports.getEmployees = async (req, res) => {
  try {
    const { q, department, sort, page, limit } = req.query;

    // Set up query
    const query = {};
    if (department) {
      query.department = department;
    }
    if (q) {
      query.$or = [
        { first_name: { $regex: q, $options: "i" } },
        { last_name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { job_title: { $regex: q, $options: "i" } },
      ];
    }

    // Set up sort
    let sortQuery = { first_name: 1 };
    if (sort === "desc") {
      sortQuery = { first_name: -1 };
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const employees = await Employee.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize);

    employeesCount = await Employee.count(query);
    res.json({ success: true, employees, employeesCount });
  } catch (error) {
    res.status(500).send(error);
  }
};
