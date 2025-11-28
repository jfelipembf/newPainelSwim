import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { MEMBER_FIELD_LABELS } from "../../../constants/members";

const ContactMember = ({ initialData, onChange }) => {
  const [formData, setFormData] = useState({
    cellphone: '',
    email: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmergencyChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value
      }
    }));
  };

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  return (
    <div>
      <h5 className="mb-4">Informações de Contato</h5>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="cellphone">Celular *</Label>
            <Input
              type="tel"
              id="cellphone"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="email">{MEMBER_FIELD_LABELS.email} *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
              required
            />
          </FormGroup>
        </Col>
      </Row>

      <hr className="my-4" />
      <h6 className="mb-3">Contato de Emergência</h6>

      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="emergencyName">Nome</Label>
            <Input
              type="text"
              id="emergencyName"
              name="name"
              value={formData.emergencyContact.name}
              onChange={handleEmergencyChange}
              placeholder="Nome completo"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="emergencyPhone">Telefone</Label>
            <Input
              type="tel"
              id="emergencyPhone"
              name="phone"
              value={formData.emergencyContact.phone}
              onChange={handleEmergencyChange}
              placeholder="(00) 00000-0000"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="emergencyRelationship">Parentesco</Label>
            <Input
              type="select"
              id="emergencyRelationship"
              name="relationship"
              value={formData.emergencyContact.relationship}
              onChange={handleEmergencyChange}
            >
              <option value="">Selecione...</option>
              <option value="pai">Pai</option>
              <option value="mae">Mãe</option>
              <option value="conjuge">Cônjuge</option>
              <option value="filho">Filho(a)</option>
              <option value="irmao">Irmão(ã)</option>
              <option value="outro">Outro</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ContactMember;
