import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmDeleteModal = ({ isOpen, toggle, onConfirm, itemName, loading }) => (
  <Modal isOpen={isOpen} toggle={toggle} centered>
    <ModalHeader toggle={toggle}>
      <i className="fas fa-exclamation-triangle text-warning me-2"></i>
      Confirmar Exclusão
    </ModalHeader>
    <ModalBody>
      Deseja excluir <strong>{itemName}</strong>?
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggle} disabled={loading}>
        Cancelar
      </Button>
      <Button color="danger" onClick={onConfirm} disabled={loading}>
        {loading ? "Excluindo..." : "Excluir"}
      </Button>
    </ModalFooter>
  </Modal>
);

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemName: PropTypes.string,
  loading: PropTypes.bool,
};

export default ConfirmDeleteModal;
