import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAIL,
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAIL,
  UPDATE_ACTIVITY,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_FAIL,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAIL,
} from "./actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
  created: null,
  updated: null,
  deletedId: null,
};

const Activities = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return { ...state, loading: true, error: null };
    case FETCH_ACTIVITIES_SUCCESS:
      return { ...state, loading: false, items: action.payload || [] };
    case FETCH_ACTIVITIES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_ACTIVITY:
      return { ...state, creating: true, error: null, created: null };
    case CREATE_ACTIVITY_SUCCESS:
      return { ...state, creating: false, created: action.payload };
    case CREATE_ACTIVITY_FAIL:
      return { ...state, creating: false, error: action.payload };

    case UPDATE_ACTIVITY:
      return { ...state, updating: true, error: null, updated: null };
    case UPDATE_ACTIVITY_SUCCESS:
      return { ...state, updating: false, updated: action.payload };
    case UPDATE_ACTIVITY_FAIL:
      return { ...state, updating: false, error: action.payload };

    case DELETE_ACTIVITY:
      return { ...state, deleting: true, error: null, deletedId: null };
    case DELETE_ACTIVITY_SUCCESS:
      return { ...state, deleting: false, deletedId: action.payload };
    case DELETE_ACTIVITY_FAIL:
      return { ...state, deleting: false, error: action.payload };

    default:
      return state;
  }
};

export default Activities;
