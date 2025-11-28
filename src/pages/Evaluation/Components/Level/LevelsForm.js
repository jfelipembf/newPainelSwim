import React from "react";
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { LEVEL_FIELD_LABELS, LEVEL_FIELDS } from "../../../../constants/levels";

const LevelsForm = ({ formValues, onChange, onSubmit, onCancel, isBusy }) => (
  <form onSubmit={onSubmit}>
    <Row>
      <Col md={6}>
        <FormGroup>
          <Label for="levelLabel">{LEVEL_FIELD_LABELS[LEVEL_FIELDS.label]}</Label>
          <Input
            id="levelLabel"
            type="text"
            value={formValues[LEVEL_FIELDS.label]}
            onChange={(e) => onChange(LEVEL_FIELDS.label, e.target.value)}
            required
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="levelIsActive">{LEVEL_FIELD_LABELS[LEVEL_FIELDS.isActive]}</Label>
          <div className="form-check">
            <Input
              id="levelIsActive"
              type="checkbox"
              checked={formValues[LEVEL_FIELDS.isActive]}
              onChange={(e) => onChange(LEVEL_FIELDS.isActive, e.target.checked)}
            />
            <Label for="levelIsActive" className="form-check-label">
              Nível ativo
            </Label>
          </div>
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col md={12}>
        <FormGroup>
          <Label for="levelDescription">{LEVEL_FIELD_LABELS[LEVEL_FIELDS.description]}</Label>
          <Input
            id="levelDescription"
            type="textarea"
            rows="3"
            value={formValues[LEVEL_FIELDS.description]}
            onChange={(e) => onChange(LEVEL_FIELDS.description, e.target.value)}
          />
        </FormGroup>
      </Col>
    </Row>

    <div className="d-flex align-items-center mt-3">
      <Button color="primary" type="submit" disabled={isBusy}>
        {isBusy ? "Salvando..." : formValues.id ? "Atualizar Nível" : "Criar Nível"}
      </Button>
      {formValues.id && (
        <Button color="secondary" type="button" className="ms-2" onClick={onCancel}>
          Cancelar edição
        </Button>
      )}
    </div>
  </form>
);

export default LevelsForm;
