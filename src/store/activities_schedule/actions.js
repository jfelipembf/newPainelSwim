import {
  FETCH_CONFIGS,
  FETCH_CONFIGS_SUCCESS,
  FETCH_CONFIGS_FAIL,
  CREATE_CONFIG,
  CREATE_CONFIG_SUCCESS,
  CREATE_CONFIG_FAIL,
  UPDATE_CONFIG,
  UPDATE_CONFIG_SUCCESS,
  UPDATE_CONFIG_FAIL,
  DELETE_CONFIG,
  DELETE_CONFIG_SUCCESS,
  DELETE_CONFIG_FAIL,
} from "./actionTypes";

export const fetchConfigs = (filters) => ({ type: FETCH_CONFIGS, payload: filters });
export const fetchConfigsSuccess = (items) => ({ type: FETCH_CONFIGS_SUCCESS, payload: items });
export const fetchConfigsFail = (error) => ({ type: FETCH_CONFIGS_FAIL, payload: error });

export const createConfig = (data) => ({ type: CREATE_CONFIG, payload: data });
export const createConfigSuccess = (created) => ({ type: CREATE_CONFIG_SUCCESS, payload: created });
export const createConfigFail = (error) => ({ type: CREATE_CONFIG_FAIL, payload: error });

export const updateConfig = (id, updates) => ({ type: UPDATE_CONFIG, payload: { id, updates } });
export const updateConfigSuccess = (updated) => ({ type: UPDATE_CONFIG_SUCCESS, payload: updated });
export const updateConfigFail = (error) => ({ type: UPDATE_CONFIG_FAIL, payload: error });

export const deleteConfig = (id) => ({ type: DELETE_CONFIG, payload: id });
export const deleteConfigSuccess = (id) => ({ type: DELETE_CONFIG_SUCCESS, payload: id });
export const deleteConfigFail = (error) => ({ type: DELETE_CONFIG_FAIL, payload: error });
