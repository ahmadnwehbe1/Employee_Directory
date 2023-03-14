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
import AddEmployee from "../pages/AddEmployee";

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

export const addEmployeeReducer = (state = { employee: null }, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
      return {
        loading: true,
        message: null,
      };

    case ADD_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        message: "Employee created successfully!",
      };

    case ADD_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_EMPLOYEE_MESSAGE:
      return {
        loading: false,
        message: null,
      };

    default:
      return state;
  }
};
