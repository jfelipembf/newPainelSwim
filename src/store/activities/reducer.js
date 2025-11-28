import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_ERROR,
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_ERROR,
  UPDATE_ACTIVITY,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_ERROR,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_ERROR,
} from "./actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
  createError: null,
  created: null,
  updating: false,
  updateError: null,
  updated: null,
  deleting: false,
  deleteError: null,
  deletedId: null,
};

const activities = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return { ...state, loading: true, error: null };
    case FETCH_ACTIVITIES_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case FETCH_ACTIVITIES_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CREATE_ACTIVITY:
      return { ...state, creating: true, createError: null, created: null };
    case CREATE_ACTIVITY_SUCCESS:
      return { ...state, creating: false, created: action.payload, items: [action.payload, ...state.items] };
    case CREATE_ACTIVITY_ERROR:
      return { ...state, creating: false, createError: action.payload };

    case UPDATE_ACTIVITY:
      return { ...state, updating: true, updateError: null, updated: null };
    case UPDATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: action.payload,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case UPDATE_ACTIVITY_ERROR:
      return { ...state, updating: false, updateError: action.payload };

    case DELETE_ACTIVITY:
      return { ...state, deleting: true, deleteError: null, deletedId: null };
    case DELETE_ACTIVITY_SUCCESS:
      return {
        ...state,
        deleting: false,
        deletedId: action.payload,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case DELETE_ACTIVITY_ERROR:
      return { ...state, deleting: false, deleteError: action.payload };

    default:
      return state;
  }
};

export default activities;
