import {
  ENROLL_MEMBER,
  ENROLL_MEMBER_SUCCESS,
  ENROLL_MEMBER_FAIL,
  UNENROLL_MEMBER,
  UNENROLL_MEMBER_SUCCESS,
  UNENROLL_MEMBER_FAIL,
  FETCH_ENROLLMENTS,
  FETCH_ENROLLMENTS_SUCCESS,
  FETCH_ENROLLMENTS_FAIL,
} from "./actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
  enrolling: false,
  unenrolling: false,
  enrolled: null,
  unenrolled: null,
};

const ActivitiesEnrollments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ENROLLMENTS:
      return { ...state, loading: true, error: null };
    case FETCH_ENROLLMENTS_SUCCESS:
      return { ...state, loading: false, items: action.payload || [] };
    case FETCH_ENROLLMENTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ENROLL_MEMBER:
      return { ...state, enrolling: true, error: null, enrolled: null };
    case ENROLL_MEMBER_SUCCESS:
      return { ...state, enrolling: false, enrolled: action.payload };
    case ENROLL_MEMBER_FAIL:
      return { ...state, enrolling: false, error: action.payload };

    case UNENROLL_MEMBER:
      return { ...state, unenrolling: true, error: null, unenrolled: null };
    case UNENROLL_MEMBER_SUCCESS:
      return { ...state, unenrolling: false, unenrolled: action.payload };
    case UNENROLL_MEMBER_FAIL:
      return { ...state, unenrolling: false, error: action.payload };

    default:
      return state;
  }
};

export default ActivitiesEnrollments;
