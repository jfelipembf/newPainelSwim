import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WEEK_DAYS, WEEK_DAY_ID_BY_VALUE } from "../../../../constants/days";
import { SCHEDULE_TURN_FILTERS, SCHEDULE_TURN_RANGE_LABELS } from "../../../../constants/schedule";
import { fetchConfigs } from "../../../../store/activities_schedule/actions";
import { ensureSessions, fetchSessions } from "../../../../store/activities_sessions/actions";

const DEFAULT_WEEKS_AHEAD = 4;
const WEEK_DAY_INFO_BY_VALUE = WEEK_DAYS.reduce((acc, day) => {
  acc[day.value] = {
    id: day.short.toLowerCase(),
    short: day.short,
  };
  return acc;
}, {});

const formatISODate = (date) => {
  if (!date) return null;
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone.toISOString().split("T")[0];
};

const addDays = (date, days) => {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + days);
  return clone;
};

const getWeekStart = (reference) => {
  const base = new Date(reference);
  base.setHours(0, 0, 0, 0);
  const offset = (base.getDay() + 6) % 7; // Monday as start
  base.setDate(base.getDate() - offset);
  return base;
};

const formatWeekRange = (startDate) => {
  const endDate = addDays(startDate, 6);
  const options = { day: "2-digit", month: "short" };
  const startLabel = startDate.toLocaleDateString("pt-BR", options);
  const endLabel = endDate.toLocaleDateString("pt-BR", options);
  return `${startLabel} - ${endLabel}, ${endDate.getFullYear()}`.toLowerCase();
};

const useScheduleGridView = () => {
  const dispatch = useDispatch();
  const { items: configs = [], deletedId } = useSelector((state) => state.activitiesSchedule || {});
  const { items: sessions = [], loading: sessionsLoading } = useSelector((state) => state.activitiesSessions || {});

  const [selectedTurn, setSelectedTurn] = useState("all");
  const [currentWeekStart, setCurrentWeekStart] = useState(() => getWeekStart(new Date()));

  const daysOfWeek = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = today.toDateString();

    return Array.from({ length: 7 }).map((_, index) => {
      const date = addDays(currentWeekStart, index);
      date.setHours(0, 0, 0, 0);
      const dayInfo = WEEK_DAY_INFO_BY_VALUE[date.getDay()];
      return {
        id: dayInfo.id,
        name: dayInfo.short,
        dateLabel: String(date.getDate()).padStart(2, "0"),
        isToday: date.toDateString() === todayKey,
      };
    });
  }, [currentWeekStart]);

  const weekStartISO = useMemo(() => formatISODate(currentWeekStart), [currentWeekStart]);
  const weekEndISO = useMemo(() => formatISODate(addDays(currentWeekStart, 6)), [currentWeekStart]);

  useEffect(() => {
    dispatch(fetchConfigs());
  }, [dispatch]);

  useEffect(() => {
    if (!weekStartISO) return;
    dispatch(fetchSessions({ startDate: weekStartISO, endDate: weekEndISO }));
  }, [dispatch, weekStartISO, weekEndISO, configs.length, deletedId]);

  useEffect(() => {
    if (!configs.length || !weekStartISO) return;
    configs
      .filter((config) => config?.startTime && Array.isArray(config?.daysOfWeek) && config.daysOfWeek.length > 0)
      .forEach((config) =>
        dispatch(ensureSessions(config, { fromDate: weekStartISO, weeksAhead: DEFAULT_WEEKS_AHEAD }))
      );
  }, [dispatch, configs, weekStartISO]);

  const configMap = useMemo(() => {
    return configs.reduce((acc, config) => {
      const key = config.idConfiguration || config.id;
      if (key) acc[key] = config;
      return acc;
    }, {});
  }, [configs]);

  const getConfigById = useCallback((id) => {
    if (!id) return null;
    return configMap[id] || null;
  }, [configMap]);

  const events = useMemo(() => {
    if (!sessions?.length) return [];

    return sessions
      .map((session) => {
        const [year, month = 1, day = 1] = (session.activityDate || "").split("-").map(Number);
        const localDate = new Date(year, (month ?? 1) - 1, day ?? 1);
        if (Number.isNaN(localDate.getTime())) return null;
        const dayId = WEEK_DAY_ID_BY_VALUE[localDate.getDay()];
        if (!dayId) return null;

        const config = configMap[session.idConfiguration];
        if (!config) return null;
        const title = config.activityName || session.activityName || config.title || "Turma";
        const accentColor = session.activityColor || config.activityColor || config.accentColor || "";
        const filled = Number(session.ocupation || 0);
        const totalCapacity = Number(session.capacity ?? config.capacity ?? 0);

        return {
          id: session.idActivitySession || session.id,
          configId: session.idConfiguration || config.idConfiguration || config.id,
          dayId,
          startTime: session.startTime,
          endTime: session.endTime,
          title,
          activityName: title,
          location: config.areaName || session.areaName || "",
          instructor: config.instructorName || session.instructorName || "",
          capacity: totalCapacity ? { filled, total: totalCapacity } : null,
          accent: config.accent,
          accentColor,
          lock: session.status && session.status !== 1,
        };
      })
      .filter(Boolean);
  }, [sessions, configMap]);

  const handlePrevWeek = useCallback(() => {
    setCurrentWeekStart((prev) => addDays(prev, -7));
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentWeekStart((prev) => addDays(prev, 7));
  }, []);

  const handleToday = useCallback(() => {
    setCurrentWeekStart(getWeekStart(new Date()));
  }, []);

  const dateLabel = useMemo(() => formatWeekRange(currentWeekStart), [currentWeekStart]);

  const turnRangeLabel = useMemo(
    () => SCHEDULE_TURN_RANGE_LABELS[selectedTurn] || SCHEDULE_TURN_RANGE_LABELS.all,
    [selectedTurn]
  );

  return {
    daysOfWeek,
    events,
    selectedTurn,
    setSelectedTurn,
    tagFilters: SCHEDULE_TURN_FILTERS,
    turnRangeLabel,
    dateLabel,
    handlePrevWeek,
    handleNextWeek,
    handleToday,
    sessionsLoading,
    configs,
    getConfigById,
  };
};

export default useScheduleGridView;
