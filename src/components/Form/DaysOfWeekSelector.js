import React from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Label } from "reactstrap";
import { WEEK_DAYS } from "../../constants/days";

const DaysOfWeekSelector = ({
  value = [],
  onChange,
  label = "Dias da semana",
  helperText,
  className,
}) => {
  const handleToggle = (dayValue) => {
    const exists = value.includes(dayValue);
    const updated = exists ? value.filter((day) => day !== dayValue) : [...value, dayValue];
    onChange?.(updated.sort());
  };

  const getDisplayLabel = (dayLabel) => dayLabel.replace("-feira", "").trim();

  return (
    <FormGroup className={className}>
      {label && <Label className="d-block">{label}</Label>}
      <div className="d-flex flex-wrap gap-2 w-100">
        {WEEK_DAYS.map((day) => {
          const active = value.includes(day.value);
          return (
            <Button
              key={day.value}
              type="button"
              color={active ? "primary" : "light"}
              className="flex-grow-1"
              style={{ flexBasis: "calc(14.28% - 0.5rem)", minWidth: 120 }}
              onClick={() => handleToggle(day.value)}
            >
              {getDisplayLabel(day.label)}
            </Button>
          );
        })}
      </div>
      {helperText && <small className="text-muted d-block mt-2">{helperText}</small>}
    </FormGroup>
  );
};

DaysOfWeekSelector.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
};

export default DaysOfWeekSelector;
