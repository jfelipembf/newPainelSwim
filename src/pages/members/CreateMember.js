import React, { useState, useMemo, useEffect } from "react";
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createMember } from "../../store/members/actions";
import { MEMBER_INITIAL_VALUE } from "../../constants/members";

// Import tab components
import BasicDataMember from "./tabs/BasicDataMember";
import PhotoMember from "./tabs/PhotoMember";
import ContactMember from "./tabs/ContactMember";
import AddressMember from "./tabs/AddressMember";

const REQUIRED_FIELDS = ["firstName", "lastName", "email", "cellphone", "cpf", "gender", "country", "state", "city", "address", "number", "neighborhood", "zipCode"];

const CreateMember = () => {
  const dispatch = useDispatch();
  const { creating, createError, created } = useSelector((state) => state.members);

  const [activeTab, setActiveTab] = useState('1');
  const [formData, setFormData] = useState({
    basicData: {},
    contactData: {},
    addressData: {},
    photoFile: null,
    photoUrl: ''
  });

  // Set page title
  document.title = "Novo Cliente | Painel Swim";

  useEffect(() => {
    if (!created) return;
    toast.success("Membro criado com sucesso!");
  }, [created]);

  useEffect(() => {
    if (!createError) return;
    toast.error(`Erro ao criar membro: ${createError}`);
  }, [createError]);

  const combineFormData = useMemo(() => {
    return (data) => ({
      ...MEMBER_INITIAL_VALUE,
      ...data.basicData,
      ...data.contactData,
      ...data.addressData,
      photoUrl: data.photoUrl || '',
    });
  }, []);

  const completeData = useMemo(() => combineFormData(formData), [combineFormData, formData]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleBasicDataChange = (data) => {
    setFormData(prev => ({
      ...prev,
      basicData: data
    }));
  };

  const handleContactDataChange = (data) => {
    setFormData(prev => ({
      ...prev,
      contactData: data
    }));
  };

  const handleAddressDataChange = (data) => {
    setFormData(prev => ({
      ...prev,
      addressData: data
    }));
  };

  const handlePhotoChange = (file, url) => {
    setFormData(prev => ({
      ...prev,
      photoFile: file,
      photoUrl: url
    }));
  };

  const canSubmit = useMemo(() => {
    return REQUIRED_FIELDS.every((field) => {
      const value = completeData[field];
      return value !== null && value !== undefined && value.toString().trim() !== "";
    });
  }, [completeData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    dispatch(createMember({
      ...completeData,
      photoFile: formData.photoFile
    }));
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <h4 className="card-title">Novo Cliente</h4>

              <Nav tabs className="nav-tabs-custom">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => toggleTab('1')}
                  >
                    <i className="fas fa-user text-primary me-1"></i> Dados Básicos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => toggleTab('2')}
                  >
                    <i className="fas fa-camera text-primary me-1"></i> Foto
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => toggleTab('3')}
                  >
                    <i className="fas fa-phone text-primary me-1"></i> Contato
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '4' })}
                    onClick={() => toggleTab('4')}
                  >
                    <i className="fas fa-map-marker-alt text-primary me-1"></i> Endereço
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} className="mt-4">
                <TabPane tabId="1">
                  <div className="mt-4">
                    <BasicDataMember
                      initialData={formData.basicData}
                      onChange={handleBasicDataChange}
                    />
                  </div>
                </TabPane>

                <TabPane tabId="2">
                  <div className="mt-4">
                    <PhotoMember
                      onPhotoChange={handlePhotoChange}
                      currentPhotoUrl={formData.photoUrl}
                    />
                  </div>
                </TabPane>

                <TabPane tabId="3">
                  <div className="mt-4">
                    <ContactMember
                      initialData={formData.contactData}
                      onChange={handleContactDataChange}
                    />
                  </div>
                </TabPane>

                <TabPane tabId="4">
                  <div className="mt-4">
                    <AddressMember
                      initialData={formData.addressData}
                      onChange={handleAddressDataChange}
                    />
                  </div>
                </TabPane>
              </TabContent>

              {/* Botão Salvar sempre visível */}
              <div className="mt-4">
                <div className="row justify-content-end">
                  <div className="col-auto">
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                      disabled={!canSubmit || creating}
                      className="w-md"
                    >
                      {creating ? (
                        <>
                          Salvando...
                        </>
                      ) : (
                        <>
                          Criar Cliente
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CreateMember;
