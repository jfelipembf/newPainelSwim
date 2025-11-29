import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const ACCENT_COLOR_BY_VARIANT = {
  blue: "#2563eb",
  green: "#059669",
  purple: "#7c3aed",
  orange: "#f97316",
  red: "#dc2626",
};

const ScheduleEventCard = ({
  title,
  activityName,
  subtitle,
  location,
  instructor,
  teacher,
  capacity,
  capacityLabel,
  timeLabel,
  accent = "blue",
  accentColor,
  lock,
  style,
  onClick,
  isSelected,
  selectable,
}) => {
  const displayTitle = activityName || title;
  const teacherLabel = teacher || instructor;
  const resolvedAccent = accentColor || ACCENT_COLOR_BY_VARIANT[accent] || ACCENT_COLOR_BY_VARIANT.blue;
  const cardStyle = {
    "--event-accent": resolvedAccent,
    ...style,
  };

  return (
    <div
      className={classNames("schedule-event-card", "grade-event", {
        "is-disabled": lock,
        "is-selected": isSelected,
        "is-selectable": selectable,
      })}
      style={cardStyle}
      onClick={selectable ? onClick : undefined}
    >
      <div className="event-header">
        <span className="event-time">{timeLabel}</span>
        {(capacity || capacityLabel) && (
          <span className="event-capacity badge rounded-pill bg-light text-primary">
            {capacity ? (
              <>
                <span className="value">{capacity.filled}</span>
                <span className="divider">/</span>
                <span className="value total">{capacity.total}</span>
              </>
            ) : (
              capacityLabel
            )}
          </span>
        )}
      </div>

      <div className="event-title">{displayTitle}</div>

      <div className="event-meta">
        {subtitle && <span>{subtitle}</span>}
        {teacherLabel && <span>{teacherLabel}</span>}
        {location && <span>{location}</span>}
      </div>
    </div>
  );
};

ScheduleEventCard.propTypes = {
  title: PropTypes.string.isRequired,
  activityName: PropTypes.string,
  subtitle: PropTypes.string,
  location: PropTypes.string,
  instructor: PropTypes.string,
  teacher: PropTypes.string,
  capacity: PropTypes.shape({
    filled: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }),
  capacityLabel: PropTypes.string,
  timeLabel: PropTypes.string,
  accent: PropTypes.oneOf(["blue", "green", "purple", "orange", "red"]),
  accentColor: PropTypes.string,
  lock: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  selectable: PropTypes.bool,
};

export default ScheduleEventCard;
