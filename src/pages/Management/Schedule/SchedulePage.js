import React from "react";
import { Card, CardBody } from "reactstrap";
import ScheduleGridControls from "./components/ScheduleGridControls";
import ScheduleGrid from "./components/ScheduleGrid";
import useScheduleGridView from "./hooks/useScheduleGridView";

const SchedulePage = ({
  selectable = false,
  onSelectEvent,
  selectedConfigIds = [],
  title = "Grade de Turmas",
  subtitle = "Gerencie turmas e turnos semanais em um único lugar.",
}) => {
  const {
    daysOfWeek,
    events,
    selectedTurn,
    setSelectedTurn,
    tagFilters,
    turnRangeLabel,
    dateLabel,
    handlePrevWeek,
    handleNextWeek,
    handleToday,
  } = useScheduleGridView();

  return (
    <Card className="mt-4">
      <CardBody>
        <div className="grade-board">
          <div className="grade-toolbar__title">
            <h4 className="mb-1">{title}</h4>
            {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
          </div>

          <ScheduleGridControls
            tags={tagFilters}
            selectedTag={selectedTurn}
            onSelectTag={setSelectedTurn}
            viewMode="week"
            onPrevPeriod={handlePrevWeek}
            onNextPeriod={handleNextWeek}
            onToday={handleToday}
            dateLabel={dateLabel}
            turnRangeLabel={turnRangeLabel}
          />

          <ScheduleGrid
            days={daysOfWeek}
            events={events}
            selectedTurn={selectedTurn}
            selectable={selectable}
            selectedConfigIds={selectedConfigIds}
            onSelectEvent={onSelectEvent}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default SchedulePage;
