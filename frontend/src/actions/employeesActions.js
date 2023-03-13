import {
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
} from "../constants/employeeConstants";
import axios from "axios";

export const getEmployees =
  (keyword = "", currentPage = 1, department = "", sort = "asc") =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_EMPLOYEES_REQUEST });
      let link = `http://localhost:8000/employees?q=${keyword}&page=${currentPage}&sort=${sort}`;
      if (department) {
        link += `&department=${department}`;
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
