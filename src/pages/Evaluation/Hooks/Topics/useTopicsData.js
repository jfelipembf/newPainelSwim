import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics } from "../../../../store/topics/actions";

const useTopicsData = (filters = {}) => {
  const dispatch = useDispatch();
  const {
    topics = [],
    loadingTopics = false,
    creatingTopic = false,
    updatingTopic = false,
    deletingTopic = false,
    createdTopic = null,
    updatedTopic = null,
    deletedTopicId = null,
    error = null,
    createTopicError = null,
    updateTopicError = null,
    deleteTopicError = null,
  } = useSelector((state) => state.topics || {});

  const filtersKey = useMemo(() => JSON.stringify(filters || {}), [filters]);
  const stableFilters = useMemo(() => filters, [filtersKey]);

  useEffect(() => {
    dispatch(fetchTopics(stableFilters));
  }, [dispatch, stableFilters, filtersKey]);

  return {
    topics,
    loadingTopics,
    creatingTopic,
    updatingTopic,
    deletingTopic,
    createdTopic,
    updatedTopic,
    deletedTopicId,
    error,
    createTopicError,
    updateTopicError,
    deleteTopicError,
  };
};

export default useTopicsData;
