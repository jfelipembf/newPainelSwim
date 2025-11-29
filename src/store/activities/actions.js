import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAIL,
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAIL,
  UPDATE_ACTIVITY,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_FAIL,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAIL,
} from "./actionTypes";

export const fetchActivities = () => ({ type: FETCH_ACTIVITIES });
export const fetchActivitiesSuccess = (items) => ({ type: FETCH_ACTIVITIES_SUCCESS, payload: items });
export const fetchActivitiesFail = (error) => ({ type: FETCH_ACTIVITIES_FAIL, payload: error });

export const createActivity = (data) => ({ type: CREATE_ACTIVITY, payload: data });
export const createActivitySuccess = (created) => ({ type: CREATE_ACTIVITY_SUCCESS, payload: created });
export const createActivityFail = (error) => ({ type: CREATE_ACTIVITY_FAIL, payload: error });

export const updateActivity = (id, updates) => ({ type: UPDATE_ACTIVITY, payload: { id, updates } });
export const updateActivitySuccess = (updated) => ({ type: UPDATE_ACTIVITY_SUCCESS, payload: updated });
export const updateActivityFail = (error) => ({ type: UPDATE_ACTIVITY_FAIL, payload: error });

export const deleteActivity = (id) => ({ type: DELETE_ACTIVITY, payload: id });
export const deleteActivitySuccess = (id) => ({ type: DELETE_ACTIVITY_SUCCESS, payload: id });
export const deleteActivityFail = (error) => ({ type: DELETE_ACTIVITY_FAIL, payload: error });
