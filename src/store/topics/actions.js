import {
  FETCH_TOPICS,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_ERROR,
  CREATE_TOPIC,
  CREATE_TOPIC_SUCCESS,
  CREATE_TOPIC_ERROR,
  UPDATE_TOPIC,
  UPDATE_TOPIC_SUCCESS,
  UPDATE_TOPIC_ERROR,
  DELETE_TOPIC,
  DELETE_TOPIC_SUCCESS,
  DELETE_TOPIC_ERROR,
  CLEAR_TOPIC_ERRORS,
} from './actionTypes';

export const fetchTopics = (filters = {}) => ({
  type: FETCH_TOPICS,
  payload: filters,
});

export const fetchTopicsSuccess = (topics) => ({
  type: FETCH_TOPICS_SUCCESS,
  payload: topics,
});

export const fetchTopicsError = (error) => ({
  type: FETCH_TOPICS_ERROR,
  payload: error,
});

export const createTopic = (topicData) => ({
  type: CREATE_TOPIC,
  payload: topicData,
});

export const createTopicSuccess = (topic) => ({
  type: CREATE_TOPIC_SUCCESS,
  payload: topic,
});

export const createTopicError = (error) => ({
  type: CREATE_TOPIC_ERROR,
  payload: error,
});

export const updateTopic = (topicId, topicData) => ({
  type: UPDATE_TOPIC,
  payload: { id: topicId, data: topicData },
});

export const updateTopicSuccess = (topic) => ({
  type: UPDATE_TOPIC_SUCCESS,
  payload: topic,
});

export const updateTopicError = (error) => ({
  type: UPDATE_TOPIC_ERROR,
  payload: error,
});

export const deleteTopic = (topicId) => ({
  type: DELETE_TOPIC,
  payload: topicId,
});

export const deleteTopicSuccess = (topicId) => ({
  type: DELETE_TOPIC_SUCCESS,
  payload: topicId,
});

export const deleteTopicError = (error) => ({
  type: DELETE_TOPIC_ERROR,
  payload: error,
});

export const clearTopicErrors = () => ({
  type: CLEAR_TOPIC_ERRORS,
});
