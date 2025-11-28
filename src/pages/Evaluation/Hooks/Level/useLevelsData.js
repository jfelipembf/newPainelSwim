import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLevels } from "../../../../store/levels/actions";

const useLevelsData = () => {
  const dispatch = useDispatch();
  const {
    levels = [],
    loadingLevels = false,
    creatingLevel = false,
    updatingLevel = false,
    deletingLevel = false,
    createdLevel = null,
    updatedLevel = null,
    deletedLevelId = null,
    error = null,
    createLevelError = null,
    updateLevelError = null,
    deleteLevelError = null,
  } = useSelector((state) => state.levels || {});

  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);

  return {
    levels,
    loadingLevels,
    creatingLevel,
    updatingLevel,
    deletingLevel,
    createdLevel,
    updatedLevel,
    deletedLevelId,
    error,
    createLevelError,
    updateLevelError,
    deleteLevelError,
  };
};

export default useLevelsData;
