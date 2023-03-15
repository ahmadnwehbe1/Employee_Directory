import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEmployee,
  clearDeleteErrors,
  clearEmployeeMessages,
  deleteEmployee,
  editEmployee,
} from "../actions/employeesActions";

const EmployeeForm = ({ employee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job_title: "",
    department: "",
    address: "",
    picture: null,
  });

  const { loading, message, error } = useSelector((state) => state.addEmployee);

  const {
    loading: loadingDelete,
    message: messageDelete,
    error: errorDelete,
  } = useSelector((state) => state.deleteEmployee);

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

  const deleteCLick = () => {
    if (
      window.confirm("Are you sure you want to delete this employee?") === true
    ) {
      dispatch(deleteEmployee(id));
    }
  };

  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone,
        job_title: employee.job_title,
        department: employee.department,
        address: employee.address,
        picture: null,
      });
    }
    if (error) {
      alert(error);
    }

    if (errorDelete) {
      alert(errorDelete);
    }

    if (message) {
      dispatch(clearEmployeeMessages());

      navigate("/");
    }
    if (messageDelete) {
      dispatch(clearDeleteErrors());
      navigate("/");
    }
  }, [
    error,
    message,
    navigate,
    dispatch,
    employee,
    errorDelete,
    messageDelete,
  ]);

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
    console.log(formData);
    if (formData.picture) {
      form.append("picture", formData.picture);
    }
    for (var pair of form.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (!employee) {
      dispatch(addEmployee(form));
    }
    if (employee) {
      dispatch(editEmployee(formData, id));
    }
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
        <div className="form-btns">
          <button type="submit" disabled={loading || loadingDelete}>
            Save
          </button>
          {employee && (
            <button
              style={{ backgroundColor: "red", color: "white" }}
              disabled={loading || loadingDelete}
              onClick={deleteCLick}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
