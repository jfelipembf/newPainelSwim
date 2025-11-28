import React, { useState, useMemo, useEffect } from "react";
import { Row, Col, Card, CardBody, Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { createMembership, updateMembership } from "../../../store/memberships/actions";
import { MEMBERSHIP_FIELDS, MEMBERSHIP_DEFAULT_VALUES } from "../../../constants/membership";
import { toast } from "react-toastify";

// Import tab components
import { BasicDataMembership, AccessLimitationsMembership, CancellationRulesMembership } from "./tabs";

const CreateMembership = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { creating, created, createError, updating, updated, updateError } = useSelector(state => state.memberships);

  const isEditMode = location.state?.isEdit || false;
  const membershipToEdit = location.state?.membership || null;

  const [activeTab, setActiveTab] = useState('1');
  const [formData, setFormData] = useState({
    basicData: { ...MEMBERSHIP_DEFAULT_VALUES },
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleBasicDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      basicData: {
        ...prev.basicData,
        [field]: value
      }
    }));
  };

  const handleEntriesChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      basicData: {
        ...prev.basicData,
        [MEMBERSHIP_FIELDS.entries]: {
          ...prev.basicData[MEMBERSHIP_FIELDS.entries],
          [field]: value
        }
      }
    }));
  };

  const completeData = useMemo(() => {
    return {
      ...formData.basicData,
    };
  }, [formData]);

  // Preencher dados no modo edição
  useEffect(() => {
    if (isEditMode && membershipToEdit) {
      setFormData({
        basicData: {
          ...MEMBERSHIP_DEFAULT_VALUES,
          ...membershipToEdit,
          [MEMBERSHIP_FIELDS.entries]: {
            ...MEMBERSHIP_DEFAULT_VALUES[MEMBERSHIP_FIELDS.entries],
            ...(membershipToEdit[MEMBERSHIP_FIELDS.entries] || {})
          }
        }
      });
    }
  }, [isEditMode, membershipToEdit]);

  const canSubmit = useMemo(() => {
    const requiredFields = ['nameMembership', 'value', 'duration', 'durationType', 'membershipType'];
    return requiredFields.every((field) => {
      const value = completeData[field];
      return value !== null && value !== undefined && value.toString().trim() !== "";
    });
  }, [completeData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const payload = {
      ...MEMBERSHIP_DEFAULT_VALUES,
      ...completeData,
      [MEMBERSHIP_FIELDS.entries]: {
        ...MEMBERSHIP_DEFAULT_VALUES[MEMBERSHIP_FIELDS.entries],
        ...(completeData[MEMBERSHIP_FIELDS.entries] || {})
      }
    };

    if (isEditMode && membershipToEdit?.id) {
      dispatch(updateMembership(membershipToEdit.id, payload));
    } else {
      dispatch(createMembership(payload));
    }
  };

  useEffect(() => {
    if (created || updated) {
      const msg = isEditMode ? "Plano atualizado com sucesso!" : "Plano criado com sucesso!";
      toast.success(msg);
      navigate("/admin/memberships");
    }
  }, [created, updated, isEditMode, navigate]);

  useEffect(() => {
    const error = createError || updateError;
    if (error) {
      const msg = isEditMode ? `Erro ao atualizar plano: ${error}` : `Erro ao criar plano: ${error}`;
      toast.error(msg);
    }
  }, [createError, updateError, isEditMode]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <h4 className="card-title">Novo Plano</h4>

              <Nav tabs className="nav-tabs-custom">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => toggleTab('1')}
                  >
                    <i className="fas fa-info-circle text-primary me-1"></i> Dados Básicos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => toggleTab('2')}
                  >
                    <i className="fas fa-clock text-primary me-1"></i> Limitações de Acesso
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => toggleTab('3')}
                  >
                    <i className="fas fa-ban text-danger me-1"></i> Regras de Cancelamento
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} className="mt-4">
                <TabPane tabId="1">
                  <div className="mt-4">
                    <BasicDataMembership
                      formData={formData.basicData}
                      onChange={handleBasicDataChange}
                    />
                  </div>
                </TabPane>

                <TabPane tabId="2">
                  <div className="mt-4">
                    <AccessLimitationsMembership
                      formData={formData.basicData}
                      onChange={handleBasicDataChange}
                      onEntriesChange={handleEntriesChange}
                    />
                  </div>
                </TabPane>

                <TabPane tabId="3">
                  <div className="mt-4">
                    <CancellationRulesMembership
                      formData={formData.basicData}
                      onChange={handleBasicDataChange}
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
                      disabled={!canSubmit || creating || updating}
                      className="w-md"
                    >
                      {creating || updating ? (
                        <>
                          {isEditMode ? "Atualizando..." : "Salvando..."}
                        </>
                      ) : (
                        <>
                          {isEditMode ? "Atualizar Plano" : "Criar Plano"}
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

export default CreateMembership;
