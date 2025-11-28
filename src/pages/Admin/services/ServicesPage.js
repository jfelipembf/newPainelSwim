import React, { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  SERVICE_FIELDS,
  SERVICE_FIELD_LABELS,
  SERVICE_DEFAULT_VALUES,
} from "../../../constants/services";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../../../store/services/actions";
import { trimOrEmpty, numberOrZero } from "../../../utils/form";
import { usePhotoUpload } from "../../../hooks/usePhotoUpload";
import { useUniqueToast } from "../../../hooks/useUniqueToast";
import { useBusy } from "../../../hooks/useBusy";
import AvatarCell from "../../../components/shared/AvatarCell";
import PhotoInput from "../../../components/shared/PhotoInput";
import ConfirmDeleteModal from "../../../components/shared/ConfirmDeleteModal";

const resolveId = (item) => item?.id || item?.[SERVICE_FIELDS.idService] || item?._id || null;

const ServicesPage = () => {
  const dispatch = useDispatch();
  const {
    items: services,
    loading,
    creating,
    updating,
    deleting,
    created,
    updated,
    deletedId,
    error,
    createError,
    updateError,
    deleteError,
  } = useSelector((state) => state.services || {});

  const [formValues, setFormValues] = useState({ id: null, ...SERVICE_DEFAULT_VALUES });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const photoUpload = usePhotoUpload("services");
  const { fire: fireCreated } = useUniqueToast();
  const { fire: fireUpdated } = useUniqueToast();
  const { fire: fireDeleted } = useUniqueToast();
  const isBusy = useBusy(creating, updating);
  const [saving, setSaving] = useState(false);

  const isButtonDisabled = saving || isBusy;

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (photoUpload.previewUrl) {
      setFormValues((prev) => ({ ...prev, photoUrl: photoUpload.previewUrl }));
    }
  }, [photoUpload.previewUrl]);

  useEffect(() => {
    const sid = resolveId(created);
    if (sid) {
      fireCreated(sid, () => toast.success("Serviço criado com sucesso!"));
      resetForm();
      setSaving(false);
    }
  }, [created, fireCreated]);

  useEffect(() => {
    const sid = resolveId(updated);
    if (sid) {
      fireUpdated(sid, () => toast.success("Serviço atualizado com sucesso!"));
      resetForm();
      setSaving(false);
    }
  }, [updated, fireUpdated]);

  useEffect(() => {
    if (deletedId) {
      fireDeleted(deletedId, () => toast.success("Serviço excluído com sucesso!"));
    }
  }, [deletedId, fireDeleted]);

  useEffect(() => {
    const err = error || createError || updateError || deleteError;
    if (err) {
      toast.error(err);
    }
  }, [error, createError, updateError, deleteError]);

  const resetForm = () => {
    setFormValues({ id: null, ...SERVICE_DEFAULT_VALUES });
    photoUpload.reset();
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      [SERVICE_FIELDS.idService]: formValues[SERVICE_FIELDS.idService] || undefined,
      [SERVICE_FIELDS.nameService]: trimOrEmpty(formValues[SERVICE_FIELDS.nameService]),
      [SERVICE_FIELDS.value]: numberOrZero(formValues[SERVICE_FIELDS.value]),
      [SERVICE_FIELDS.isActive]: Boolean(formValues[SERVICE_FIELDS.isActive]),
      [SERVICE_FIELDS.onlineSalesObservations]: trimOrEmpty(formValues[SERVICE_FIELDS.onlineSalesObservations]),
      photoUrl: formValues.photoUrl || "",
    };

    try {
      if (photoUpload.file) {
        const uploadedUrl = await photoUpload.upload();
        payload.photoUrl = uploadedUrl || "";
      }

      const currentId = formValues.id;
      if (currentId) {
        dispatch(updateService(currentId, payload));
      } else {
        dispatch(createService(payload));
      }
    } catch (uploadErr) {
      setSaving(false);
      toast.error("Erro ao enviar a foto do serviço");
    }
  };

  const handleEdit = (service) => {
    setFormValues({
      id: service.id,
      ...SERVICE_DEFAULT_VALUES,
      ...service,
      [SERVICE_FIELDS.idService]: service[SERVICE_FIELDS.idService] || service.id,
    });
    photoUpload.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (service) => {
    setDeleteTarget(service);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const confirmDelete = () => {
    const id = resolveId(deleteTarget);
    if (!id) {
      toast.error("Não foi possível identificar o serviço para exclusão");
      return;
    }
    dispatch(deleteService(id));
    closeDeleteModal();
  };

  const tableRows = useMemo(() => {
    if (!services || services.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center py-4">
            Nenhum serviço cadastrado
          </td>
        </tr>
      );
    }

    return services.map((service) => {
      const sid = resolveId(service);
      return (
        <tr key={sid || service.id}>
          <td>
            <AvatarCell src={service.photoUrl} alt={service[SERVICE_FIELDS.nameService]} />
          </td>
          <td>
            <div className="fw-bold">{service[SERVICE_FIELDS.nameService] || "-"}</div>
            <div className="text-muted small">
              {service[SERVICE_FIELDS.onlineSalesObservations] || "Sem observações"}
            </div>
          </td>
          <td>R$ {numberOrZero(service[SERVICE_FIELDS.value]).toFixed(2)}</td>
          <td>
            <span className={`badge ${service[SERVICE_FIELDS.isActive] ? 'bg-success' : 'bg-danger'}`}>
              {service[SERVICE_FIELDS.isActive] ? 'Ativo' : 'Inativo'}
            </span>
          </td>
          <td className="text-end">
            <Button
              color="outline-primary"
              size="sm"
              className="me-2"
              onClick={() => handleEdit(service)}
            >
              <i className="fas fa-edit" />
            </Button>
            <Button
              color="outline-danger"
              size="sm"
              onClick={() => openDeleteModal(service)}
            >
              <i className="fas fa-trash" />
            </Button>
          </td>
        </tr>
      );
    });
  }, [services]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <h4 className="card-title mb-4">
                {formValues.id ? "Editar Serviço" : "Novo Serviço"}
              </h4>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="serviceName">{SERVICE_FIELD_LABELS[SERVICE_FIELDS.nameService]}</Label>
                      <Input
                        id="serviceName"
                        type="text"
                        value={formValues[SERVICE_FIELDS.nameService]}
                        onChange={(e) => handleChange(SERVICE_FIELDS.nameService, e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <PhotoInput
                      id="servicePhoto"
                      label="Foto do Serviço"
                      onSelect={photoUpload.onSelectFile}
                      previewUrl={photoUpload.previewUrl || formValues.photoUrl}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="serviceValue">{SERVICE_FIELD_LABELS[SERVICE_FIELDS.value]}</Label>
                      <Input
                        id="serviceValue"
                        type="number"
                        step="0.01"
                        value={formValues[SERVICE_FIELDS.value]}
                        onChange={(e) => handleChange(SERVICE_FIELDS.value, e.target.value)}
                        min="0"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="serviceIsActive">{SERVICE_FIELD_LABELS[SERVICE_FIELDS.isActive]}</Label>
                      <div className="form-check">
                        <Input
                          id="serviceIsActive"
                          type="checkbox"
                          checked={formValues[SERVICE_FIELDS.isActive]}
                          onChange={(e) => handleChange(SERVICE_FIELDS.isActive, e.target.checked)}
                        />
                        <Label for="serviceIsActive" className="form-check-label">
                          Serviço ativo
                        </Label>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label htmlFor="serviceObservations">{SERVICE_FIELD_LABELS[SERVICE_FIELDS.onlineSalesObservations]}</Label>
                      <Input
                        id="serviceObservations"
                        type="textarea"
                        rows="3"
                        value={formValues[SERVICE_FIELDS.onlineSalesObservations]}
                        onChange={(e) => handleChange(SERVICE_FIELDS.onlineSalesObservations, e.target.value)}
                        placeholder="Observações para vendas online..."
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="d-flex align-items-center mt-3">
                  <Button color="primary" type="submit" disabled={isButtonDisabled}>
                    {saving || isBusy ? "Salvando..." : formValues.id ? "Atualizar Serviço" : "Criar Serviço"}
                  </Button>
                  {formValues.id && (
                    <Button color="secondary" type="button" className="ms-2" onClick={resetForm}>
                      Cancelar edição
                    </Button>
                  )}
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="card-title mb-0">Serviços</h4>
                <Button color="success" onClick={resetForm}>
                  Novo Serviço
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <i className="fas fa-spinner fa-spin fa-2x" />
                  <p className="mt-2">Carregando serviços...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table table-centered table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th>Foto</th>
                        <th>Serviço</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th className="text-end">Ações</th>
                      </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                  </Table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        toggle={closeDeleteModal}
        onConfirm={confirmDelete}
        loading={deleting}
        itemName={deleteTarget?.[SERVICE_FIELDS.nameService] || "este serviço"}
      />
    </React.Fragment>
  );
};

export default ServicesPage;
