import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_ATTENDANCE,
  MARK_ATTENDANCE,
} from "./actionTypes";
import {
  fetchAttendanceSuccess,
  fetchAttendanceFail,
  markAttendanceSuccess,
  markAttendanceFail,
} from "./actions";
import { getActivitiesAttendanceHelper } from "../../helpers/activities_attendance_helper";

function* fetchAttendance({ payload }) {
  try {
    const helper = getActivitiesAttendanceHelper();
    const items = yield call([helper, helper.listAttendance], payload);
    yield put(fetchAttendanceSuccess(items));
  } catch (error) {
    yield put(fetchAttendanceFail(error.message || "Erro ao buscar presença"));
  }
}

function* markAttendance({ payload }) {
  try {
    const helper = getActivitiesAttendanceHelper();
    const created = yield call([helper, helper.markAttendance], payload);
    yield put(markAttendanceSuccess(created));
  } catch (error) {
    yield put(markAttendanceFail(error.message || "Erro ao registrar presença"));
  }
}

export default function* activitiesAttendanceSaga() {
  yield all([
    takeLatest(FETCH_ATTENDANCE, fetchAttendance),
    takeLatest(MARK_ATTENDANCE, markAttendance),
  ]);
}
