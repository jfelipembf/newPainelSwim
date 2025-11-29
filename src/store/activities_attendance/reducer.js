import {
  FETCH_ATTENDANCE,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAIL,
  MARK_ATTENDANCE,
  MARK_ATTENDANCE_SUCCESS,
  MARK_ATTENDANCE_FAIL,
} from "./actionTypes";

const initialState = {
  items: [],
  loading: false,
  saving: false,
  error: null,
  saved: null,
};

const ActivitiesAttendance = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ATTENDANCE:
      return { ...state, loading: true, error: null };
    case FETCH_ATTENDANCE_SUCCESS:
      return { ...state, loading: false, items: action.payload || [] };
    case FETCH_ATTENDANCE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case MARK_ATTENDANCE:
      return { ...state, saving: true, error: null, saved: null };
    case MARK_ATTENDANCE_SUCCESS:
      return { ...state, saving: false, saved: action.payload };
    case MARK_ATTENDANCE_FAIL:
      return { ...state, saving: false, error: action.payload };

    default:
      return state;
  }
};

export default ActivitiesAttendance;
