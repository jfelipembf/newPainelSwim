import {
  FETCH_MEMBERSHIPS,
  FETCH_MEMBERSHIPS_SUCCESS,
  FETCH_MEMBERSHIPS_ERROR,
  CREATE_MEMBERSHIP,
  CREATE_MEMBERSHIP_SUCCESS,
  CREATE_MEMBERSHIP_ERROR,
  UPDATE_MEMBERSHIP,
  UPDATE_MEMBERSHIP_SUCCESS,
  UPDATE_MEMBERSHIP_ERROR,
  DELETE_MEMBERSHIP,
  DELETE_MEMBERSHIP_SUCCESS,
  DELETE_MEMBERSHIP_ERROR,
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
};

const memberships = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMBERSHIPS:
      return { ...state, loading: true, error: null };
    case FETCH_MEMBERSHIPS_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case FETCH_MEMBERSHIPS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CREATE_MEMBERSHIP:
      return { ...state, creating: true, createError: null, created: null };
    case CREATE_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        creating: false,
        items: [action.payload, ...state.items],
        created: action.payload,
      };
    case CREATE_MEMBERSHIP_ERROR:
      return { ...state, creating: false, createError: action.payload };

    case UPDATE_MEMBERSHIP:
      return { ...state, updating: true, updateError: null };
    case UPDATE_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        updating: false,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        updated: action.payload,
      };
    case UPDATE_MEMBERSHIP_ERROR:
      return { ...state, updating: false, updateError: action.payload };

    case DELETE_MEMBERSHIP:
      return { ...state, deleting: true, deleteError: null };
    case DELETE_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        deleting: false,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case DELETE_MEMBERSHIP_ERROR:
      return { ...state, deleting: false, deleteError: action.payload };

    default:
      return state;
  }
};

export default memberships;
