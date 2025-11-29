import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup, Col, Input, Label, Row } from "reactstrap";

const ScheduleGridControls = ({
  viewMode,
  onChangeView,
  tags = [],
  selectedTag,
  onSelectTag,
  dateLabel,
  onPrevPeriod,
  onNextPeriod,
  onToday,
  turnRangeLabel,
}) => (
  <div className="schedule-controls">
    <Row className="align-items-center gy-3">
      <Col md="8" sm="12">
        <div className="schedule-controls__left">
          <ButtonGroup className="schedule-controls__tags">
            {tags.map((tag) => (
              <Button
                key={tag.id}
                color="primary"
                outline={selectedTag !== tag.id}
                onClick={() => onSelectTag?.(tag.id)}
              >
                {tag.label}
              </Button>
            ))}
          </ButtonGroup>

          {turnRangeLabel && <span className="schedule-controls__turn-range text-muted">{turnRangeLabel}</span>}

          <div className="schedule-controls__date-nav">
            <Button color="primary" size="sm" onClick={onPrevPeriod}>
              <i className="mdi mdi-chevron-left" />
            </Button>
            <span className="schedule-controls__date-label">{dateLabel || "--"}</span>
            <Button color="primary" size="sm" onClick={onNextPeriod}>
              <i className="mdi mdi-chevron-right" />
            </Button>
            <Button color="link" size="sm" onClick={onToday}>
              Hoje
            </Button>
          </div>
        </div>
      </Col>

      <Col md="4" sm="12">
        <div className="schedule-controls__right">
          <div className="schedule-controls__status form-check mb-0">
            <Input className="form-check-input" type="checkbox" id="viewStatus" />
            <Label className="form-check-label" htmlFor="viewStatus">
              Ver status
            </Label>
          </div>
          <ButtonGroup size="sm" className="schedule-controls__view">
            <Button color={viewMode === "day" ? "primary" : "light"} onClick={() => onChangeView?.("day")}>
              Dia
            </Button>
            <Button color={viewMode === "week" ? "primary" : "light"} onClick={() => onChangeView?.("week")}>
              Semana
            </Button>
          </ButtonGroup>
        </div>
      </Col>
    </Row>
  </div>
);

ScheduleGridControls.propTypes = {
  viewMode: PropTypes.oneOf(["day", "week"]),
  onChangeView: PropTypes.func,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  selectedTag: PropTypes.string,
  onSelectTag: PropTypes.func,
  dateLabel: PropTypes.string,
  onPrevPeriod: PropTypes.func,
  onNextPeriod: PropTypes.func,
  onToday: PropTypes.func,
  turnRangeLabel: PropTypes.string,
};

export default ScheduleGridControls;
