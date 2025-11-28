import React from "react";
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { TOPIC_FIELDS, TOPIC_FIELD_LABELS } from "../../../../constants/topics";

const TopicForm = ({
  formValues,
  objectiveOptions,
  onChange,
  onSubmit,
  onCancel,
  isBusy,
}) => (
  <form onSubmit={onSubmit}>
    <Row>
      <Col md={6}>
        <FormGroup>
          <Label for="topicObjective">Selecione um objetivo</Label>
          <Input
            id="topicObjective"
            type="select"
            value={formValues[TOPIC_FIELDS.idObjective]}
            onChange={(e) => onChange(TOPIC_FIELDS.idObjective, e.target.value)}
            required
          >
            <option value="">Selecione um objetivo</option>
            {objectiveOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Input>
          <div className="text-muted small mt-1">
            Escolha um objetivo para carregar seus tópicos e para criar ou editar tópicos vinculados a ele.
          </div>
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col md={6}>
        <FormGroup>
          <Label for="topicName">{TOPIC_FIELD_LABELS[TOPIC_FIELDS.name]}</Label>
          <Input
            id="topicName"
            type="text"
            value={formValues[TOPIC_FIELDS.name]}
            onChange={(e) => onChange(TOPIC_FIELDS.name, e.target.value)}
            required
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="topicIsActive">{TOPIC_FIELD_LABELS[TOPIC_FIELDS.isActive]}</Label>
          <div className="form-check">
            <Input
              id="topicIsActive"
              type="checkbox"
              checked={formValues[TOPIC_FIELDS.isActive]}
              onChange={(e) => onChange(TOPIC_FIELDS.isActive, e.target.checked)}
            />
            <Label for="topicIsActive" className="form-check-label">
              Tópico ativo
            </Label>
          </div>
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col md={12}>
        <FormGroup>
          <Label for="topicDescription">{TOPIC_FIELD_LABELS[TOPIC_FIELDS.description]}</Label>
          <Input
            id="topicDescription"
            type="textarea"
            rows="3"
            value={formValues[TOPIC_FIELDS.description]}
            onChange={(e) => onChange(TOPIC_FIELDS.description, e.target.value)}
          />
        </FormGroup>
      </Col>
    </Row>

    <div className="d-flex align-items-center mt-3">
      <Button color="primary" type="submit" disabled={isBusy}>
        {isBusy ? "Salvando..." : formValues.id ? "Atualizar Tópico" : "Criar Tópico"}
      </Button>
      {formValues.id && (
        <Button color="secondary" type="button" className="ms-2" onClick={onCancel}>
          Cancelar edição
        </Button>
      )}
    </div>
  </form>
);

export default TopicForm;
