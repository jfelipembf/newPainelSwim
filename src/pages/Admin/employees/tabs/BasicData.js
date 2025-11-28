import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const BasicData = ({ initialData = {}, onChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    cpf: '',
    rg: '',
    gender: '',
    birthday: '',
    active: true,
    password: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => {
      return { ...prev, [name]: newValue };
    });
  };

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Basic Data:', formData);
  };

  return (
    <div>
      <h5 className="mb-4">Informações Básicas</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Nome *</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName">Sobrenome *</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
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
                type="text"
                name="cpf"
                id="cpf"
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
                type="text"
                name="rg"
                id="rg"
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
                name="gender"
                id="gender"
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
              <Label for="birthday">Data de Nascimento *</Label>
              <Input
                type="date"
                name="birthday"
                id="birthday"
                value={formData.birthday}
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
                name="password"
                id="password"
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
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />
                Ativo
              </Label>
            </FormGroup>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default BasicData;
