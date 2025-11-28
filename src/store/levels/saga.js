import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  FETCH_LEVELS,
  CREATE_LEVEL,
  UPDATE_LEVEL,
  DELETE_LEVEL,
} from './actionTypes';
import {
  fetchLevelsSuccess,
  fetchLevelsError,
  createLevelSuccess,
  createLevelError,
  updateLevelSuccess,
  updateLevelError,
  deleteLevelSuccess,
  deleteLevelError,
} from './actions';
import { getLevelsHelper } from '../../helpers/levels_helper';

function* fetchLevelsSaga({ payload: filters }) {
  try {
    const helper = getLevelsHelper();
    const levels = yield call([helper, helper.listLevels], filters);
    yield put(fetchLevelsSuccess(levels));
  } catch (error) {
    yield put(fetchLevelsError(error.message || 'Erro ao buscar níveis'));
  }
}

function* createLevelSaga({ payload: levelData }) {
  try {
    const helper = getLevelsHelper();
    const level = yield call([helper, helper.createLevel], levelData);
    yield put(createLevelSuccess(level));
  } catch (error) {
    yield put(createLevelError(error.message || 'Erro ao criar nível'));
  }
}

function* updateLevelSaga({ payload: { id, data } }) {
  try {
    const helper = getLevelsHelper();
    const level = yield call([helper, helper.updateLevel], id, data);
    yield put(updateLevelSuccess(level));
  } catch (error) {
    yield put(updateLevelError(error.message || 'Erro ao atualizar nível'));
  }
}

function* deleteLevelSaga({ payload: levelId }) {
  try {
    const helper = getLevelsHelper();
    yield call([helper, helper.deleteLevel], levelId);
    yield put(deleteLevelSuccess(levelId));
  } catch (error) {
    yield put(deleteLevelError(error.message || 'Erro ao excluir nível'));
  }
}

export default function* levelsSaga() {
  yield all([
    takeEvery(FETCH_LEVELS, fetchLevelsSaga),
    takeEvery(CREATE_LEVEL, createLevelSaga),
    takeEvery(UPDATE_LEVEL, updateLevelSaga),
    takeEvery(DELETE_LEVEL, deleteLevelSaga),
  ]);
}
