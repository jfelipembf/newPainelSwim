import React, { useEffect } from "react";
import { Card, CardBody, Col, Row, Button, Table, Badge, Spinner, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../../store/employees/actions";

const EmployeesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: employees, loading, error } = useSelector((state) => state.employees);

  // Set page title
  document.title = "Colaboradores | Painel Swim";

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleNewEmployee = () => {
    navigate("/admin/create-employee");
  };

  const handleView = (id) => {
    // Placeholder: ajustar quando existir página de detalhes/edição
    navigate(`/admin/create-employee?employeeId=${id}`);
  };

  const renderStatus = (active) => {
    if (active === false) return <Badge color="secondary">Inativo</Badge>;
    return <Badge color="success">Ativo</Badge>;
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
                <Row className="mb-3 align-items-center">
                  <Col>
                    <h4 className="mb-0">Colaboradores</h4>
                  </Col>
                  <Col className="text-end">
                    <Button color="primary" onClick={handleNewEmployee}>
                      <i className="fas fa-user-plus me-2" />
                      Novo colaborador
                    </Button>
                  </Col>
                </Row>

                {loading && (
                  <div className="d-flex align-items-center">
                    <Spinner size="sm" className="me-2" />
                    Carregando...
                  </div>
                )}
                {error && <div className="text-danger mb-3">{error}</div>}

                {!loading && !error && (
                  <div className="table-responsive">
                    <Table className="align-middle table-hover mb-0">
                      <thead>
                        <tr>
                          <th>Colaborador</th>
                          <th>Telefone</th>
                          <th>Cargo</th>
                          <th>Status</th>
                          <th>E-mail</th>
                          <th className="text-end">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.length === 0 && (
                          <tr>
                            <td colSpan="6" className="text-center text-muted py-4">
                              Nenhum colaborador encontrado.
                            </td>
                          </tr>
                        )}
                        {employees.map((emp) => (
                          <tr key={emp.id}>
                            <td className="d-flex align-items-center">
                              <div className="me-3">
                                <img
                                  src={
                                    emp.photoUrl ||
                                    "https://via.placeholder.com/48x48.png?text=USER"
                                  }
                                  alt={`${emp.name || ""} ${emp.lastName || ""}`}
                                  className="rounded-circle avatar-sm"
                                />
                              </div>
                              <div>
                                <div className="fw-semibold">{`${emp.name || ""} ${emp.lastName || ""}`.trim() || "Sem nome"}</div>
                              </div>
                            </td>
                            <td>{emp.cellphone || "—"}</td>
                            <td>{emp.role || "Colaborador"}</td>
                            <td>{renderStatus(emp.active)}</td>
                            <td>{emp.email || "—"}</td>
                            <td className="text-end">
                              <Button size="sm" color="info" onClick={() => handleView(emp.id)}>
                                Ver
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
    </React.Fragment>
  );
};

export default EmployeesList;
