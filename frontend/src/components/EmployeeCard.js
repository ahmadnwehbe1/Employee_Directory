import React from "react";

function EmployeeCard({ employee }) {
  return (
    <div className="employee-card">
      <div className="left">
        <img
          src={
            employee.picture
              ? `http://localhost:8000/${employee.picture}`
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          }
        />
      </div>
      <div className="right">
        <div className="right-row">
          Name: {`${employee.first_name} ${employee.last_name}`}
        </div>
        <div className="right-row">Job: {`${employee.job_title}`}</div>
        <div className="right-row">Email: {`${employee.email}`}</div>
        <div className="right-row">Phone: {`${employee.phone}`}</div>
        <div className="right-row">Department: {`${employee.department}`}</div>
      </div>
    </div>
  );
}

export default EmployeeCard;
