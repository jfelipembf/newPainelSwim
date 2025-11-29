import {
  FETCH_ATTENDANCE,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAIL,
  MARK_ATTENDANCE,
  MARK_ATTENDANCE_SUCCESS,
  MARK_ATTENDANCE_FAIL,
} from "./actionTypes";

export const fetchAttendance = (idActivitySession) => ({
  type: FETCH_ATTENDANCE,
  payload: idActivitySession,
});
export const fetchAttendanceSuccess = (items) => ({ type: FETCH_ATTENDANCE_SUCCESS, payload: items });
export const fetchAttendanceFail = (error) => ({ type: FETCH_ATTENDANCE_FAIL, payload: error });

export const markAttendance = (data) => ({ type: MARK_ATTENDANCE, payload: data });
export const markAttendanceSuccess = (created) => ({ type: MARK_ATTENDANCE_SUCCESS, payload: created });
export const markAttendanceFail = (error) => ({ type: MARK_ATTENDANCE_FAIL, payload: error });
