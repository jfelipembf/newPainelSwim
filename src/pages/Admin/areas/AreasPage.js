import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Table, Button, FormGroup, Label, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreas, createArea, updateArea, deleteArea } from "../../../store/areas/actions";
import { toast } from "react-toastify";
import AvatarCell from "../../../components/shared/AvatarCell";
import ConfirmDeleteModal from "../../../components/shared/ConfirmDeleteModal";
import PhotoInput from "../../../components/shared/PhotoInput";
import { usePhotoUpload } from "../../../hooks/usePhotoUpload";
import { useBusy } from "../../../hooks/useBusy";
import { useUniqueToast } from "../../../hooks/useUniqueToast";
import { trimOrEmpty, numberOrZero } from "../../../utils/form";

const AreasPage = () => {
  const dispatch = useDispatch();
  const { items: areas, loading, creating, updating, deleting, createError, updateError, deleteError, created, updated, deleted: deletedId } = useSelector(state => state.areas || {});
  const photoUpload = usePhotoUpload("areas");
  const { fire: fireCreated } = useUniqueToast();
  const { fire: fireUpdated } = useUniqueToast();
  const { fire: fireDeleted } = useUniqueToast();
  const isBusy = useBusy(creating, updating);

  const emptyForm = {
    id: null,
    idArea: "",
    name: "",
    width: "",
    length: "",
    maxCapacity: "",
    photoUrl: "",
  };

  const [formValues, setFormValues] = useState(emptyForm);
  const [deleteModal, setDeleteModal] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = async (file) => {
    photoUpload.onSelectFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      idArea: formValues.idArea || formValues.id || "",
      name: trimOrEmpty(formValues.name),
      width: numberOrZero(formValues.width),
      length: numberOrZero(formValues.length),
      maxCapacity: numberOrZero(formValues.maxCapacity),
      photoUrl: formValues.photoUrl || "",
    };

    if (photoUpload.file) {
      photoUpload.upload().then((url) => {
        const finalPayload = { ...payload, photoUrl: url || "" };
        if (formValues.id) {
          dispatch(updateArea(formValues.id, finalPayload));
        } else {
          dispatch(createArea(finalPayload));
        }
        setFormValues(emptyForm);
        photoUpload.reset();
      }).catch(() => {
        toast.error("Erro ao fazer upload da foto");
      });
      return;
    }

    if (formValues.id) {
      dispatch(updateArea(formValues.id, payload));
    } else {
      dispatch(createArea(payload));
    }
    setFormValues(emptyForm);
    photoUpload.reset();
  };

  // Feedbacks via toast
  useEffect(() => {
    if (created) {
      fireCreated(created.id || created.idArea, () => toast.success("Área criada com sucesso!"));
    }
  }, [created, fireCreated]);

  useEffect(() => {
    if (updated) {
      fireUpdated(updated.id || updated.idArea, () => toast.success("Área atualizada com sucesso!"));
      setFormValues(emptyForm);
      photoUpload.reset();
    }
  }, [updated, fireUpdated, photoUpload]);

  useEffect(() => {
    if (deletedId) {
      fireDeleted(deletedId, () => toast.success("Área excluída com sucesso!"));
    }
  }, [deletedId, fireDeleted]);

  useEffect(() => {
    const error = createError || updateError || deleteError;
    if (error) {
      toast.error(error);
    }
  }, [createError, updateError, deleteError]);

  const handleEdit = (area) => {
    setFormValues({
      id: area.id,
      idArea: area.idArea || area.id || "",
      name: area.name || "",
      width: area.width || "",
      length: area.length || "",
      maxCapacity: area.maxCapacity || "",
      photoUrl: area.photoUrl || "",
    });
    photoUpload.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (area) => {
    setAreaToDelete(area);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (areaToDelete) {
      dispatch(deleteArea(areaToDelete.id));
    }
    setDeleteModal(false);
    setAreaToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModal(false);
    setAreaToDelete(null);
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <h4 className="card-title mb-4">{formValues.id ? "Editar Área" : "Nova Área"}</h4>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="areaName">Nome</Label>
                      <Input
                        id="areaName"
                        type="text"
                        value={formValues.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Ex: Sala de Spinning"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                <PhotoInput
                  id="areaPhoto"
                  label="Foto"
                  onSelect={(file) => handlePhotoChange(file)}
                  previewUrl={photoUpload.previewUrl || formValues.photoUrl}
                />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="width">Largura (m)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={formValues.width}
                        onChange={(e) => handleChange("width", e.target.value)}
                        placeholder="Ex: 10"
                        min="0"
                        step="0.1"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="length">Comprimento (m)</Label>
                      <Input
                        id="length"
                        type="number"
                        value={formValues.length}
                        onChange={(e) => handleChange("length", e.target.value)}
                        placeholder="Ex: 20"
                        min="0"
                        step="0.1"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="maxCapacity">Capacidade máxima</Label>
                      <Input
                        id="maxCapacity"
                        type="number"
                        value={formValues.maxCapacity}
                        onChange={(e) => handleChange("maxCapacity", e.target.value)}
                        placeholder="Ex: 30"
                        min="0"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {(createError || updateError) && (
                  <div className="text-danger mb-2">{createError || updateError}</div>
                )}
                <Button color="primary" type="submit" disabled={isBusy}>
                  {isBusy ? "Salvando..." : formValues.id ? "Atualizar Área" : "Criar Área"}
                </Button>
                {formValues.id && (
                  <Button color="secondary" type="button" className="ms-2" onClick={() => setFormValues(emptyForm)}>
                    Cancelar edição
                  </Button>
                )}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="card-title">Áreas</h4>
                {/* Botão de nova área removido por solicitação */}
              </div>

              {loading ? (
                <div className="text-center">
                  <i className="fas fa-spinner fa-spin fa-2x"></i>
                  <p className="mt-2">Carregando áreas...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table table-centered table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Dimensões (L x C)</th>
                        <th>Capacidade Máxima</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {areas && areas.length > 0 ? (
                        areas.map((area) => (
                          <tr key={area.id}>
                            <td>
                              <AvatarCell src={area.photoUrl} alt={area.name} />
                            </td>
                            <td>{area.name}</td>
                            <td>{area.width || 0}m x {area.length || 0}m</td>
                            <td>{area.maxCapacity || 0}</td>
                            <td>
                              <Button color="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(area)}>
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button color="outline-danger" size="sm" onClick={() => openDeleteModal(area)}>
                                <i className="fas fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">Nenhuma área cadastrada</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
              {(deleteError || createError || updateError) && (
                <div className="text-danger mt-2">
                  {deleteError || createError || updateError}
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <ConfirmDeleteModal
        isOpen={deleteModal}
        toggle={cancelDelete}
        onConfirm={confirmDelete}
        itemName={areaToDelete?.name || "esta área"}
        loading={deleting}
      />
    </React.Fragment>
  );
};

export default AreasPage;
