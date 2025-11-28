import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_ERROR,
} from "./actionTypes";

export const fetchEmployees = () => ({
  type: FETCH_EMPLOYEES,
});

export const fetchEmployeesSuccess = (employees) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const fetchEmployeesError = (error) => ({
  type: FETCH_EMPLOYEES_ERROR,
  payload: error,
});
