import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearEmployeeMessages,
  getEmployee,
} from "../actions/employeesActions";
import EmployeeForm from "../components/EmployeeForm";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const { error, employee } = useSelector((state) => state.employee);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/");
      dispatch(clearEmployeeMessages());
    }
    dispatch(getEmployee(id));
  }, [dispatch, id, navigate, error]);

  return (
    <div>
      <EmployeeForm employee={employee} />
    </div>
  );
};

export default EditEmployee;
