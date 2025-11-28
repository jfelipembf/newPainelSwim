import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        isUserLogout: false,
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state , isUserLogout: true}
      break
    case API_ERROR: {
      // Ensure we always store a string to avoid rendering Error objects in the UI
      const errorMessage =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "Erro ao realizar login.";
      state = {
        ...state,
        error: errorMessage,
        loading: false,
        isUserLogout: false,
      };
      break
    }
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
