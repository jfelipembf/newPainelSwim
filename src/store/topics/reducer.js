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

const initialState = {
  topics: [],
  loadingTopics: false,
  creatingTopic: false,
  updatingTopic: false,
  deletingTopic: false,
  createdTopic: null,
  updatedTopic: null,
  deletedTopicId: null,
  error: null,
  createTopicError: null,
  updateTopicError: null,
  deleteTopicError: null,
};

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPICS:
      return {
        ...state,
        loadingTopics: true,
        error: null,
      };

    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        loadingTopics: false,
        topics: action.payload,
      };

    case FETCH_TOPICS_ERROR:
      return {
        ...state,
        loadingTopics: false,
        error: action.payload,
      };

    case CREATE_TOPIC:
      return {
        ...state,
        creatingTopic: true,
        createTopicError: null,
        createdTopic: null,
      };

    case CREATE_TOPIC_SUCCESS:
      return {
        ...state,
        creatingTopic: false,
        createdTopic: action.payload,
        topics: [...state.topics, action.payload],
      };

    case CREATE_TOPIC_ERROR:
      return {
        ...state,
        creatingTopic: false,
        createTopicError: action.payload,
      };

    case UPDATE_TOPIC:
      return {
        ...state,
        updatingTopic: true,
        updateTopicError: null,
        updatedTopic: null,
      };

    case UPDATE_TOPIC_SUCCESS:
      return {
        ...state,
        updatingTopic: false,
        updatedTopic: action.payload,
        topics: state.topics.map(topic =>
          topic.id === action.payload.id ? action.payload : topic
        ),
      };

    case UPDATE_TOPIC_ERROR:
      return {
        ...state,
        updatingTopic: false,
        updateTopicError: action.payload,
      };

    case DELETE_TOPIC:
      return {
        ...state,
        deletingTopic: true,
        deleteTopicError: null,
        deletedTopicId: null,
      };

    case DELETE_TOPIC_SUCCESS:
      return {
        ...state,
        deletingTopic: false,
        deletedTopicId: action.payload,
        topics: state.topics.filter(topic => topic.id !== action.payload),
      };

    case DELETE_TOPIC_ERROR:
      return {
        ...state,
        deletingTopic: false,
        deleteTopicError: action.payload,
      };

    case CLEAR_TOPIC_ERRORS:
      return {
        ...state,
        error: null,
        createTopicError: null,
        updateTopicError: null,
        deleteTopicError: null,
      };

    default:
      return state;
  }
};

export default topicsReducer;
