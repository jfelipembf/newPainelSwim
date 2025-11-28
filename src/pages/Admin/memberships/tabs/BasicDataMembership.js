import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { MEMBERSHIP_FIELDS, MEMBERSHIP_FIELD_LABELS, MEMBERSHIP_DURATION_TYPES, MEMBERSHIP_TYPES } from "../../../../constants/membership";
import CheckSwitch from "../../../../components/Form/CheckSwitch";

const BasicDataMembership = ({ formData, onChange }) => {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const durationTypeOptions = [
    { value: MEMBERSHIP_DURATION_TYPES.DIARIA, label: "Dias" },
    { value: MEMBERSHIP_DURATION_TYPES.MENSAL, label: "Meses" },
    { value: MEMBERSHIP_DURATION_TYPES.ANUAL, label: "Anos" },
  ];

  return (
    <div>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="nameMembership">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.nameMembership]} *
            </Label>
            <Input
              id="nameMembership"
              name="nameMembership"
              type="text"
              value={formData[MEMBERSHIP_FIELDS.nameMembership] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.nameMembership, e.target.value)}
              placeholder="Ex: Plano Premium"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="value">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.value]} *
            </Label>
            <Input
              id="value"
              name="value"
              type="number"
              step="0.01"
              value={formData[MEMBERSHIP_FIELDS.value] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.value, parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="duration">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.duration]} *
            </Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              value={formData[MEMBERSHIP_FIELDS.duration] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.duration, parseInt(e.target.value) || 0)}
              placeholder="30"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="durationType">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.durationType]} *
            </Label>
            <Input
              id="durationType"
              name="durationType"
              type="select"
              value={formData[MEMBERSHIP_FIELDS.durationType] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.durationType, e.target.value)}
            >
              <option value="">Selecione...</option>
              {durationTypeOptions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="membershipType">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.membershipType]} *
            </Label>
            <Input
              id="membershipType"
              name="membershipType"
              type="select"
              value={formData[MEMBERSHIP_FIELDS.membershipType] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.membershipType, e.target.value)}
            >
              <option value="">Selecione...</option>
              {Object.values(MEMBERSHIP_TYPES).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="description">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.description]}
            </Label>
            <Input
              id="description"
              name="description"
              type="textarea"
              rows="3"
              value={formData[MEMBERSHIP_FIELDS.description] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.description, e.target.value)}
              placeholder="Descrição detalhada do plano"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="maxAmountInstallments">
              {MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.maxAmountInstallments]}
            </Label>
            <Input
              id="maxAmountInstallments"
              name="maxAmountInstallments"
              type="number"
              value={formData[MEMBERSHIP_FIELDS.maxAmountInstallments] ?? ''}
              onChange={(e) => handleChange(MEMBERSHIP_FIELDS.maxAmountInstallments, parseInt(e.target.value) || 0)}
              placeholder="12"
            />
          </FormGroup>
          <CheckSwitch
            id="inactive"
            label={MEMBERSHIP_FIELD_LABELS[MEMBERSHIP_FIELDS.inactive] || "Inativo"}
            checked={!!formData[MEMBERSHIP_FIELDS.inactive]}
            onToggle={(val) => handleChange(MEMBERSHIP_FIELDS.inactive, val)}
            className="mt-3"
          />
        </Col>
      </Row>
    </div>
  );
};

export default BasicDataMembership;
