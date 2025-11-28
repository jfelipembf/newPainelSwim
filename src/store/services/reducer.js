import {
  FETCH_SERVICES,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_ERROR,
  CREATE_SERVICE,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_ERROR,
  UPDATE_SERVICE,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_ERROR,
  DELETE_SERVICE,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_ERROR,
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

const services = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES:
      return { ...state, loading: true, error: null };
    case FETCH_SERVICES_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case FETCH_SERVICES_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CREATE_SERVICE:
      return { ...state, creating: true, createError: null, created: null };
    case CREATE_SERVICE_SUCCESS:
      return { ...state, creating: false, created: action.payload, items: [action.payload, ...state.items] };
    case CREATE_SERVICE_ERROR:
      return { ...state, creating: false, createError: action.payload };

    case UPDATE_SERVICE:
      return { ...state, updating: true, updateError: null, updated: null };
    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: action.payload,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case UPDATE_SERVICE_ERROR:
      return { ...state, updating: false, updateError: action.payload };

    case DELETE_SERVICE:
      return { ...state, deleting: true, deleteError: null, deletedId: null };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deletedId: action.payload,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case DELETE_SERVICE_ERROR:
      return { ...state, deleting: false, deleteError: action.payload };

    default:
      return state;
  }
};

export default services;
