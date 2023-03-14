import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addEmployee,
  clearEmployeeMessages,
} from "../actions/employeesActions";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job_title: "",
    department: "",
    picture: null,
  });

  const { loading, message, error } = useSelector((state) => state.addEmployee);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleFileInputChange = (event) => {
    setFormData({
      ...formData,
      picture: event.target.files[0],
    });
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (message) {
      dispatch(clearEmployeeMessages());
      navigate("/");
    }
  }, [error, message, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("first_name", formData.first_name);
    form.append("last_name", formData.last_name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("job_title", formData.job_title);
    form.append("department", formData.department);
    form.append("address", formData.address);
    if (formData.picture) {
      form.append("picture", formData.picture);
    }
    dispatch(addEmployee(form));

    // try {
    //   const response = await axios.post("/employees", form);
    //   setFormData({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     phone: "",
    //     job_title: "",
    //     department: "",
    //     picture: null,
    //   });
    //   setSuccessMessage("Employee created successfully");
    // } catch (error) {
    //   if (error.response.data.errors) {
    //     setErrorMessage(error.response.data.errors.join(", "));
    //   } else {
    //     setErrorMessage("Failed to create employee");
    //   }
    // }
  };
  return (
    <div className="employee-form">
      <form onSubmit={handleSubmit}>
        <div className="two-inputs">
          <div className="all-input">
            <div className="label">First Name:</div>
            <div className="label">
              <input
                placeholder="First Name"
                type="text"
                required
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="all-input">
            <div className="label">Last Name:</div>
            <div className="label">
              <input
                placeholder="Last Name"
                type="text"
                required
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="two-inputs">
          <div className="all-input">
            <div className="label">Job:</div>
            <div className="label">
              <input
                placeholder="Job"
                type="text"
                required
                id="job_title"
                name="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="all-input">
            <div className="label">Department:</div>
            <div className="label">
              <input
                placeholder="Department"
                type="text"
                required
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="all-input">
          <div className="label">Email:</div>
          <div className="label">
            <input
              placeholder="Email"
              type="email"
              required
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="all-input">
          <div className="label">Phone:</div>
          <div className="label">
            <input
              placeholder="Phone"
              type="tel"
              required
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="all-input">
          <div className="label">Address:</div>
          <div className="label">
            <input
              placeholder="Phone"
              type="text"
              required
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="all-input">
          <div className="label">Picture:</div>
          <div className="label">
            <input
              type="file"
              name="picture"
              id="picture"
              onChange={handleFileInputChange}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
