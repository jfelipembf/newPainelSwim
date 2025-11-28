import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMemberships, deleteMembership } from "../../../store/memberships/actions";

const MembershipsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: memberships, loading, deleting } = useSelector(state => state.memberships);

  const [deleteModal, setDeleteModal] = useState(false);
  const [membershipToDelete, setMembershipToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchMemberships());
  }, [dispatch]);

  const handleEdit = (membership) => {
    navigate('/admin/create-membership', { state: { membership, isEdit: true } });
  };

  const handleDelete = (membership) => {
    setMembershipToDelete(membership);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (membershipToDelete) {
      dispatch(deleteMembership(membershipToDelete.id));
      setDeleteModal(false);
      setMembershipToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModal(false);
    setMembershipToDelete(null);
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title">Planos</h4>
                <Button color="primary" onClick={() => navigate('/admin/create-membership')}>
                  <i className="fas fa-plus me-1"></i> Novo Plano
                </Button>
              </div>

              {loading ? (
                <div className="text-center">
                  <i className="fas fa-spinner fa-spin fa-2x"></i>
                  <p className="mt-2">Carregando planos...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table table-centered table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th>Nome do Plano</th>
                        <th>Valor</th>
                        <th>Duração</th>
                        <th>Tipo</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberships && memberships.length > 0 ? (
                        memberships.map((membership) => (
                          <tr key={membership.id}>
                            <td>{membership.nameMembership}</td>
                            <td>R$ {membership.value?.toFixed(2)}</td>
                            <td>{membership.duration} {membership.durationType?.toLowerCase()}</td>
                            <td>{membership.membershipType}</td>
                            <td>
                              <span className={`badge badge-${membership.inactive ? 'danger' : 'success'}`}>
                                {membership.inactive ? 'Inativo' : 'Ativo'}
                              </span>
                            </td>
                            <td>
                              <Button
                                color="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(membership)}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                color="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(membership)}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            Nenhum plano encontrado
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modal de Confirmação de Exclusão */}
      <Modal isOpen={deleteModal} toggle={cancelDelete} centered>
        <ModalHeader toggle={cancelDelete}>
          <i className="fas fa-exclamation-triangle text-warning me-2"></i>
          Confirmar Exclusão
        </ModalHeader>
        <ModalBody>
          <p className="mb-0">
            Tem certeza que deseja excluir o plano <strong>"{membershipToDelete?.nameMembership}"</strong>?
          </p>
          <small className="text-muted">
            Esta ação não pode ser desfeita.
          </small>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={cancelDelete} disabled={deleting}>
            Cancelar
          </Button>
          <Button color="danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? (
              <>
                <i className="fas fa-spinner fa-spin me-1"></i>
                Excluindo...
              </>
            ) : (
              <>
                <i className="fas fa-trash me-1"></i>
                Excluir
              </>
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default MembershipsList;
