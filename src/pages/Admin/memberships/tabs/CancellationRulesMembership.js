import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { MEMBERSHIP_FIELDS, MEMBERSHIP_FIELD_LABELS } from "../../../../constants/membership";


const CancellationRulesMembership = ({ formData, onChange }) => {
  const [allowSuspensionState, setAllowSuspensionState] = useState(formData[MEMBERSHIP_FIELDS.allowSuspension] ?? false);
  const [scheduleCancellationState, setScheduleCancellationState] = useState(formData[MEMBERSHIP_FIELDS.scheduleCancellation] ?? false);

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  // Sync local states with formData changes
  useEffect(() => {
    setAllowSuspensionState(formData[MEMBERSHIP_FIELDS.allowSuspension] ?? false);
  }, [formData[MEMBERSHIP_FIELDS.allowSuspension]]);

  useEffect(() => {
    setScheduleCancellationState(formData[MEMBERSHIP_FIELDS.scheduleCancellation] ?? false);
  }, [formData[MEMBERSHIP_FIELDS.scheduleCancellation]]);

  return (
    <div>
      {/* Seção de Suspensão */}
      <Row className="mb-4">
        <Col md={12}>
          <h5 className="text-primary mb-3">
            <i className="fas fa-pause-circle me-2"></i>
            Regras de Suspensão
          </h5>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <FormGroup>
            <Label for="allowSuspension">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.allowSuspension]}
            </Label>
            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="allowSuspension"
                checked={allowSuspensionState}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  setAllowSuspensionState(newValue);
                  handleChange(MEMBERSHIP_FIELDS.allowSuspension, newValue);
                }}
              />
              <Label className="form-check-label" for="allowSuspension">
                {allowSuspensionState ? 'Habilitado' : 'Desabilitado'}
              </Label>
            </div>
            <small className="text-muted">
              Suspensão é solicitada pelo aluno, mas processada pela equipe
            </small>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="maxSuspensionDays">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.maxSuspensionDays]}
            </Label>
            <Input
              id="maxSuspensionDays"
              name="maxSuspensionDays"
              type="number"
              value={formData[MEMBERSHIP_FIELDS.maxSuspensionDays] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.maxSuspensionDays, parseInt(e.target.value) || null)}
              placeholder="90"
              disabled={!allowSuspensionState}
            />
            <small className="text-muted">
              Número máximo de dias consecutivos que o plano pode ficar suspenso
            </small>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="minSuspensionPeriod">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.minSuspensionPeriod]}
            </Label>
            <Input
              id="minSuspensionPeriod"
              name="minSuspensionPeriod"
              type="number"
              value={formData[MEMBERSHIP_FIELDS.minSuspensionPeriod] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.minSuspensionPeriod, parseInt(e.target.value) || null)}
              placeholder="7"
              disabled={!allowSuspensionState}
            />
            <small className="text-muted">
              Período mínimo em dias entre suspensões do mesmo plano
            </small>
          </FormGroup>
        </Col>
      </Row>

      {/* Seção de Cancelamento */}
      <Row className="mb-4">
        <Col md={12}>
          <h5 className="text-danger mb-3">
            <i className="fas fa-times-circle me-2"></i>
            Regras de Cancelamento
          </h5>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <FormGroup>
            <Label for="scheduleCancellation">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.scheduleCancellation]}
            </Label>
            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="scheduleCancellation"
                checked={scheduleCancellationState}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  setScheduleCancellationState(newValue);
                  handleChange(MEMBERSHIP_FIELDS.scheduleCancellation, newValue);
                }}
              />
              <Label className="form-check-label" for="scheduleCancellation">
                {scheduleCancellationState ? 'Habilitado' : 'Desabilitado'}
              </Label>
            </div>
            <small className="text-muted">
              Permite agendar cancelamento para uma data futura
            </small>
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <FormGroup>
            <Label for="cancellationFine">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.cancellationFine]}
            </Label>
            <Input
              id="cancellationFine"
              name="cancellationFine"
              type="number"
              step="0.01"
              value={formData[MEMBERSHIP_FIELDS.cancellationFine] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.cancellationFine, parseFloat(e.target.value) || null)}
              placeholder="Percentual da multa, ex: 10 para 10%"
            />
            <small className="text-muted">
              Percentual aplicado sobre o valor do plano quando cancelado antes do período mínimo
            </small>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="cancellationGracePeriod">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.cancellationGracePeriod]}
            </Label>
            <Input
              id="cancellationGracePeriod"
              name="cancellationGracePeriod"
              type="number"
              value={formData[MEMBERSHIP_FIELDS.cancellationGracePeriod] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.cancellationGracePeriod, parseInt(e.target.value) || null)}
              placeholder="30"
            />
            <small className="text-muted">
              Período em dias durante o qual não é cobrada multa de cancelamento
            </small>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div className="alert alert-info">
            <h5><i className="fas fa-info-circle me-2"></i>Informações sobre Suspensão e Cancelamento</h5>
            <div className="row">
              <div className="col-md-6">
                <h6 className="text-primary">Suspensão:</h6>
                <ul className="mb-2">
                  <li>Bloqueio temporário do acesso do aluno</li>
                  <li>Mantém o contrato ativo</li>
                  <li>Pode ser revertida a qualquer momento</li>
                  <li>Não gera multa ou encargos</li>
                  <li>Limitação de dias consecutivos e período mínimo entre suspensões</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6 className="text-danger">Cancelamento:</h6>
                <ul className="mb-2">
                  <li>Encerramento definitivo do contrato</li>
                  <li>Pode gerar multa se fora do período de carência</li>
                  <li>Pode ser agendado para data futura</li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CancellationRulesMembership;
