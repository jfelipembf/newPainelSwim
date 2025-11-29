import React, { useEffect } from "react";
import { Card, CardBody, Col, Row, Button, Table, Badge, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../store/members/actions";

const MembersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: members, loading, error } = useSelector((state) => state.members);

  // Set page title
  document.title = "Clientes | Painel Swim";

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleNewMember = () => navigate("/admin/create-member");
  const handleView = (member) => {
    navigate(`/members/${member.id}`, { state: { member } });
  };

  const renderStatus = (membershipStatus) => {
    if (!membershipStatus) return <Badge color="secondary">Sem contrato</Badge>;
    return <Badge color="success">{membershipStatus}</Badge>;
  };

  const renderPhone = (member) => {
    if (member.phone) return member.phone;
    if (member.contacts && member.contacts.length > 0) {
      return member.contacts[0].description || member.contacts[0].phone || "—";
    }
    return "—";
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
              <CardBody>
                <Row className="mb-3 align-items-center">
                  <Col>
                    <h4 className="mb-0">Clientes</h4>
                  </Col>
                  <Col className="text-end">
                    <Button color="primary" onClick={handleNewMember}>
                      <i className="fas fa-user-plus me-2" />
                      Novo cliente
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
                          <th>Cliente</th>
                          <th>Telefone</th>
                          <th>Status</th>
                          <th>E-mail</th>
                          <th className="text-end">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center text-muted py-4">
                              Nenhum cliente encontrado.
                            </td>
                          </tr>
                        )}
                        {members.map((member) => (
                          <tr key={member.id}>
                            <td className="d-flex align-items-center">
                              <div className="me-3">
                                <img
                                  src={
                                    member.photoUrl ||
                                    "https://via.placeholder.com/48x48.png?text=USER"
                                  }
                                  alt={`${member.firstName || ""} ${member.lastName || ""}`}
                                  className="rounded-circle avatar-sm"
                                />
                              </div>
                              <div>
                                <div className="fw-semibold">
                                  {`${member.firstName || ""} ${member.lastName || ""}`.trim() || "Sem nome"}
                                </div>
                              </div>
                            </td>
                            <td>{renderPhone(member)}</td>
                            <td>{renderStatus(member.membershipStatus)}</td>
                            <td>{member.email || "—"}</td>
                            <td className="text-end">
                              <Button size="sm" color="info" onClick={() => handleView(member)}>
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

export default MembersList;
