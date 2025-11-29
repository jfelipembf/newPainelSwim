import {
  FETCH_SESSIONS,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAIL,
  CREATE_SESSION,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAIL,
  UPDATE_SESSION,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_FAIL,
  DELETE_SESSION,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_FAIL,
  ENSURE_SESSIONS,
  ENSURE_SESSIONS_SUCCESS,
  ENSURE_SESSIONS_FAIL,
} from "./actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
  created: null,
  updating: false,
  updated: null,
  deleting: false,
  deletedId: null,
  ensuring: false,
  ensured: null,
};

const ActivitiesSessions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSIONS:
      return { ...state, loading: true, error: null };
    case FETCH_SESSIONS_SUCCESS:
      return { ...state, loading: false, items: action.payload || [] };
    case FETCH_SESSIONS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_SESSION:
      return { ...state, creating: true, error: null, created: null };
    case CREATE_SESSION_SUCCESS:
      return { ...state, creating: false, created: action.payload };
    case CREATE_SESSION_FAIL:
      return { ...state, creating: false, error: action.payload };

    case UPDATE_SESSION:
      return { ...state, updating: true, error: null, updated: null };
    case UPDATE_SESSION_SUCCESS:
      return { ...state, updating: false, updated: action.payload };
    case UPDATE_SESSION_FAIL:
      return { ...state, updating: false, error: action.payload };

    case DELETE_SESSION:
      return { ...state, deleting: true, error: null, deletedId: null };
    case DELETE_SESSION_SUCCESS:
      return { ...state, deleting: false, deletedId: action.payload };
    case DELETE_SESSION_FAIL:
      return { ...state, deleting: false, error: action.payload };

    case ENSURE_SESSIONS:
      return { ...state, ensuring: true, ensured: null, error: null };
    case ENSURE_SESSIONS_SUCCESS:
      return { ...state, ensuring: false, ensured: action.payload };
    case ENSURE_SESSIONS_FAIL:
      return { ...state, ensuring: false, error: action.payload };

    default:
      return state;
  }
};

export default ActivitiesSessions;
