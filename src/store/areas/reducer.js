import {
  FETCH_AREAS,
  FETCH_AREAS_SUCCESS,
  FETCH_AREAS_ERROR,
  CREATE_AREA,
  CREATE_AREA_SUCCESS,
  CREATE_AREA_ERROR,
  UPDATE_AREA,
  UPDATE_AREA_SUCCESS,
  UPDATE_AREA_ERROR,
  DELETE_AREA,
  DELETE_AREA_SUCCESS,
  DELETE_AREA_ERROR,
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
  deleted: null,
};

const areas = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AREAS:
      return { ...state, loading: true, error: null };
    case FETCH_AREAS_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case FETCH_AREAS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CREATE_AREA:
      return { ...state, creating: true, createError: null, created: null };
    case CREATE_AREA_SUCCESS:
      return {
        ...state,
        creating: false,
        items: [action.payload, ...state.items],
        created: action.payload,
      };
    case CREATE_AREA_ERROR:
      return { ...state, creating: false, createError: action.payload };

    case UPDATE_AREA:
      return { ...state, updating: true, updateError: null, updated: null };
    case UPDATE_AREA_SUCCESS:
      return {
        ...state,
        updating: false,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
        updated: action.payload,
      };
    case UPDATE_AREA_ERROR:
      return { ...state, updating: false, updateError: action.payload };

    case DELETE_AREA:
      return { ...state, deleting: true, deleteError: null, deleted: null };
    case DELETE_AREA_SUCCESS:
      return {
        ...state,
        deleting: false,
        items: state.items.filter((item) => item.id !== action.payload),
        deleted: action.payload,
      };
    case DELETE_AREA_ERROR:
      return { ...state, deleting: false, deleteError: action.payload };

    default:
      return state;
  }
};

export default areas;
