import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
  ACTIVITY_CONFIG_FIELDS,
  ACTIVITY_CONFIG_FIELD_LABELS,
  ACTIVITY_CONFIG_STATUS,
  ACTIVITY_CONFIG_STATUS_LABELS,
} from "../../../../constants/activities/activities_configs";
import DaysOfWeekSelector from "../../../../components/Form/DaysOfWeekSelector";

const ClassesForm = ({
  formValues,
  onChange,
  onSubmit,
  onCancel,
  busy,
  isEditing,
  isSaving,
  activityOptions,
  areaOptions,
  instructorOptions,
  onSelectActivity,
  onSelectArea,
  onSelectInstructor,
  onDaysChange,
}) => {
  const handleActivityChange = (event) => {
    const option = activityOptions.find((opt) => String(opt.value) === event.target.value);
    onSelectActivity(option || null);
  };

  const handleAreaChange = (event) => {
    const option = areaOptions.find((opt) => String(opt.value) === event.target.value);
    onSelectArea(option || null);
  };

  const handleInstructorChange = (event) => {
    const option = instructorOptions.find((opt) => String(opt.value) === event.target.value);
    onSelectInstructor(option || null);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="configActivity">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.idActivity]}</Label>
            <Input
              id="configActivity"
              type="select"
              value={formValues[ACTIVITY_CONFIG_FIELDS.idActivity]}
              onChange={handleActivityChange}
              required
            >
              <option value="">Selecione...</option>
              {activityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="configArea">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.idArea]}</Label>
            <Input
              id="configArea"
              type="select"
              value={formValues[ACTIVITY_CONFIG_FIELDS.idArea]}
              onChange={handleAreaChange}
              required
            >
              <option value="">Selecione...</option>
              {areaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="configInstructor">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.idInstructor]}</Label>
            <Input
              id="configInstructor"
              type="select"
              value={formValues[ACTIVITY_CONFIG_FIELDS.idInstructor]}
              onChange={handleInstructorChange}
              required
            >
              <option value="">Selecione...</option>
              {instructorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="configCapacity">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.capacity]}</Label>
            <Input
              id="configCapacity"
              type="number"
              min="0"
              value={formValues[ACTIVITY_CONFIG_FIELDS.capacity]}
              onChange={(event) => onChange(ACTIVITY_CONFIG_FIELDS.capacity, Number(event.target.value || 0))}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="configStartDate">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.startDate]}</Label>
            <Input
              id="configStartDate"
              type="date"
              value={formValues[ACTIVITY_CONFIG_FIELDS.startDate]}
              onChange={(event) => onChange(ACTIVITY_CONFIG_FIELDS.startDate, event.target.value)}
              required
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="configEndDate">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.endDate]}</Label>
            <Input
              id="configEndDate"
              type="date"
              value={formValues[ACTIVITY_CONFIG_FIELDS.endDate]}
              onChange={(event) => onChange(ACTIVITY_CONFIG_FIELDS.endDate, event.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="configStartTime">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.startTime]}</Label>
            <Input
              id="configStartTime"
              type="time"
              value={formValues[ACTIVITY_CONFIG_FIELDS.startTime]}
              onChange={(event) => onChange(ACTIVITY_CONFIG_FIELDS.startTime, event.target.value)}
              required
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="configDuration">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.duration]}</Label>
            <Input
              id="configDuration"
              type="number"
              min="0"
              value={formValues[ACTIVITY_CONFIG_FIELDS.duration]}
              onChange={(event) => onChange(ACTIVITY_CONFIG_FIELDS.duration, Number(event.target.value || 0))}
              required
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="configCode">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.code]}</Label>
            <Input
              id="configCode"
              type="text"
              value={formValues[ACTIVITY_CONFIG_FIELDS.code]}
              onChange={(event) => onChange(ACTIVITY_CONFIG_FIELDS.code, event.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <DaysOfWeekSelector
            value={formValues[ACTIVITY_CONFIG_FIELDS.daysOfWeek] || []}
            onChange={onDaysChange}
            label={ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.daysOfWeek]}
          />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="configStatus">{ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.status]}</Label>
            <Input
              id="configStatus"
              type="select"
              value={formValues[ACTIVITY_CONFIG_FIELDS.status]}
              onChange={(event) => onChange(ACTIVITY_CONFIG_FIELDS.status, event.target.value)}
            >
              {Object.values(ACTIVITY_CONFIG_STATUS).map((status) => (
                <option key={status} value={status}>
                  {ACTIVITY_CONFIG_STATUS_LABELS[status]}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <FormGroup check className="mt-3">
            <Input
              id="configAllowSpot"
              type="checkbox"
              checked={!!formValues[ACTIVITY_CONFIG_FIELDS.allowChoosingSpot]}
              onChange={(event) => onChange(ACTIVITY_CONFIG_FIELDS.allowChoosingSpot, event.target.checked)}
            />
            <Label check className="ms-2" htmlFor="configAllowSpot">
              {ACTIVITY_CONFIG_FIELD_LABELS[ACTIVITY_CONFIG_FIELDS.allowChoosingSpot]}
            </Label>
          </FormGroup>
        </Col>
      </Row>

      <div className="d-flex align-items-center gap-2">
        <Button color="primary" type="submit" disabled={busy || isSaving}>
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
        {isEditing && (
          <Button type="button" color="secondary" onClick={onCancel} disabled={busy || isSaving}>
            Cancelar
          </Button>
        )}
      </div>
    </Form>
  );
};

ClassesForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  busy: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  activityOptions: PropTypes.array.isRequired,
  areaOptions: PropTypes.array.isRequired,
  instructorOptions: PropTypes.array.isRequired,
  onSelectActivity: PropTypes.func.isRequired,
  onSelectArea: PropTypes.func.isRequired,
  onSelectInstructor: PropTypes.func.isRequired,
  onDaysChange: PropTypes.func.isRequired,
};

export default ClassesForm;
