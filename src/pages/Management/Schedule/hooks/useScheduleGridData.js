import { useMemo } from "react";

const parseTimeToMinutes = (time) => {
  const [hours, minutes] = (time || "00:00").split(":").map(Number);
  return hours * 60 + minutes;
};

const minutesToLabel = (minutes) => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

const TURN_RANGES = {
  all: { min: 6 * 60, max: 21 * 60 },
  morning: { min: 6 * 60, max: 12 * 60 },
  afternoon: { min: 12 * 60, max: 18 * 60 },
  night: { min: 18 * 60, max: 23 * 60 + 59 },
};

const useScheduleGridData = ({ events = [], days = [], selectedTurn = "all" }) => {
  const filteredEvents = useMemo(() => {
    if (selectedTurn === "all") return events;
    if (selectedTurn === "morning") return events.filter((event) => parseTimeToMinutes(event.startTime) < 12 * 60);
    if (selectedTurn === "afternoon") {
      return events.filter((event) => {
        const start = parseTimeToMinutes(event.startTime);
        return start >= 12 * 60 && start < 18 * 60;
      });
    }
    if (selectedTurn === "night") return events.filter((event) => parseTimeToMinutes(event.startTime) >= 18 * 60);
    return events;
  }, [events, selectedTurn]);

  const timeSlots = useMemo(() => {
    const baseRange = TURN_RANGES[selectedTurn] || TURN_RANGES.all;
    const { min, max } = filteredEvents.reduce(
      (acc, event) => {
        const start = parseTimeToMinutes(event.startTime);
        const end = parseTimeToMinutes(event.endTime);
        return {
          min: Math.min(acc.min, start),
          max: Math.max(acc.max, end),
        };
      },
      { min: baseRange.min, max: baseRange.max }
    );

    const rangeStart = Math.min(Math.floor(min / 15) * 15, baseRange.min);
    const rangeEnd = Math.max(Math.ceil(max / 15) * 15, baseRange.max);
    const slots = [];
    for (let minutes = rangeStart; minutes <= rangeEnd; minutes += 15) {
      slots.push(minutesToLabel(minutes));
    }
    return slots;
  }, [filteredEvents, selectedTurn]);

  const eventsByDay = useMemo(() => {
    return days.reduce((acc, day) => {
      acc[day.id] = filteredEvents.filter((event) => event.dayId === day.id);
      return acc;
    }, {});
  }, [days, filteredEvents]);

  return {
    filteredEvents,
    timeSlots,
    eventsByDay,
    baseMinutes: parseTimeToMinutes(timeSlots[0] || minutesToLabel(TURN_RANGES[selectedTurn]?.min || TURN_RANGES.all.min)),
    slotHeight: 60,
  };
};

export default useScheduleGridData;
