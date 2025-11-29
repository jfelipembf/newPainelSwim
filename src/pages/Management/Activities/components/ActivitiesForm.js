import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { ACTIVITY_FIELDS, ACTIVITY_FIELD_LABELS } from "../../../../constants/activities/activities";
import PhotoInput from "../../../../components/shared/PhotoInput";

const ActivitiesForm = ({
  formValues,
  onChange,
  onSubmit,
  onCancel,
  busy,
  isEditing,
  photoPreview,
  onPhotoSelect,
  isSaving,
}) => (
  <Form onSubmit={onSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="activityName">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.name]}</Label>
              <Input
                id="activityName"
                type="text"
                value={formValues[ACTIVITY_FIELDS.name]}
                onChange={(e) => onChange(ACTIVITY_FIELDS.name, e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="activityDescription">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.description]}</Label>
              <Input
                id="activityDescription"
                type="textarea"
                rows="1"
                value={formValues[ACTIVITY_FIELDS.description]}
                onChange={(e) => onChange(ACTIVITY_FIELDS.description, e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label for="activityColor">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.color]}</Label>
              <Input
                id="activityColor"
                type="color"
                value={formValues[ACTIVITY_FIELDS.color]}
                onChange={(e) => onChange(ACTIVITY_FIELDS.color, e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="activityCapacity">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.capacityDefault]}</Label>
              <Input
                id="activityCapacity"
                type="number"
                min="0"
                value={formValues[ACTIVITY_FIELDS.capacityDefault]}
                onChange={(e) => onChange(ACTIVITY_FIELDS.capacityDefault, Number(e.target.value || 0))}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="activityDuration">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.durationDefault]}</Label>
              <Input
                id="activityDuration"
                type="time"
                value={formValues[ACTIVITY_FIELDS.durationDefault]}
                onChange={(e) => onChange(ACTIVITY_FIELDS.durationDefault, e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3} className="d-flex align-items-center">
            <FormGroup check className="mt-3">
              <Input
                id="activityIsActive"
                type="checkbox"
                checked={!!formValues[ACTIVITY_FIELDS.isActive]}
                onChange={(e) => onChange(ACTIVITY_FIELDS.isActive, e.target.checked)}
              />
              <Label check className="ms-2" htmlFor="activityIsActive">
                {ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.isActive]}
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
            <PhotoInput
              id="activityPhoto"
              label={ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.photo]}
              onSelect={onPhotoSelect}
              previewUrl={photoPreview}
            />
          </Col>
        </Row>
        <div className="d-flex align-items-center">
          <Button color="primary" type="submit" disabled={busy}>
            {isSaving ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
          </Button>
          {isEditing && (
            <Button type="button" color="secondary" className="ms-2" onClick={onCancel} disabled={busy}>
              Cancelar
            </Button>
          )}
        </div>
      </Form>
);

ActivitiesForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  busy: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  photoPreview: PropTypes.string,
  onPhotoSelect: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
};

export default ActivitiesForm;
