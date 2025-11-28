import {
  FETCH_MEMBERS,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_ERROR,
  CREATE_MEMBER,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_ERROR,
} from "./actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
  createError: null,
  created: null,
};

const members = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMBERS:
      return { ...state, loading: true, error: null };
    case FETCH_MEMBERS_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case FETCH_MEMBERS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CREATE_MEMBER:
      return { ...state, creating: true, createError: null, created: null };
    case CREATE_MEMBER_SUCCESS:
      return {
        ...state,
        creating: false,
        items: [action.payload, ...state.items],
        created: action.payload,
      };
    case CREATE_MEMBER_ERROR:
      return { ...state, creating: false, createError: action.payload };
    default:
      return state;
  }
};

export default members;
