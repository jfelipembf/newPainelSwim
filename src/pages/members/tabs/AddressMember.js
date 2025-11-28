import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { MEMBER_FIELD_LABELS } from "../../../constants/members";

const AddressMember = ({ initialData, onChange }) => {
  const [formData, setFormData] = useState({
    country: 'Brasil',
    state: '',
    city: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    zipCode: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div>
      <h5 className="mb-4">Endereço</h5>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="country">{MEMBER_FIELD_LABELS.country} *</Label>
            <Input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="state">{MEMBER_FIELD_LABELS.state} *</Label>
            <Input
              type="select"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="city">{MEMBER_FIELD_LABELS.city} *</Label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="zipCode">{MEMBER_FIELD_LABELS.zipCode} *</Label>
            <Input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="00000-000"
              required
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <FormGroup>
            <Label for="address">{MEMBER_FIELD_LABELS.address} *</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Rua, Avenida, etc."
              required
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="number">Número *</Label>
            <Input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="123"
              required
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="neighborhood">Bairro *</Label>
            <Input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="complement">Complemento</Label>
            <Input
              type="text"
              id="complement"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              placeholder="Apto, bloco, etc."
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default AddressMember;
