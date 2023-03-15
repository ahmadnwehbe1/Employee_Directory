import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  employeesReducer,
  addEmployeeReducer,
  getEmployeeReducer,
  deleteEmployeeReducer,
} from "./reducers/employeesReducers";

const reducer = combineReducers({
  employees: employeesReducer,
  addEmployee: addEmployeeReducer,
  employee: getEmployeeReducer,
  deleteEmployee: deleteEmployeeReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
