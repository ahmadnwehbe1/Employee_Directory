import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments, getEmployees } from "../actions/employeesActions";
import EmployeeCard from "../components/EmployeeCard";
import Pagination from "react-js-pagination";
import Select from "react-select";

function Dashboard() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartments, setSelectedDepartments] = useState("");

  const { loading, employees, employeesCount, departments } = useSelector(
    (state) => state.employees
  );

  useEffect(() => {
    dispatch(
      getEmployees(
        search,
        currentPage,
        selectedDepartments,
        selectedDepartments
      )
    );
    dispatch(getDepartments());
  }, [dispatch, search, currentPage, selectedDepartments]);
  const setCurrentpageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const selectDepartment = (e) => {
    setSelectedDepartments("");
    e.forEach((element) => {
      setSelectedDepartments(
        selectedDepartments
          ? selectedDepartments + "," + element.value
          : element.value
      );
    });
  };

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
      <Select
        isMulti
        name="colors"
        options={departments}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={selectDepartment}
        placeholder="Select Department"
      />

      <div className="number">Employees found: {employeesCount}</div>
      <div className="employees-container">
        {employees.map((employee) => (
          <EmployeeCard key={employee._id} employee={employee} />
        ))}
      </div>
      {10 <= employeesCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={1}
            totalItemsCount={10}
            onChange={setCurrentpageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
