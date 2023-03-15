const Employee = require("../models/employee");
const axios = require("axios");

// Set up multer storage and file filter

exports.createEmployee = async (req, res) => {
  try {
    if (req.body.first_name) {
      req.body.first_name = req.body.first_name.toLowerCase();
    }
    if (req.body.first_name && req.body.last_name) {
      req.body.full_name =
        req.body.first_name.toLowerCase() +
        " " +
        req.body.last_name.toLowerCase();
    }
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
    employee.address = req.body.address || employee.address;

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
    const totalCount = await Employee.countDocuments();
    const { q, departments, sort, page, limit } = req.query;

    // Set up query
    const query = {};
    if (departments) {
      query.department = { $in: departments.split(",") };
    }
    if (q) {
      query.$or = [
        { first_name: { $regex: q, $options: "i" } },
        { last_name: { $regex: q, $options: "i" } },
        { full_name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { job_title: { $regex: q, $options: "i" } },
        { department: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
      ];
    }

    // Set up sort
    let sortQuery = { first_name: 1 };
    if (sort === "desc") {
      sortQuery = { first_name: -1 };
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 9;
    const skip = (pageNumber - 1) * pageSize;

    const employees = await Employee.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize);

    employeesCount = await Employee.count(query);
    res.json({ success: true, employees, employeesCount, totalCount });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Employee.distinct("department");
    return res.json({ success: true, departments });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.seedEmployees = async (req, res) => {
  let { data } = await axios.get(
    "https://randomuser.me/api/?results=100&nat=us"
  );
  let employees = [];
  const departments = [
    "Marketing",
    "Human Resources",
    "Accounting",
    "Sales",
    "Information Technology",
    "Research and Development",
    "Customer Service",
    "Operations",
  ];

  const jobTitles = [
    "Software Developer",
    "Marketing Coordinator",
    "Human Resources Specialist",
    "Accountant",
    "Sales Representative",
    "IT Manager",
    "Research Analyst",
    "Customer Service Representative",
    "Operations Manager",
  ];

  await Promise.all(
    data.results.map(async (result) => {
      let employee = {
        first_name: result.name.first,
        last_name: result.name.last,
        email: result.email,
        phone: result.phone,
        address: result.location.street.name,
        picture: result.picture.medium,
        department: departments[Math.floor(Math.random() * departments.length)],
        job_title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      };
      employees.push(employee);
    })
  );

  Employee.insertMany(employees)
    .then((docs) => {
      return res.json({
        success: true,
        message: `${docs.length} employees inserted`,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: true,
        message: "Unable to insert employees",
      });
    });
};
