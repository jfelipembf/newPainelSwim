import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { MEMBER_FIELD_LABELS } from "../../../constants/members";

const BasicDataMember = ({ initialData, onChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cpf: '',
    rg: '',
    gender: '',
    birthDate: '',
    active: true,
    password: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  return (
    <div>
      <h5 className="mb-4">Informações Básicas</h5>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">{MEMBER_FIELD_LABELS.firstName} *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastName">{MEMBER_FIELD_LABELS.lastName} *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="cpf">CPF *</Label>
            <Input
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="rg">RG</Label>
            <Input
              id="rg"
              name="rg"
              value={formData.rg}
              onChange={handleChange}
              placeholder="00.000.000-0"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="gender">Gênero *</Label>
            <Input
              type="select"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="birthDate">{MEMBER_FIELD_LABELS.birthDate} *</Label>
            <Input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="password">Senha Temporária</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Deixe vazio para senha automática"
            />
            <small className="text-muted">Se não informar, será gerada uma senha temporária</small>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup check className="mt-4">
            <Label check>
              <Input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
              Ativo
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default BasicDataMember;
