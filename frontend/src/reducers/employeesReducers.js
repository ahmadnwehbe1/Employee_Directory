import {
  GET_DEPARTMENTS_REQUEST,
  GET_DEPARTMENTS_SUCCESS,
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
} from "../constants/employeeConstants";

export const employeesReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
        employees: [],
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload.employees,
        employeesCount: action.payload.employeesCount,
      };

    case GET_DEPARTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: action.payload,
      };

    default:
      return state;
  }
};
