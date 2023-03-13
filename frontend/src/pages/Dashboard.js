import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../actions/employeesActions";
import EmployeeCard from "../components/EmployeeCard";

function Dashboard() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { loading, employees, employeesCount } = useSelector(
    (state) => state.employees
  );

  useEffect(() => {
    dispatch(getEmployees(search));
  }, [dispatch, search]);
  return (
    <div className="dashboard">
      <input
        placeholder="Search..."
        value={search}
        style={{
          height: "30px",
          width: "200px",
          outline: "none",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="number">Employees found: {employeesCount}</div>
      <div className="employees-container">
        {employees.map((employee) => (
          <EmployeeCard key={employee._id} employee={employee} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
