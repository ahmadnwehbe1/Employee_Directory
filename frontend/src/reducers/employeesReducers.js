import {
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
} from "../constants/employeeConstants";

export const employeesReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_REQUEST:
      return {
        loading: true,
        employees: [],
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        loading: false,
        employees: action.payload.employees,
        employeesCount: action.payload.employeesCount,
      };
    default:
      return state;
  }
};
