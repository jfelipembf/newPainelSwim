import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_ERROR,
} from "./actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const employees = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return { ...state, loading: true, error: null };
    case FETCH_EMPLOYEES_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case FETCH_EMPLOYEES_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default employees;
