import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  FETCH_TOPICS,
  CREATE_TOPIC,
  UPDATE_TOPIC,
  DELETE_TOPIC,
} from './actionTypes';
import {
  fetchTopicsSuccess,
  fetchTopicsError,
  createTopicSuccess,
  createTopicError,
  updateTopicSuccess,
  updateTopicError,
  deleteTopicSuccess,
  deleteTopicError,
} from './actions';
import { getTopicsHelper } from '../../helpers/topics_helper';

function* fetchTopicsSaga({ payload: filters }) {
  try {
    const helper = getTopicsHelper();
    const topics = yield call([helper, helper.listTopics], filters);
    yield put(fetchTopicsSuccess(topics));
  } catch (error) {
    yield put(fetchTopicsError(error.message || 'Erro ao buscar tópicos'));
  }
}

function* createTopicSaga({ payload: topicData }) {
  try {
    const helper = getTopicsHelper();
    const topic = yield call([helper, helper.createTopic], topicData);
    yield put(createTopicSuccess(topic));
  } catch (error) {
    yield put(createTopicError(error.message || 'Erro ao criar tópico'));
  }
}

function* updateTopicSaga({ payload: { id, data } }) {
  try {
    const helper = getTopicsHelper();
    const topic = yield call([helper, helper.updateTopic], id, data);
    yield put(updateTopicSuccess(topic));
  } catch (error) {
    yield put(updateTopicError(error.message || 'Erro ao atualizar tópico'));
  }
}

function* deleteTopicSaga({ payload: topicId }) {
  try {
    const helper = getTopicsHelper();
    yield call([helper, helper.deleteTopic], topicId);
    yield put(deleteTopicSuccess(topicId));
  } catch (error) {
    yield put(deleteTopicError(error.message || 'Erro ao excluir tópico'));
  }
}

export default function* topicsSaga() {
  yield all([
    takeEvery(FETCH_TOPICS, fetchTopicsSaga),
    takeEvery(CREATE_TOPIC, createTopicSaga),
    takeEvery(UPDATE_TOPIC, updateTopicSaga),
    takeEvery(DELETE_TOPIC, deleteTopicSaga),
  ]);
}
