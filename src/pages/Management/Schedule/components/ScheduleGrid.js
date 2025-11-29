import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ScheduleEventCard from "./ScheduleEventCard";
import useScheduleGridData from "../hooks/useScheduleGridData";

const parseTimeToMinutes = (time) => {
  if (!time) return 0;
  const [hours = "0", minutes = "0"] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
};

const ScheduleGrid = ({
  days,
  events,
  className,
  selectedTurn = "all",
  selectable = false,
  selectedConfigIds = [],
  onSelectEvent,
}) => {
  const { timeSlots, eventsByDay } = useScheduleGridData({
    days,
    events,
    selectedTurn,
  });

  return (
    <div className={classNames("grade-grid", className)}>
      <div className="grade-grid-header">
        <div className="header-cell is-label">Horário</div>
        {days.map((day) => (
          <div
            className={classNames("header-cell", {
              "is-today": day.isToday,
            })}
            key={day.id}
          >
            <span className="day-name">{day.name}</span>
            <span className="day-date">{day.dateLabel}</span>
          </div>
        ))}
      </div>

      <div className="grade-grid-body">
        {timeSlots.map((slot) => (
          <React.Fragment key={slot}>
            <div className="time-cell">{slot}</div>
            {days.map((day) => {
              const slotMinutes = parseTimeToMinutes(slot);
              const dayEvents = (eventsByDay[day.id] || []).filter(
                (event) => parseTimeToMinutes(event.startTime) === slotMinutes
              );
              return (
                <div
                  key={`${day.id}-${slot}`}
                  className={classNames("day-slot", { "is-current": day.isToday })}
                >
                  {dayEvents.length === 0 && <div className="empty-placeholder" />}
                  {dayEvents.map((event) => (
                    <ScheduleEventCard
                      key={event.id}
                      title={event.title}
                      activityName={event.activityName}
                      subtitle={event.subtitle}
                      location={event.location}
                      instructor={event.instructor}
                      teacher={event.teacher}
                      capacity={event.capacity}
                      capacityLabel={event.capacityLabel}
                      timeLabel={`${event.startTime} - ${event.endTime}`}
                      accent={event.accent}
                      accentColor={event.accentColor}
                      lock={event.lock}
                      selectable={selectable}
                      isSelected={
                        selectable && Array.isArray(selectedConfigIds) && event.configId
                          ? selectedConfigIds.includes(event.configId)
                          : false
                      }
                      onClick={() => onSelectEvent?.(event)}
                    />
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

ScheduleGrid.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dateLabel: PropTypes.string.isRequired,
      isToday: PropTypes.bool,
    })
  ).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      dayId: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      location: PropTypes.string,
      instructor: PropTypes.string,
      capacityLabel: PropTypes.string,
      pillText: PropTypes.string,
      statusIcon: PropTypes.string,
      lock: PropTypes.bool,
    })
  ).isRequired,
  className: PropTypes.string,
  selectedTurn: PropTypes.oneOf(["all", "morning", "afternoon", "night"]),
  selectable: PropTypes.bool,
  selectedConfigIds: PropTypes.arrayOf(PropTypes.string),
  onSelectEvent: PropTypes.func,
};

export default ScheduleGrid;
