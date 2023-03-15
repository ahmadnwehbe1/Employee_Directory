import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments, getEmployees } from "../actions/employeesActions";
import EmployeeCard from "../components/EmployeeCard";
import Pagination from "react-js-pagination";
import Select from "react-select";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartments, setSelectedDepartments] = useState("");
  const [sort, setSort] = useState("asc");
  const [seeding, setSeeding] = useState(false);

  const { loading, employees, employeesCount, departments, totalCount } =
    useSelector((state) => state.employees);

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

  const seedEmployees = async () => {
    setSeeding(true);
    try {
      await axios.get(`http://localhost:8000/seed`);
      dispatch(getEmployees());
      setSeeding(false);
    } catch (error) {
      alert(error.response.data.message);
      setSeeding(false);
    }
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
      {loading ? (
        <h1>Loading...</h1>
      ) : totalCount > 0 && !loading ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <Fragment>
          <h1>No Products Found!</h1>
          <button className="import-btn" onClick={seedEmployees}>
            Import random 100 employee
          </button>
          {seeding && <h1>LOADING........</h1>}
        </Fragment>
      )}
    </div>
  );
}

export default Dashboard;
