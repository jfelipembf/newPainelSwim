import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfigs } from "../../../../store/activities_schedule/actions";
import { fetchActivities } from "../../../../store/activities/actions";
import { fetchEmployees } from "../../../../store/employees/actions";
import { fetchAreas } from "../../../../store/areas/actions";

const mapToOptions = (items = [], getValue, getLabel) =>
  items.map((item) => ({
    value: getValue(item),
    label: getLabel(item),
    raw: item,
  }));

export const useClassesData = () => {
  const dispatch = useDispatch();

  const activitiesScheduleState = useSelector((state) => state.activitiesSchedule || {});
  const activitiesState = useSelector((state) => state.activities || {});
  const areasState = useSelector((state) => state.areas || {});
  const employeesState = useSelector((state) => state.employees || {});

  const configs = useMemo(() => activitiesScheduleState.items || [], [activitiesScheduleState.items]);

  useEffect(() => {
    dispatch(fetchConfigs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const activityOptions = useMemo(
    () => mapToOptions(activitiesState.items, (item) => item.idActivity || item.id, (item) => item.name),
    [activitiesState.items]
  );

  const areaOptions = useMemo(
    () => mapToOptions(areasState.items, (item) => item.idArea || item.id, (item) => item.name),
    [areasState.items]
  );

  const instructorOptions = useMemo(
    () =>
      mapToOptions(
        employeesState.items,
        (item) => item.id || item.idEmployee,
        (item) => `${item.name || ""} ${item.lastName || ""}`.trim()
      ),
    [employeesState.items]
  );

  const configMap = useMemo(() => {
    return configs.reduce((acc, config) => {
      const key = config.idConfiguration || config.id;
      if (key) acc[key] = config;
      return acc;
    }, {});
  }, [configs]);

  const getConfigById = useCallback(
    (id) => {
      if (!id) return null;
      return configMap[id] || null;
    },
    [configMap]
  );

  return {
    ...activitiesScheduleState,
    configs,
    getConfigById,
    activityOptions,
    areaOptions,
    instructorOptions,
  };
};

export default useClassesData;
