import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_ACTIVITIES,
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
} from "./actionTypes";
import {
  fetchActivitiesSuccess,
  fetchActivitiesError,
  createActivitySuccess,
  createActivityError,
  updateActivitySuccess,
  updateActivityError,
  deleteActivitySuccess,
  deleteActivityError,
} from "./actions";
import { getActivitiesHelper } from "../../helpers/activities_helper";

function* fetchActivitiesSaga() {
  try {
    const helper = getActivitiesHelper();
    const items = yield call([helper, helper.listActivities]);
    yield put(fetchActivitiesSuccess(items));
  } catch (error) {
    yield put(fetchActivitiesError(error.message || "Erro ao buscar atividades"));
  }
}

function* createActivitySaga({ payload }) {
  try {
    const helper = getActivitiesHelper();
    const created = yield call([helper, helper.createActivity], payload);
    yield put(createActivitySuccess(created));
  } catch (error) {
    yield put(createActivityError(error.message || "Erro ao criar atividade"));
  }
}

function* updateActivitySaga({ payload }) {
  try {
    const helper = getActivitiesHelper();
    const updated = yield call([helper, helper.updateActivity], payload.id, payload.updates);
    yield put(updateActivitySuccess(updated));
  } catch (error) {
    yield put(updateActivityError(error.message || "Erro ao atualizar atividade"));
  }
}

function* deleteActivitySaga({ payload }) {
  try {
    const helper = getActivitiesHelper();
    yield call([helper, helper.deleteActivity], payload);
    yield put(deleteActivitySuccess(payload));
  } catch (error) {
    yield put(deleteActivityError(error.message || "Erro ao excluir atividade"));
  }
}

export default function* activitiesSaga() {
  yield all([
    takeEvery(FETCH_ACTIVITIES, fetchActivitiesSaga),
    takeEvery(CREATE_ACTIVITY, createActivitySaga),
    takeEvery(UPDATE_ACTIVITY, updateActivitySaga),
    takeEvery(DELETE_ACTIVITY, deleteActivitySaga),
  ]);
}
