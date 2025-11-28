import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

// Redux actions
import { registerUser } from '../../../store/auth/register/actions';

// Import helpers
import { getStorageHelper } from '../../../helpers/storage_helper';
import { canSubmitEmployee, getMissingRequiredFields } from '../../../utils/validation/employee';
import { EMPLOYEE_INITIAL_VALUE } from '../../../constants/employees';

// Import tab components
import BasicData from './tabs/BasicData';
import Photo from './tabs/Photo';
import Contato from './tabs/Contato';
import Adress from './tabs/Adress';

const CreateEmployee = ({ registerUser, registerLoading, registerError, registerSuccess }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [formData, setFormData] = useState({
    basicData: {},
    contactData: {},
    addressData: {},
    photoFile: null,
    photoUrl: ''
  });

  const combineFormData = useMemo(() => {
    // Centralized composition keeps payload aligned with store/Firestore layout
    return (data) => ({
      ...EMPLOYEE_INITIAL_VALUE,
      ...data.basicData,
      ...data.contactData,
      ...data.addressData,
      photoUrl: data.photoUrl || '',
    });
  }, []);

  const toggleTab = useCallback((tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }, [activeTab]);

  const handleBasicDataChange = useCallback((data) => {
    setFormData(prev => ({
      ...prev,
      basicData: data
    }));
  }, []);

  const handleContactDataChange = useCallback((data) => {
    setFormData(prev => ({
      ...prev,
      contactData: data
    }));
  }, []);

  const handleAddressDataChange = useCallback((data) => {
    setFormData(prev => ({
      ...prev,
      addressData: data
    }));
  }, []);

  const handlePhotoChange = useCallback((file, url) => {
    setFormData(prev => ({
      ...prev,
      photoFile: file,
      photoUrl: url
    }));
  }, []);

  // Toast feedbacks based on redux status
  useEffect(() => {
    if (registerSuccess) {
      toast.success('Colaborador criado com sucesso!');
    }
  }, [registerSuccess]);

  useEffect(() => {
    if (registerError) {
      toast.error(`Erro ao criar colaborador: ${registerError}`);
    }
  }, [registerError]);

  const handleSubmit = async () => {
    const completeData = combineFormData(formData);

    // Validate before submitting
    if (!canSubmit()) {
      const missingFields = getMissingRequiredFields(completeData);
      const fieldNames = {
        name: 'Nome',
        lastName: 'Sobrenome',
        cpf: 'CPF',
        birthday: 'Data de Nascimento',
        email: 'E-mail',
        cellphone: 'Telefone'
      };

      const missingNames = missingFields.map(field => fieldNames[field] || field);
      alert(`Por favor, preencha os seguintes campos obrigatórios:\n\n${missingNames.join('\n')}`);
      return;
    }

    try {
      // Primeiro, fazer upload da foto se existir
      let photoUrl = '';
      if (formData.photoFile) {
        try {
          const storageHelper = getStorageHelper();
          const uploadResult = await storageHelper.uploadPhoto(
            formData.photoFile,
            `employees/${Date.now()}_${formData.photoFile.name}`
          );
          photoUrl = uploadResult.url;
        } catch (storageError) {
          // Continue without photo, but log error for debugging
          alert('Erro ao fazer upload da foto. O colaborador será criado sem foto.');
        }
      }

      // Combinar todos os dados
      const memberData = {
        ...completeData,
        photoUrl,
        password: formData.basicData.password || 'tempPass123!', // senha temporária
        email: (completeData.email || '').trim(), // manter casing consistente no store
      };

      // Dispatch da ação Redux
      registerUser(memberData);

    } catch (error) {
      // Error will be handled by Redux and shown in UI via toast
    }
  };

  const canSubmit = () => {
    return canSubmitEmployee(combineFormData(formData));
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="card-title">Criar Novo Colaborador</h4>

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
                    <BasicData
                      initialData={formData.basicData}
                      onChange={handleBasicDataChange}
                    />
                  </div>
                </TabPane>

                <TabPane tabId="2">
                  <div className="mt-4">
                    <Photo
                      onPhotoChange={handlePhotoChange}
                      currentPhotoUrl={formData.photoUrl}
                    />
                  </div>
                </TabPane>

                <TabPane tabId="3">
                  <div className="mt-4">
                    <Contato
                      initialData={formData.contactData}
                      onChange={handleContactDataChange}
                    />
                  </div>
                </TabPane>

                <TabPane tabId="4">
                  <div className="mt-4">
                    <Adress
                      initialData={formData.addressData}
                      onChange={handleAddressDataChange}
                    />
                  </div>
                </TabPane>
              </TabContent>
              <div className="mt-4">
                <div className="row justify-content-end">
                  <div className="col-auto">
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                      disabled={!canSubmit() || registerLoading}
                      className="w-md"
                    >
                      {registerLoading ? (
                        <>
                          Salvando...
                        </>
                      ) : (
                        <>
                          Criar Colaborador
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

const mapStateToProps = (state) => ({
  registerLoading: state.register.loading,
  registerError: state.register.registrationError,
  registerSuccess: state.register.message
});

export default connect(mapStateToProps, { registerUser })(CreateEmployee);
