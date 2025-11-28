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
} from './actionTypes';

// =============================================
// LEVEL ACTIONS
// =============================================

export const fetchLevels = (filters = {}) => ({
  type: FETCH_LEVELS,
  payload: filters,
});

export const fetchLevelsSuccess = (levels) => ({
  type: FETCH_LEVELS_SUCCESS,
  payload: levels,
});

export const fetchLevelsError = (error) => ({
  type: FETCH_LEVELS_ERROR,
  payload: error,
});

export const createLevel = (levelData) => ({
  type: CREATE_LEVEL,
  payload: levelData,
});

export const createLevelSuccess = (level) => ({
  type: CREATE_LEVEL_SUCCESS,
  payload: level,
});

export const createLevelError = (error) => ({
  type: CREATE_LEVEL_ERROR,
  payload: error,
});

export const updateLevel = (levelId, levelData) => ({
  type: UPDATE_LEVEL,
  payload: { id: levelId, data: levelData },
});

export const updateLevelSuccess = (level) => ({
  type: UPDATE_LEVEL_SUCCESS,
  payload: level,
});

export const updateLevelError = (error) => ({
  type: UPDATE_LEVEL_ERROR,
  payload: error,
});

export const deleteLevel = (levelId) => ({
  type: DELETE_LEVEL,
  payload: levelId,
});

export const deleteLevelSuccess = (levelId) => ({
  type: DELETE_LEVEL_SUCCESS,
  payload: levelId,
});

export const deleteLevelError = (error) => ({
  type: DELETE_LEVEL_ERROR,
  payload: error,
});

// =============================================
// UTILITY ACTIONS
// =============================================

export const BATCH_UPDATE_LEVELS = 'BATCH_UPDATE_LEVELS';
export const BATCH_UPDATE_LEVELS_SUCCESS = 'BATCH_UPDATE_LEVELS_SUCCESS';
export const BATCH_UPDATE_LEVELS_ERROR = 'BATCH_UPDATE_LEVELS_ERROR';

export const batchUpdateLevels = (updates) => ({
  type: BATCH_UPDATE_LEVELS,
  payload: updates,
});

export const batchUpdateLevelsSuccess = (result) => ({
  type: BATCH_UPDATE_LEVELS_SUCCESS,
  payload: result,
});

export const batchUpdateLevelsError = (error) => ({
  type: BATCH_UPDATE_LEVELS_ERROR,
  payload: error,
});
