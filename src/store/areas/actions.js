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

export const fetchAreas = () => ({ type: FETCH_AREAS });
export const fetchAreasSuccess = (areas) => ({ type: FETCH_AREAS_SUCCESS, payload: areas });
export const fetchAreasError = (error) => ({ type: FETCH_AREAS_ERROR, payload: error });

export const createArea = (area) => ({ type: CREATE_AREA, payload: area });
export const createAreaSuccess = (area) => ({ type: CREATE_AREA_SUCCESS, payload: area });
export const createAreaError = (error) => ({ type: CREATE_AREA_ERROR, payload: error });

export const updateArea = (id, updates) => ({ type: UPDATE_AREA, payload: { id, updates } });
export const updateAreaSuccess = (area) => ({ type: UPDATE_AREA_SUCCESS, payload: area });
export const updateAreaError = (error) => ({ type: UPDATE_AREA_ERROR, payload: error });

export const deleteArea = (id) => ({ type: DELETE_AREA, payload: id });
export const deleteAreaSuccess = (id) => ({ type: DELETE_AREA_SUCCESS, payload: id });
export const deleteAreaError = (error) => ({ type: DELETE_AREA_ERROR, payload: error });
