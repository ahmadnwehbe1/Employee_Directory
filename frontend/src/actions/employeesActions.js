import {
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  CLEAR_EMPLOYEE_MESSAGE,
  GET_DEPARTMENTS_REQUEST,
  GET_DEPARTMENTS_SUCCESS,
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
} from "../constants/employeeConstants";
import axios from "axios";
import AddEmployee from "../pages/AddEmployee";

export const getEmployees =
  (keyword = "", currentPage = 1, departments = "", sort = "asc") =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_EMPLOYEES_REQUEST });
      let link = `http://localhost:8000/employees?q=${keyword}&page=${currentPage}&sort=${sort}`;
      if (departments) {
        link += `&departments=${departments}`;
      }
      const { data } = await axios.get(link);
      dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: data });
    } catch (error) {
      //   dispatch({
      //     type: ALL_PRODUCTS_FAIL,
      //     payload: error.response.data.message,
      //   });
      console.error(error);
    }
  };

export const getDepartments = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DEPARTMENTS_REQUEST });
    let link = `http://localhost:8000/departments`;
    const { data } = await axios.get(link);
    let departments = data.departments;
    let newData = [];
    departments.forEach((department) => {
      newData.push({ value: department, label: department });
    });
    dispatch({ type: GET_DEPARTMENTS_SUCCESS, payload: newData });
  } catch (error) {
    //   dispatch({
    //     type: ALL_PRODUCTS_FAIL,
    //     payload: error.response.data.message,
    //   });
    console.error(error);
  }
};

export const addEmployee = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_EMPLOYEE_REQUEST });
    let link = `http://localhost:8000/employee`;

    const { data } = await axios.post(link, formData);

    dispatch({ type: ADD_EMPLOYEE_SUCCESS, payload: data.employee });
  } catch (error) {
    dispatch({
      type: ADD_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearEmployeeMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_EMPLOYEE_MESSAGE });
};
