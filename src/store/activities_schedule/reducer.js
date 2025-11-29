import {
  FETCH_CONFIGS,
  FETCH_CONFIGS_SUCCESS,
  FETCH_CONFIGS_FAIL,
  CREATE_CONFIG,
  CREATE_CONFIG_SUCCESS,
  CREATE_CONFIG_FAIL,
  UPDATE_CONFIG,
  UPDATE_CONFIG_SUCCESS,
  UPDATE_CONFIG_FAIL,
  DELETE_CONFIG,
  DELETE_CONFIG_SUCCESS,
  DELETE_CONFIG_FAIL,
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

const ActivitiesSchedule = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONFIGS:
      return { ...state, loading: true, error: null };
    case FETCH_CONFIGS_SUCCESS:
      return { ...state, loading: false, items: action.payload || [] };
    case FETCH_CONFIGS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_CONFIG:
      return { ...state, creating: true, error: null, created: null };
    case CREATE_CONFIG_SUCCESS:
      return { ...state, creating: false, created: action.payload };
    case CREATE_CONFIG_FAIL:
      return { ...state, creating: false, error: action.payload };

    case UPDATE_CONFIG:
      return { ...state, updating: true, error: null, updated: null };
    case UPDATE_CONFIG_SUCCESS:
      return { ...state, updating: false, updated: action.payload };
    case UPDATE_CONFIG_FAIL:
      return { ...state, updating: false, error: action.payload };

    case DELETE_CONFIG:
      return { ...state, deleting: true, error: null, deletedId: null };
    case DELETE_CONFIG_SUCCESS:
      return { ...state, deleting: false, deletedId: action.payload };
    case DELETE_CONFIG_FAIL:
      return { ...state, deleting: false, error: action.payload };

    default:
      return state;
  }
};

export default ActivitiesSchedule;
