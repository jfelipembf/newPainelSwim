import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_SERVICES,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from "./actionTypes";
import {
  fetchServicesSuccess,
  fetchServicesError,
  createServiceSuccess,
  createServiceError,
  updateServiceSuccess,
  updateServiceError,
  deleteServiceSuccess,
  deleteServiceError,
} from "./actions";
import { getServicesHelper } from "../../helpers/services_helper";

function* fetchServicesSaga() {
  try {
    const helper = getServicesHelper();
    const items = yield call([helper, helper.listServices]);
    yield put(fetchServicesSuccess(items));
  } catch (error) {
    yield put(fetchServicesError(error.message || "Erro ao buscar serviços"));
  }
}

function* createServiceSaga({ payload }) {
  try {
    const helper = getServicesHelper();
    const created = yield call([helper, helper.createService], payload);
    yield put(createServiceSuccess(created));
  } catch (error) {
    yield put(createServiceError(error.message || "Erro ao criar serviço"));
  }
}

function* updateServiceSaga({ payload }) {
  try {
    const helper = getServicesHelper();
    const updated = yield call([helper, helper.updateService], payload.id, payload.updates);
    yield put(updateServiceSuccess(updated));
  } catch (error) {
    yield put(updateServiceError(error.message || "Erro ao atualizar serviço"));
  }
}

function* deleteServiceSaga({ payload }) {
  try {
    const helper = getServicesHelper();
    yield call([helper, helper.deleteService], payload);
    yield put(deleteServiceSuccess(payload));
  } catch (error) {
    yield put(deleteServiceError(error.message || "Erro ao excluir serviço"));
  }
}

export default function* servicesSaga() {
  yield all([
    takeEvery(FETCH_SERVICES, fetchServicesSaga),
    takeEvery(CREATE_SERVICE, createServiceSaga),
    takeEvery(UPDATE_SERVICE, updateServiceSaga),
    takeEvery(DELETE_SERVICE, deleteServiceSaga),
  ]);
}
