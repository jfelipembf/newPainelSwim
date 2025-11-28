import React from "react";
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { OBJECTIVE_FIELDS, OBJECTIVE_FIELD_LABELS } from "../../../../constants/objectives";

const ObjectiveForm = ({
  formValues,
  activityOptions,
  onChange,
  onSubmit,
  onCancel,
  isBusy,
}) => (
  <form onSubmit={onSubmit}>
    <Row>
      <Col md={6}>
        <FormGroup>
          <Label for="objectiveActivity">{OBJECTIVE_FIELD_LABELS[OBJECTIVE_FIELDS.idActivity]}</Label>
          <Input
            id="objectiveActivity"
            type="select"
            value={formValues[OBJECTIVE_FIELDS.idActivity]}
            onChange={(e) => onChange(OBJECTIVE_FIELDS.idActivity, e.target.value)}
            required
          >
            <option value="">
              {activityOptions.length === 0
                ? "Nenhuma atividade disponível"
                : "Selecione uma atividade"}
            </option>
            {activityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="objectiveName">{OBJECTIVE_FIELD_LABELS[OBJECTIVE_FIELDS.name]}</Label>
          <Input
            id="objectiveName"
            type="text"
            value={formValues[OBJECTIVE_FIELDS.name]}
            onChange={(e) => onChange(OBJECTIVE_FIELDS.name, e.target.value)}
            required
          />
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col md={8}>
        <FormGroup>
          <Label for="objectiveDescription">{OBJECTIVE_FIELD_LABELS[OBJECTIVE_FIELDS.description]}</Label>
          <Input
            id="objectiveDescription"
            type="textarea"
            rows="3"
            value={formValues[OBJECTIVE_FIELDS.description]}
            onChange={(e) => onChange(OBJECTIVE_FIELDS.description, e.target.value)}
          />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label for="objectiveIsActive">{OBJECTIVE_FIELD_LABELS[OBJECTIVE_FIELDS.isActive]}</Label>
          <div className="form-check">
            <Input
              id="objectiveIsActive"
              type="checkbox"
              checked={formValues[OBJECTIVE_FIELDS.isActive]}
              onChange={(e) => onChange(OBJECTIVE_FIELDS.isActive, e.target.checked)}
            />
            <Label for="objectiveIsActive" className="form-check-label">
              Objetivo ativo
            </Label>
          </div>
        </FormGroup>
      </Col>
    </Row>

    <div className="d-flex align-items-center mt-3">
      <Button color="primary" type="submit" disabled={isBusy}>
        {isBusy ? "Salvando..." : formValues.id ? "Atualizar Objetivo" : "Criar Objetivo"}
      </Button>
      {formValues.id && (
        <Button color="secondary" type="button" className="ms-2" onClick={onCancel}>
          Cancelar edição
        </Button>
      )}
    </div>
  </form>
);

export default ObjectiveForm;
