import {
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  CLEAR_DELETE_ERRORS,
  CLEAR_EMPLOYEE_MESSAGE,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAIL,
  EDIT_EMPLOYEE_REQUEST,
  EDIT_EMPLOYEE_SUCCESS,
  GET_DEPARTMENTS_REQUEST,
  GET_DEPARTMENTS_SUCCESS,
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEE_FAIL,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
} from "../constants/employeeConstants";
import axios from "axios";

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

export const getEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_EMPLOYEE_REQUEST });
    let link = `http://localhost:8000/employee/${id}`;
    const { data } = await axios.get(link);
    dispatch({ type: GET_EMPLOYEE_SUCCESS, payload: data.employee });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const editEmployee = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_EMPLOYEE_REQUEST });
    let link = `http://localhost:8000/employee/${id}`;

    const { data } = await axios.put(link, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // set the content type to multipart/form-data
      },
    });

    dispatch({ type: EDIT_EMPLOYEE_SUCCESS, payload: data.employee });
  } catch (error) {
    dispatch({
      type: EDIT_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EMPLOYEE_REQUEST });
    let link = `http://localhost:8000/employee/${id}`;
    const { data } = await axios.delete(link);
    dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearDeleteErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_DELETE_ERRORS });
};
