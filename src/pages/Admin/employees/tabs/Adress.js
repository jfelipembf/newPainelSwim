import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const Adress = ({ initialData = {}, onChange }) => {
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
    setFormData(prev => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Address Data:', formData);
  };

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div>
      <h5 className="mb-4">Endereço</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="country">País *</Label>
              <Input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="state">Estado *</Label>
              <Input
                type="select"
                name="state"
                id="state"
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
              <Label for="city">Cidade *</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="zipCode">CEP *</Label>
              <Input
                type="text"
                name="zipCode"
                id="zipCode"
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
              <Label for="address">Endereço *</Label>
              <Input
                type="text"
                name="address"
                id="address"
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
                name="number"
                id="number"
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
                name="neighborhood"
                id="neighborhood"
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
                name="complement"
                id="complement"
                value={formData.complement}
                onChange={handleChange}
                placeholder="Apto, bloco, etc."
              />
            </FormGroup>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default Adress;
