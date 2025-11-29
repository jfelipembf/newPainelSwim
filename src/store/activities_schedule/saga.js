import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_CONFIGS,
  CREATE_CONFIG,
  UPDATE_CONFIG,
  DELETE_CONFIG,
} from "./actionTypes";
import {
  fetchConfigsSuccess,
  fetchConfigsFail,
  createConfigSuccess,
  createConfigFail,
  updateConfigSuccess,
  updateConfigFail,
  deleteConfigSuccess,
  deleteConfigFail,
} from "./actions";
import { getActivitiesScheduleHelper } from "../../helpers/activities_schedule_helper";
import { getActivitiesSessionsHelper } from "../../helpers/activities_sessions_helper";
import { ensureSessions } from "../activities_sessions/actions";

const DEFAULT_WEEKS_AHEAD = 4;

function* fetchConfigs({ payload }) {
  try {
    const helper = getActivitiesScheduleHelper();
    const items = yield call([helper, helper.listConfigs], payload || {});
    yield put(fetchConfigsSuccess(items));
  } catch (error) {
    yield put(fetchConfigsFail(error.message || "Erro ao listar turmas"));
  }
}

function* createConfig({ payload }) {
  try {
    const helper = getActivitiesScheduleHelper();
    const created = yield call([helper, helper.createConfig], payload);
    yield put(createConfigSuccess(created));
    yield put(ensureSessions(created, { fromDate: created?.startDate, weeksAhead: DEFAULT_WEEKS_AHEAD }));
  } catch (error) {
    yield put(createConfigFail(error.message || "Erro ao criar turma"));
  }
}

function* updateConfig({ payload }) {
  try {
    const { id, updates } = payload;
    const helper = getActivitiesScheduleHelper();
    const updated = yield call([helper, helper.updateConfig], id, updates);
    yield put(updateConfigSuccess(updated));
    const sessionsHelper = getActivitiesSessionsHelper();
    yield call([sessionsHelper, sessionsHelper.updateFutureSessionsForConfig], updated, {
      includePast: true,
      fromDate: updates?.startDate || updated?.startDate,
    });
    yield put(ensureSessions(updated, { fromDate: updates?.startDate || updated?.startDate, weeksAhead: DEFAULT_WEEKS_AHEAD }));
  } catch (error) {
    yield put(updateConfigFail(error.message || "Erro ao atualizar turma"));
  }
}

function* deleteConfig({ payload }) {
  try {
    const helper = getActivitiesScheduleHelper();
    yield call([helper, helper.deleteConfig], payload);
    yield put(deleteConfigSuccess(payload));
    const sessionsHelper = getActivitiesSessionsHelper();
    yield call([sessionsHelper, sessionsHelper.deleteSessionsForConfig], payload, { deletePast: true });
  } catch (error) {
    yield put(deleteConfigFail(error.message || "Erro ao excluir turma"));
  }
}

export default function* activitiesScheduleSaga() {
  yield all([
    takeLatest(FETCH_CONFIGS, fetchConfigs),
    takeLatest(CREATE_CONFIG, createConfig),
    takeLatest(UPDATE_CONFIG, updateConfig),
    takeLatest(DELETE_CONFIG, deleteConfig),
  ]);
}
