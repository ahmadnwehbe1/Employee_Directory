import {
  faEnvelope,
  faMailBulk,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function EmployeeCard({ employee }) {
  return (
    <div className="employee-card rotate-center">
      <div className="left">
        <img
          src={
            employee.picture
              ? `http://localhost:8000/${employee.picture}`
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          }
        />
        <div className="contact-details">
          <Link
            to="#"
            onClick={(e) => {
              window.location.href = `mailto:${employee.email}`;
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} color="blue" />
          </Link>
          <Link
            to="#"
            onClick={(e) => {
              window.location.href = `tel:${employee.phone}`;
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faPhone} color="blue" />
          </Link>
        </div>
      </div>

      <div className="right">
        <div className="right-row">
          Name: {`${employee.first_name} ${employee.last_name}`}
        </div>
        <div className="right-row">
          Job: <span>{`${employee.job_title}`}</span>
        </div>
        <div className="right-row">Email: {`${employee.email}`}</div>
        <div className="right-row">Phone: {`${employee.phone}`}</div>
        <div className="right-row">Department: {`${employee.department}`}</div>
        <div className="right-row">Address: {`${employee.address}`}</div>
      </div>
    </div>
  );
}

export default EmployeeCard;
