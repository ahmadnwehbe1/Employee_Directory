import React from "react";

function EmployeeCard({ employee }) {
  return (
    <div className="employee-card">
      <div className="left">
        <img src={`http://localhost:8000/${employee.picture}`} />
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
