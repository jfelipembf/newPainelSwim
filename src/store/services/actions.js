import {
  FETCH_SERVICES,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_ERROR,
  CREATE_SERVICE,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_ERROR,
  UPDATE_SERVICE,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_ERROR,
  DELETE_SERVICE,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_ERROR,
} from "./actionTypes";

export const fetchServices = () => ({ type: FETCH_SERVICES });
export const fetchServicesSuccess = (items) => ({ type: FETCH_SERVICES_SUCCESS, payload: items });
export const fetchServicesError = (error) => ({ type: FETCH_SERVICES_ERROR, payload: error });

export const createService = (payload) => ({ type: CREATE_SERVICE, payload });
export const createServiceSuccess = (item) => ({ type: CREATE_SERVICE_SUCCESS, payload: item });
export const createServiceError = (error) => ({ type: CREATE_SERVICE_ERROR, payload: error });

export const updateService = (id, updates) => ({ type: UPDATE_SERVICE, payload: { id, updates } });
export const updateServiceSuccess = (item) => ({ type: UPDATE_SERVICE_SUCCESS, payload: item });
export const updateServiceError = (error) => ({ type: UPDATE_SERVICE_ERROR, payload: error });

export const deleteService = (id) => ({ type: DELETE_SERVICE, payload: id });
export const deleteServiceSuccess = (id) => ({ type: DELETE_SERVICE_SUCCESS, payload: id });
export const deleteServiceError = (error) => ({ type: DELETE_SERVICE_ERROR, payload: error });
