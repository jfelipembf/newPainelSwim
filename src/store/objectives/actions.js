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

export const fetchObjectives = (filters = {}) => ({
  type: FETCH_OBJECTIVES,
  payload: filters,
});

export const fetchObjectivesSuccess = (objectives) => ({
  type: FETCH_OBJECTIVES_SUCCESS,
  payload: objectives,
});

export const fetchObjectivesError = (error) => ({
  type: FETCH_OBJECTIVES_ERROR,
  payload: error,
});

export const createObjective = (objectiveData) => ({
  type: CREATE_OBJECTIVE,
  payload: objectiveData,
});

export const createObjectiveSuccess = (objective) => ({
  type: CREATE_OBJECTIVE_SUCCESS,
  payload: objective,
});

export const createObjectiveError = (error) => ({
  type: CREATE_OBJECTIVE_ERROR,
  payload: error,
});

export const updateObjective = (objectiveId, objectiveData) => ({
  type: UPDATE_OBJECTIVE,
  payload: { id: objectiveId, data: objectiveData },
});

export const updateObjectiveSuccess = (objective) => ({
  type: UPDATE_OBJECTIVE_SUCCESS,
  payload: objective,
});

export const updateObjectiveError = (error) => ({
  type: UPDATE_OBJECTIVE_ERROR,
  payload: error,
});

export const deleteObjective = (objectiveId) => ({
  type: DELETE_OBJECTIVE,
  payload: objectiveId,
});

export const deleteObjectiveSuccess = (objectiveId) => ({
  type: DELETE_OBJECTIVE_SUCCESS,
  payload: objectiveId,
});

export const deleteObjectiveError = (error) => ({
  type: DELETE_OBJECTIVE_ERROR,
  payload: error,
});

export const clearObjectiveErrors = () => ({
  type: CLEAR_OBJECTIVE_ERRORS,
});
