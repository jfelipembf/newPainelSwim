import React from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { MEMBERSHIP_FIELDS, MEMBERSHIP_FIELD_LABELS, DAYS_OF_WEEK_OPTIONS } from "../../../../constants/membership";

const AccessLimitationsMembership = ({ formData, onChange, onEntriesChange }) => {
  const handleEntriesChange = (field, value) => {
    onEntriesChange(field, value);
  };

  const handleDaysChange = (dayValue, checked) => {
    const currentDays = formData[MEMBERSHIP_FIELDS.entries]?.allowedDays || [];
    let newDays;

    if (checked) {
      // Adicionar dia se não estiver na lista
      newDays = [...currentDays, dayValue].sort((a, b) => a - b);
    } else {
      // Remover dia da lista
      newDays = currentDays.filter(day => day !== dayValue);
    }

    handleEntriesChange(MEMBERSHIP_FIELDS.allowedDays, newDays);
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="weeklyLimit">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.weeklyLimit]}
            </Label>
            <Input
              id="weeklyLimit"
              name="weeklyLimit"
              type="number"
              value={formData[MEMBERSHIP_FIELDS.entries]?.weeklyLimit ?? ''}
              onChange={(e) => handleEntriesChange(MEMBERSHIP_FIELDS.weeklyLimit, parseInt(e.target.value) || null)}
              placeholder="Ex: 5"
            />
            <small className="text-muted">Máximo de acessos por semana</small>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup check className="mt-4">
            <Label check>
              <Input
                type="checkbox"
                checked={formData[MEMBERSHIP_FIELDS.entries]?.unlimited || false}
                onChange={(e) => handleEntriesChange('unlimited', e.target.checked)}
              />
              {' '}Acesso Ilimitado
            </Label>
            <small className="text-muted d-block">Marque para permitir acesso ilimitado</small>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <FormGroup>
            <Label>
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.allowedDays]}
            </Label>
            <div className="d-flex flex-wrap gap-3">
              {DAYS_OF_WEEK_OPTIONS.map(({ value, label }) => {
                const currentDays = formData[MEMBERSHIP_FIELDS.entries]?.allowedDays || [];
                const isChecked = currentDays.includes(value);

                return (
                  <FormGroup check key={value} className="mb-2">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleDaysChange(value, e.target.checked)}
                      />
                      {' '}{label}
                    </Label>
                  </FormGroup>
                );
              })}
            </div>
            <small className="text-muted">
              Selecione os dias da semana permitidos para acesso (deixe vazio para todos os dias)
            </small>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default AccessLimitationsMembership;
