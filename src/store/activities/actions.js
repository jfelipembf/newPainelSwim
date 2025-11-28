import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_ERROR,
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_ERROR,
  UPDATE_ACTIVITY,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_ERROR,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_ERROR,
} from "./actionTypes";

export const fetchActivities = () => ({ type: FETCH_ACTIVITIES });
export const fetchActivitiesSuccess = (activities) => ({ type: FETCH_ACTIVITIES_SUCCESS, payload: activities });
export const fetchActivitiesError = (error) => ({ type: FETCH_ACTIVITIES_ERROR, payload: error });

export const createActivity = (activity) => ({ type: CREATE_ACTIVITY, payload: activity });
export const createActivitySuccess = (activity) => ({ type: CREATE_ACTIVITY_SUCCESS, payload: activity });
export const createActivityError = (error) => ({ type: CREATE_ACTIVITY_ERROR, payload: error });

export const updateActivity = (id, updates) => ({ type: UPDATE_ACTIVITY, payload: { id, updates } });
export const updateActivitySuccess = (activity) => ({ type: UPDATE_ACTIVITY_SUCCESS, payload: activity });
export const updateActivityError = (error) => ({ type: UPDATE_ACTIVITY_ERROR, payload: error });

export const deleteActivity = (id) => ({ type: DELETE_ACTIVITY, payload: id });
export const deleteActivitySuccess = (id) => ({ type: DELETE_ACTIVITY_SUCCESS, payload: id });
export const deleteActivityError = (error) => ({ type: DELETE_ACTIVITY_ERROR, payload: error });
