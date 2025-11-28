import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
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

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case FETCH_PRODUCTS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CREATE_PRODUCT:
      return { ...state, creating: true, createError: null, created: null };
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, creating: false, created: action.payload, items: [action.payload, ...state.items] };
    case CREATE_PRODUCT_ERROR:
      return { ...state, creating: false, createError: action.payload };

    case UPDATE_PRODUCT:
      return { ...state, updating: true, updateError: null, updated: null };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: action.payload,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case UPDATE_PRODUCT_ERROR:
      return { ...state, updating: false, updateError: action.payload };

    case DELETE_PRODUCT:
      return { ...state, deleting: true, deleteError: null, deletedId: null };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleting: false,
        deletedId: action.payload,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case DELETE_PRODUCT_ERROR:
      return { ...state, deleting: false, deleteError: action.payload };

    default:
      return state;
  }
};

export default products;
