import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments, getEmployees } from "../actions/employeesActions";
import EmployeeCard from "../components/EmployeeCard";
import Pagination from "react-js-pagination";
import Select from "react-select";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartments, setSelectedDepartments] = useState("");
  const [sort, setSort] = useState("asc");

  const { employees, employeesCount, departments } = useSelector(
    (state) => state.employees
  );

  useEffect(() => {
    dispatch(getEmployees(search, currentPage, selectedDepartments, sort));
    dispatch(getDepartments());
  }, [dispatch, search, currentPage, selectedDepartments, sort]);
  const setCurrentpageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const changeSort = () => {
    if (sort === "asc") {
      setSort("desc");
    } else {
      setSort("asc");
    }
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
    setCurrentPage(1);
  };

  return (
    <div className="dashboard">
      <div className="search-department">
        <input
          placeholder="Search..."
          value={search}
          style={{
            height: "38px",
            width: "48%",
            outline: "none",
            border: "none",
            borderRadius: "5px",
            textIndent: "10px",
          }}
          onChange={(e) => {
            setCurrentPage(1);
            setSearch(e.target.value);
          }}
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
        <div className="sortBy" onClick={changeSort}>
          Sort{" "}
          <FontAwesomeIcon
            icon={sort === "asc" ? faArrowUp : faArrowDown}
            color="blue"
          />
        </div>
      </div>

      <div className="number">Employees found: {employeesCount}</div>
      <div className="employees-container">
        {employees.map((employee) => (
          <EmployeeCard key={employee._id} employee={employee} />
        ))}
      </div>
      {9 <= employeesCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={9}
            totalItemsCount={employeesCount}
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
