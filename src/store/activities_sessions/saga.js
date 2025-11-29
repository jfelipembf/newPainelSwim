import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_SESSIONS,
  CREATE_SESSION,
  UPDATE_SESSION,
  DELETE_SESSION,
  ENSURE_SESSIONS,
} from "./actionTypes";
import {
  fetchSessionsSuccess,
  fetchSessionsFail,
  createSessionSuccess,
  createSessionFail,
  updateSessionSuccess,
  updateSessionFail,
  deleteSessionSuccess,
  deleteSessionFail,
  ensureSessionsSuccess,
  ensureSessionsFail,
} from "./actions";
import { getActivitiesSessionsHelper } from "../../helpers/activities_sessions_helper";

function* fetchSessions({ payload }) {
  try {
    const helper = getActivitiesSessionsHelper();
    const items = yield call([helper, helper.listSessions], payload || {});
    yield put(fetchSessionsSuccess(items));
  } catch (error) {
    yield put(fetchSessionsFail(error.message || "Erro ao listar sessões"));
  }
}

function* createSession({ payload }) {
  try {
    const helper = getActivitiesSessionsHelper();
    const created = yield call([helper, helper.createSession], payload);
    yield put(createSessionSuccess(created));
  } catch (error) {
    yield put(createSessionFail(error.message || "Erro ao criar sessão"));
  }
}

function* updateSession({ payload }) {
  try {
    const { id, updates } = payload;
    const helper = getActivitiesSessionsHelper();
    const updated = yield call([helper, helper.updateSession], id, updates);
    yield put(updateSessionSuccess(updated));
  } catch (error) {
    yield put(updateSessionFail(error.message || "Erro ao atualizar sessão"));
  }
}

function* deleteSession({ payload }) {
  try {
    const helper = getActivitiesSessionsHelper();
    yield call([helper, helper.deleteSession], payload);
    yield put(deleteSessionSuccess(payload));
  } catch (error) {
    yield put(deleteSessionFail(error.message || "Erro ao excluir sessão"));
  }
}

function* ensureSessions({ payload }) {
  try {
    const { config, options } = payload || {};
    const helper = getActivitiesSessionsHelper();
    const generated = yield call([helper, helper.ensureSessionsForConfig], config, options || {});
    yield put(ensureSessionsSuccess(generated));
  } catch (error) {
    yield put(ensureSessionsFail(error.message || "Erro ao gerar sessões"));
  }
}

export default function* activitiesSessionsSaga() {
  yield all([
    takeLatest(FETCH_SESSIONS, fetchSessions),
    takeLatest(CREATE_SESSION, createSession),
    takeLatest(UPDATE_SESSION, updateSession),
    takeLatest(DELETE_SESSION, deleteSession),
    takeLatest(ENSURE_SESSIONS, ensureSessions),
  ]);
}
