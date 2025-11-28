import {
  FETCH_MEMBERS,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_ERROR,
  CREATE_MEMBER,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_ERROR,
} from "./actionTypes";

export const fetchMembers = () => ({ type: FETCH_MEMBERS });
export const fetchMembersSuccess = (members) => ({
  type: FETCH_MEMBERS_SUCCESS,
  payload: members,
});
export const fetchMembersError = (error) => ({
  type: FETCH_MEMBERS_ERROR,
  payload: error,
});

export const createMember = (member) => ({
  type: CREATE_MEMBER,
  payload: member,
});
export const createMemberSuccess = (member) => ({
  type: CREATE_MEMBER_SUCCESS,
  payload: member,
});
export const createMemberError = (error) => ({
  type: CREATE_MEMBER_ERROR,
  payload: error,
});
