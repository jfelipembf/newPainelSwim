import {
  ENROLL_MEMBER,
  ENROLL_MEMBER_SUCCESS,
  ENROLL_MEMBER_FAIL,
  UNENROLL_MEMBER,
  UNENROLL_MEMBER_SUCCESS,
  UNENROLL_MEMBER_FAIL,
  FETCH_ENROLLMENTS,
  FETCH_ENROLLMENTS_SUCCESS,
  FETCH_ENROLLMENTS_FAIL,
} from "./actionTypes";

export const enrollMember = (data) => ({ type: ENROLL_MEMBER, payload: data });
export const enrollMemberSuccess = (enrolled) => ({ type: ENROLL_MEMBER_SUCCESS, payload: enrolled });
export const enrollMemberFail = (error) => ({ type: ENROLL_MEMBER_FAIL, payload: error });

export const unenrollMember = (id, cancelDate) => ({ type: UNENROLL_MEMBER, payload: { id, cancelDate } });
export const unenrollMemberSuccess = (unenrolled) => ({ type: UNENROLL_MEMBER_SUCCESS, payload: unenrolled });
export const unenrollMemberFail = (error) => ({ type: UNENROLL_MEMBER_FAIL, payload: error });

export const fetchEnrollments = (filters) => ({ type: FETCH_ENROLLMENTS, payload: filters });
export const fetchEnrollmentsSuccess = (items) => ({ type: FETCH_ENROLLMENTS_SUCCESS, payload: items });
export const fetchEnrollmentsFail = (error) => ({ type: FETCH_ENROLLMENTS_FAIL, payload: error });
