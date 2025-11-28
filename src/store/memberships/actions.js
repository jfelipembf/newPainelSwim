import {
  FETCH_MEMBERSHIPS,
  FETCH_MEMBERSHIPS_SUCCESS,
  FETCH_MEMBERSHIPS_ERROR,
  CREATE_MEMBERSHIP,
  CREATE_MEMBERSHIP_SUCCESS,
  CREATE_MEMBERSHIP_ERROR,
  UPDATE_MEMBERSHIP,
  UPDATE_MEMBERSHIP_SUCCESS,
  UPDATE_MEMBERSHIP_ERROR,
  DELETE_MEMBERSHIP,
  DELETE_MEMBERSHIP_SUCCESS,
  DELETE_MEMBERSHIP_ERROR,
} from "./actionTypes";

export const fetchMemberships = () => ({ type: FETCH_MEMBERSHIPS });
export const fetchMembershipsSuccess = (memberships) => ({
  type: FETCH_MEMBERSHIPS_SUCCESS,
  payload: memberships,
});
export const fetchMembershipsError = (error) => ({
  type: FETCH_MEMBERSHIPS_ERROR,
  payload: error,
});

export const createMembership = (membership) => ({
  type: CREATE_MEMBERSHIP,
  payload: membership,
});
export const createMembershipSuccess = (membership) => ({
  type: CREATE_MEMBERSHIP_SUCCESS,
  payload: membership,
});
export const createMembershipError = (error) => ({
  type: CREATE_MEMBERSHIP_ERROR,
  payload: error,
});

export const updateMembership = (id, updates) => ({
  type: UPDATE_MEMBERSHIP,
  payload: { id, updates },
});
export const updateMembershipSuccess = (membership) => ({
  type: UPDATE_MEMBERSHIP_SUCCESS,
  payload: membership,
});
export const updateMembershipError = (error) => ({
  type: UPDATE_MEMBERSHIP_ERROR,
  payload: error,
});

export const deleteMembership = (id) => ({
  type: DELETE_MEMBERSHIP,
  payload: id,
});
export const deleteMembershipSuccess = (id) => ({
  type: DELETE_MEMBERSHIP_SUCCESS,
  payload: id,
});
export const deleteMembershipError = (error) => ({
  type: DELETE_MEMBERSHIP_ERROR,
  payload: error,
});
