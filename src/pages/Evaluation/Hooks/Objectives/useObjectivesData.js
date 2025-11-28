import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchObjectives } from "../../../../store/objectives/actions";

const useObjectivesData = (filters = {}) => {
  const dispatch = useDispatch();
  const {
    objectives = [],
    loadingObjectives = false,
    creatingObjective = false,
    updatingObjective = false,
    deletingObjective = false,
    createdObjective = null,
    updatedObjective = null,
    deletedObjectiveId = null,
    error = null,
    createObjectiveError = null,
    updateObjectiveError = null,
    deleteObjectiveError = null,
  } = useSelector((state) => state.objectives || {});

  const filtersKey = useMemo(() => JSON.stringify(filters || {}), [filters]);

  useEffect(() => {
    dispatch(fetchObjectives(filters));
  }, [dispatch, filtersKey]);

  return {
    objectives,
    loadingObjectives,
    creatingObjective,
    updatingObjective,
    deletingObjective,
    createdObjective,
    updatedObjective,
    deletedObjectiveId,
    error,
    createObjectiveError,
    updateObjectiveError,
    deleteObjectiveError,
  };
};

export default useObjectivesData;
