import {
  FETCH_OBJECTIVES,
  FETCH_OBJECTIVES_SUCCESS,
  FETCH_OBJECTIVES_ERROR,
  CREATE_OBJECTIVE,
  CREATE_OBJECTIVE_SUCCESS,
  CREATE_OBJECTIVE_ERROR,
  UPDATE_OBJECTIVE,
  UPDATE_OBJECTIVE_SUCCESS,
  UPDATE_OBJECTIVE_ERROR,
  DELETE_OBJECTIVE,
  DELETE_OBJECTIVE_SUCCESS,
  DELETE_OBJECTIVE_ERROR,
  CLEAR_OBJECTIVE_ERRORS,
} from './actionTypes';

const initialState = {
  objectives: [],
  loadingObjectives: false,
  creatingObjective: false,
  updatingObjective: false,
  deletingObjective: false,
  createdObjective: null,
  updatedObjective: null,
  deletedObjectiveId: null,
  error: null,
  createObjectiveError: null,
  updateObjectiveError: null,
  deleteObjectiveError: null,
};

const objectivesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OBJECTIVES:
      return {
        ...state,
        loadingObjectives: true,
        error: null,
      };

    case FETCH_OBJECTIVES_SUCCESS:
      return {
        ...state,
        loadingObjectives: false,
        objectives: action.payload,
      };

    case FETCH_OBJECTIVES_ERROR:
      return {
        ...state,
        loadingObjectives: false,
        error: action.payload,
      };

    case CREATE_OBJECTIVE:
      return {
        ...state,
        creatingObjective: true,
        createObjectiveError: null,
        createdObjective: null,
      };

    case CREATE_OBJECTIVE_SUCCESS:
      return {
        ...state,
        creatingObjective: false,
        createdObjective: action.payload,
        objectives: [action.payload, ...state.objectives],
      };

    case CREATE_OBJECTIVE_ERROR:
      return {
        ...state,
        creatingObjective: false,
        createObjectiveError: action.payload,
      };

    case UPDATE_OBJECTIVE:
      return {
        ...state,
        updatingObjective: true,
        updateObjectiveError: null,
        updatedObjective: null,
      };

    case UPDATE_OBJECTIVE_SUCCESS:
      return {
        ...state,
        updatingObjective: false,
        updatedObjective: action.payload,
        objectives: state.objectives.map(objective =>
          objective.id === action.payload.id ? action.payload : objective
        ),
      };

    case UPDATE_OBJECTIVE_ERROR:
      return {
        ...state,
        updatingObjective: false,
        updateObjectiveError: action.payload,
      };

    case DELETE_OBJECTIVE:
      return {
        ...state,
        deletingObjective: true,
        deleteObjectiveError: null,
        deletedObjectiveId: null,
      };

    case DELETE_OBJECTIVE_SUCCESS:
      return {
        ...state,
        deletingObjective: false,
        deletedObjectiveId: action.payload,
        objectives: state.objectives.filter(objective => objective.id !== action.payload),
      };

    case DELETE_OBJECTIVE_ERROR:
      return {
        ...state,
        deletingObjective: false,
        deleteObjectiveError: action.payload,
      };

    case CLEAR_OBJECTIVE_ERRORS:
      return {
        ...state,
        error: null,
        createObjectiveError: null,
        updateObjectiveError: null,
        deleteObjectiveError: null,
      };

    default:
      return state;
  }
};

export default objectivesReducer;
