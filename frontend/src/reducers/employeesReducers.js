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
        totalCount: action.payload.totalCount,
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
    case EDIT_EMPLOYEE_REQUEST:
      return {
        loading: true,
        message: null,
      };

    case ADD_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        message: "Employee created successfully!",
      };

    case EDIT_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        message: "Employee updated successfully!",
      };

    case ADD_EMPLOYEE_FAIL:
    case EDIT_EMPLOYEE_FAIL:
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

export const getEmployeeReducer = (state = { employee: null }, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_REQUEST:
      return {
        loading: true,
        employee: null,
      };

    case GET_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        employee: action.payload,
      };

    case GET_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_EMPLOYEE_MESSAGE:
      return {
        ...state,
        loading: false,
        error: null,
        employee: null,
      };

    default:
      return state;
  }
};

export const deleteEmployeeReducer = (state = { employee: null }, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
      return {
        loading: true,
        message: null,
        error: null,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
        error: null,
      };
    case DELETE_EMPLOYEE_FAIL:
      return {
        loading: false,
        message: null,
        error: action.payload,
      };

    case CLEAR_DELETE_ERRORS:
      return {
        loading: false,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};
