import {
  FETCH_SESSIONS,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAIL,
  CREATE_SESSION,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAIL,
  UPDATE_SESSION,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_FAIL,
  DELETE_SESSION,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_FAIL,
  ENSURE_SESSIONS,
  ENSURE_SESSIONS_SUCCESS,
  ENSURE_SESSIONS_FAIL,
} from "./actionTypes";

export const fetchSessions = (filters) => ({ type: FETCH_SESSIONS, payload: filters });
export const fetchSessionsSuccess = (items) => ({ type: FETCH_SESSIONS_SUCCESS, payload: items });
export const fetchSessionsFail = (error) => ({ type: FETCH_SESSIONS_FAIL, payload: error });

export const createSession = (data) => ({ type: CREATE_SESSION, payload: data });
export const createSessionSuccess = (created) => ({ type: CREATE_SESSION_SUCCESS, payload: created });
export const createSessionFail = (error) => ({ type: CREATE_SESSION_FAIL, payload: error });

export const updateSession = (id, updates) => ({ type: UPDATE_SESSION, payload: { id, updates } });
export const updateSessionSuccess = (updated) => ({ type: UPDATE_SESSION_SUCCESS, payload: updated });
export const updateSessionFail = (error) => ({ type: UPDATE_SESSION_FAIL, payload: error });

export const deleteSession = (id) => ({ type: DELETE_SESSION, payload: id });
export const deleteSessionSuccess = (id) => ({ type: DELETE_SESSION_SUCCESS, payload: id });
export const deleteSessionFail = (error) => ({ type: DELETE_SESSION_FAIL, payload: error });

export const ensureSessions = (config, options) => ({ type: ENSURE_SESSIONS, payload: { config, options } });
export const ensureSessionsSuccess = (payload) => ({ type: ENSURE_SESSIONS_SUCCESS, payload });
export const ensureSessionsFail = (error) => ({ type: ENSURE_SESSIONS_FAIL, payload: error });
