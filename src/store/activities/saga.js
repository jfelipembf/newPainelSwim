import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  FETCH_ACTIVITIES,
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
} from "./actionTypes";
import {
  fetchActivitiesSuccess,
  fetchActivitiesFail,
  createActivitySuccess,
  createActivityFail,
  updateActivitySuccess,
  updateActivityFail,
  deleteActivitySuccess,
  deleteActivityFail,
} from "./actions";
import { getActivitiesHelper } from "../../helpers/activities_helper";

function* fetchActivities() {
  try {
    const helper = getActivitiesHelper();
    const items = yield call([helper, helper.listActivities]);
    yield put(fetchActivitiesSuccess(items));
  } catch (error) {
    yield put(fetchActivitiesFail(error.message || "Erro ao listar atividades"));
  }
}

function* createActivity({ payload }) {
  try {
    const helper = getActivitiesHelper();
    const created = yield call([helper, helper.createActivity], payload);
    yield put(createActivitySuccess(created));
  } catch (error) {
    yield put(createActivityFail(error.message || "Erro ao criar atividade"));
  }
}

function* updateActivity({ payload }) {
  try {
    const { id, updates } = payload;
    const helper = getActivitiesHelper();
    const updated = yield call([helper, helper.updateActivity], id, updates);
    yield put(updateActivitySuccess(updated));
  } catch (error) {
    yield put(updateActivityFail(error.message || "Erro ao atualizar atividade"));
  }
}

function* deleteActivity({ payload }) {
  try {
    const helper = getActivitiesHelper();
    yield call([helper, helper.deleteActivity], payload);
    yield put(deleteActivitySuccess(payload));
  } catch (error) {
    yield put(deleteActivityFail(error.message || "Erro ao excluir atividade"));
  }
}

export default function* activitiesSaga() {
  yield all([
    takeLatest(FETCH_ACTIVITIES, fetchActivities),
    takeLatest(CREATE_ACTIVITY, createActivity),
    takeLatest(UPDATE_ACTIVITY, updateActivity),
    takeLatest(DELETE_ACTIVITY, deleteActivity),
  ]);
}
