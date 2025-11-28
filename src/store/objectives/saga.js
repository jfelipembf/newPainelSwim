import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  FETCH_OBJECTIVES,
  CREATE_OBJECTIVE,
  UPDATE_OBJECTIVE,
  DELETE_OBJECTIVE,
} from './actionTypes';
import {
  fetchObjectivesSuccess,
  fetchObjectivesError,
  createObjectiveSuccess,
  createObjectiveError,
  updateObjectiveSuccess,
  updateObjectiveError,
  deleteObjectiveSuccess,
  deleteObjectiveError,
} from './actions';
import { getObjectivesHelper } from '../../helpers/objectives_helper';

function* fetchObjectivesSaga({ payload: filters }) {
  try {
    const helper = getObjectivesHelper();
    const objectives = yield call([helper, helper.listObjectives], filters);
    yield put(fetchObjectivesSuccess(objectives));
  } catch (error) {
    yield put(fetchObjectivesError(error.message || 'Erro ao buscar objetivos'));
  }
}

function* createObjectiveSaga({ payload: objectiveData }) {
  try {
    const helper = getObjectivesHelper();
    const objective = yield call([helper, helper.createObjective], objectiveData);
    yield put(createObjectiveSuccess(objective));
  } catch (error) {
    yield put(createObjectiveError(error.message || 'Erro ao criar objetivo'));
  }
}

function* updateObjectiveSaga({ payload: { id, data } }) {
  try {
    const helper = getObjectivesHelper();
    const objective = yield call([helper, helper.updateObjective], id, data);
    yield put(updateObjectiveSuccess(objective));
  } catch (error) {
    yield put(updateObjectiveError(error.message || 'Erro ao atualizar objetivo'));
  }
}

function* deleteObjectiveSaga({ payload: objectiveId }) {
  try {
    const helper = getObjectivesHelper();
    yield call([helper, helper.deleteObjective], objectiveId);
    yield put(deleteObjectiveSuccess(objectiveId));
  } catch (error) {
    yield put(deleteObjectiveError(error.message || 'Erro ao excluir objetivo'));
  }
}

export default function* objectivesSaga() {
  yield all([
    takeEvery(FETCH_OBJECTIVES, fetchObjectivesSaga),
    takeEvery(CREATE_OBJECTIVE, createObjectiveSaga),
    takeEvery(UPDATE_OBJECTIVE, updateObjectiveSaga),
    takeEvery(DELETE_OBJECTIVE, deleteObjectiveSaga),
  ]);
}
