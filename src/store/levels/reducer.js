import {
  FETCH_LEVELS,
  FETCH_LEVELS_SUCCESS,
  FETCH_LEVELS_ERROR,
  CREATE_LEVEL,
  CREATE_LEVEL_SUCCESS,
  CREATE_LEVEL_ERROR,
  UPDATE_LEVEL,
  UPDATE_LEVEL_SUCCESS,
  UPDATE_LEVEL_ERROR,
  DELETE_LEVEL,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_ERROR,
  CLEAR_LEVEL_ERRORS,
} from './actionTypes';

const initialState = {
  levels: [],
  loadingLevels: false,
  creatingLevel: false,
  updatingLevel: false,
  deletingLevel: false,
  createdLevel: null,
  updatedLevel: null,
  deletedLevelId: null,

  // Errors
  error: null,
  createLevelError: null,
  updateLevelError: null,
  deleteLevelError: null,
};

const levelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEVELS:
      return {
        ...state,
        loadingLevels: true,
        error: null,
      };

    case FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        loadingLevels: false,
        levels: action.payload,
      };

    case FETCH_LEVELS_ERROR:
      return {
        ...state,
        loadingLevels: false,
        error: action.payload,
      };

    case CREATE_LEVEL:
      return {
        ...state,
        creatingLevel: true,
        createLevelError: null,
        createdLevel: null,
      };

    case CREATE_LEVEL_SUCCESS:
      return {
        ...state,
        creatingLevel: false,
        createdLevel: action.payload,
        levels: [...state.levels, action.payload],
      };

    case CREATE_LEVEL_ERROR:
      return {
        ...state,
        creatingLevel: false,
        createLevelError: action.payload,
      };

    case UPDATE_LEVEL:
      return {
        ...state,
        updatingLevel: true,
        updateLevelError: null,
        updatedLevel: null,
      };

    case UPDATE_LEVEL_SUCCESS:
      return {
        ...state,
        updatingLevel: false,
        updatedLevel: action.payload,
        levels: state.levels.map(level =>
          level.id === action.payload.id ? action.payload : level
        ),
      };

    case UPDATE_LEVEL_ERROR:
      return {
        ...state,
        updatingLevel: false,
        updateLevelError: action.payload,
      };

    case DELETE_LEVEL:
      return {
        ...state,
        deletingLevel: true,
        deleteLevelError: null,
        deletedLevelId: null,
      };

    case DELETE_LEVEL_SUCCESS:
      return {
        ...state,
        deletingLevel: false,
        deletedLevelId: action.payload,
        levels: state.levels.filter(level => level.id !== action.payload),
      };

    case DELETE_LEVEL_ERROR:
      return {
        ...state,
        deletingLevel: false,
        deleteLevelError: action.payload,
      };

    default:
      return state;
  }
};

export default levelsReducer;
