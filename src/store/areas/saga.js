import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  FETCH_AREAS,
  CREATE_AREA,
  UPDATE_AREA,
  DELETE_AREA,
} from "./actionTypes";
import {
  fetchAreasSuccess,
  fetchAreasError,
  createAreaSuccess,
  createAreaError,
  updateAreaSuccess,
  updateAreaError,
  deleteAreaSuccess,
  deleteAreaError,
} from "./actions";
import { getAreasHelper } from "../../helpers/areas_helper";

function* fetchAreasSaga() {
  try {
    const helper = getAreasHelper();
    const areas = yield call([helper, helper.listAreas]);
    yield put(fetchAreasSuccess(areas));
  } catch (error) {
    yield put(fetchAreasError(error.message || "Erro ao buscar áreas"));
  }
}

function* createAreaSaga({ payload }) {
  try {
    const helper = getAreasHelper();
    const area = yield call([helper, helper.createArea], payload);
    yield put(createAreaSuccess(area));
  } catch (error) {
    yield put(createAreaError(error.message || "Erro ao criar área"));
  }
}

function* updateAreaSaga({ payload }) {
  try {
    const helper = getAreasHelper();
    const updated = yield call([helper, helper.updateArea], payload.id, payload.updates);
    yield put(updateAreaSuccess(updated));
  } catch (error) {
    yield put(updateAreaError(error.message || "Erro ao atualizar área"));
  }
}

function* deleteAreaSaga({ payload }) {
  try {
    const helper = getAreasHelper();
    yield call([helper, helper.deleteArea], payload);
    yield put(deleteAreaSuccess(payload));
  } catch (error) {
    yield put(deleteAreaError(error.message || "Erro ao excluir área"));
  }
}

export default function* areasSaga() {
  yield all([
    takeEvery(FETCH_AREAS, fetchAreasSaga),
    takeEvery(CREATE_AREA, createAreaSaga),
    takeEvery(UPDATE_AREA, updateAreaSaga),
    takeEvery(DELETE_AREA, deleteAreaSaga),
  ]);
}
