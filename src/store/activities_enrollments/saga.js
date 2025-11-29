import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  ENROLL_MEMBER,
  UNENROLL_MEMBER,
  FETCH_ENROLLMENTS,
} from "./actionTypes";
import {
  enrollMemberSuccess,
  enrollMemberFail,
  unenrollMemberSuccess,
  unenrollMemberFail,
  fetchEnrollmentsSuccess,
  fetchEnrollmentsFail,
} from "./actions";
import { getActivitiesEnrollmentsHelper } from "../../helpers/activities_enrollments_helper";

function* enrollMember({ payload }) {
  try {
    const helper = getActivitiesEnrollmentsHelper();
    const enrolled = yield call([helper, helper.enroll], payload);
    yield put(enrollMemberSuccess(enrolled));
  } catch (error) {
    yield put(enrollMemberFail(error.message || "Erro ao matricular"));
  }
}

function* unenrollMember({ payload }) {
  try {
    const { id, cancelDate } = payload;
    const helper = getActivitiesEnrollmentsHelper();
    const unenrolled = yield call([helper, helper.unenroll], id, cancelDate);
    yield put(unenrollMemberSuccess(unenrolled));
  } catch (error) {
    yield put(unenrollMemberFail(error.message || "Erro ao desmatricular"));
  }
}

function* fetchEnrollments({ payload }) {
  try {
    const helper = getActivitiesEnrollmentsHelper();
    const items = yield call([helper, helper.listEnrollments], payload || {});
    yield put(fetchEnrollmentsSuccess(items));
  } catch (error) {
    yield put(fetchEnrollmentsFail(error.message || "Erro ao listar matrículas"));
  }
}

export default function* activitiesEnrollmentsSaga() {
  yield all([
    takeLatest(ENROLL_MEMBER, enrollMember),
    takeLatest(UNENROLL_MEMBER, unenrollMember),
    takeLatest(FETCH_ENROLLMENTS, fetchEnrollments),
  ]);
}
