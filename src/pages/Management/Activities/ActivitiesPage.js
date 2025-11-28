import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button, FormGroup, Label, Input, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ACTIVITY_FIELDS, ACTIVITY_FIELD_LABELS, ACTIVITY_DEFAULT_VALUES } from "../../../constants/activities";
import { fetchActivities, createActivity, updateActivity, deleteActivity } from "../../../store/activities/actions";
import { usePhotoUpload } from "../../../hooks/usePhotoUpload";
import { useBusy } from "../../../hooks/useBusy";
import { useUniqueToast } from "../../../hooks/useUniqueToast";
import { trimOrEmpty, numberOrZero } from "../../../utils/form";
import { resolveIsActive } from "../../../utils/status";
import AvatarCell from "../../../components/shared/AvatarCell";
import StatusBadge from "../../../components/shared/StatusBadge";
import ConfirmDeleteModal from "../../../components/shared/ConfirmDeleteModal";
import PhotoInput from "../../../components/shared/PhotoInput";

const ActivitiesPage = () => {
  const dispatch = useDispatch();
  const {
    items: activities,
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
  } = useSelector((state) => state.activities || {});

  const [formValues, setFormValues] = useState({ id: null, ...ACTIVITY_DEFAULT_VALUES });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);

  const photoUpload = usePhotoUpload("activities");
  const { fire: fireCreated } = useUniqueToast();
  const { fire: fireUpdated } = useUniqueToast();
  const { fire: fireDeleted } = useUniqueToast();

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (file) => {
    photoUpload.onSelectFile(file);
  };

  useEffect(() => {
    if (photoUpload.previewUrl) {
      handleChange(ACTIVITY_FIELDS.photo, photoUpload.previewUrl);
    }
  }, [photoUpload.previewUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const currentPhoto = formValues[ACTIVITY_FIELDS.photo];
    const isActiveValue = resolveIsActive(formValues);
    // Payload enxuto apenas com campos persistidos
    const payload = {
      [ACTIVITY_FIELDS.idActivity]: formValues[ACTIVITY_FIELDS.idActivity] || undefined,
      [ACTIVITY_FIELDS.name]: trimOrEmpty(formValues[ACTIVITY_FIELDS.name]),
      [ACTIVITY_FIELDS.description]: trimOrEmpty(formValues[ACTIVITY_FIELDS.description]),
      [ACTIVITY_FIELDS.photo]: currentPhoto || "",
      [ACTIVITY_FIELDS.color]: formValues[ACTIVITY_FIELDS.color],
      [ACTIVITY_FIELDS.isActive]: isActiveValue,
      [ACTIVITY_FIELDS.capacityDefault]: numberOrZero(formValues[ACTIVITY_FIELDS.capacityDefault]),
      [ACTIVITY_FIELDS.durationDefault]: formValues[ACTIVITY_FIELDS.durationDefault] || "00:00",
    };

    try {
      if (photoUpload.file) {
        const uploadedUrl = await photoUpload.upload();
        payload[ACTIVITY_FIELDS.photo] = uploadedUrl;
      } else {
        // Se não há novo arquivo, use a URL existente (ou limpe)
        payload[ACTIVITY_FIELDS.photo] = currentPhoto || "";
      }

      if (formValues.id) {
        dispatch(updateActivity(formValues.id, payload));
      } else {
        dispatch(createActivity(payload));
      }
    } catch (err) {
      // Não salvar blob local se upload falhar
      payload[ACTIVITY_FIELDS.photo] = "";
      toast.error("Erro ao fazer upload da foto");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (activity) => {
    const isActiveValue =
      typeof activity[ACTIVITY_FIELDS.isActive] === "boolean"
        ? activity[ACTIVITY_FIELDS.isActive]
        : true;
    setFormValues({
      id: activity.id,
      ...ACTIVITY_DEFAULT_VALUES,
      ...activity,
      [ACTIVITY_FIELDS.isActive]: isActiveValue,
    });
    photoUpload.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (activity) => {
    setActivityToDelete(activity);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (activityToDelete) {
      const id = activityToDelete.id || activityToDelete[ACTIVITY_FIELDS.idActivity];
      if (id) {
        dispatch(deleteActivity(id));
      } else {
        toast.error("ID da atividade não encontrado para exclusão.");
      }
    }
    setDeleteModal(false);
    setActivityToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModal(false);
    setActivityToDelete(null);
  };

  useEffect(() => {
    const createdId = created?.id || created?.[ACTIVITY_FIELDS.idActivity];
    if (createdId) {
      const fired = fireCreated(createdId, () => toast.success("Atividade criada com sucesso!"));
      if (fired) {
        setFormValues({ id: null, ...ACTIVITY_DEFAULT_VALUES });
        photoUpload.reset();
      }
    }
  }, [created, fireCreated, photoUpload]);

  useEffect(() => {
    const updatedId = updated?.id || updated?.[ACTIVITY_FIELDS.idActivity];
    if (updatedId) {
      const fired = fireUpdated(updatedId, () => toast.success("Atividade atualizada com sucesso!"));
      if (fired) {
        setFormValues({ id: null, ...ACTIVITY_DEFAULT_VALUES });
        photoUpload.reset();
      }
    }
  }, [updated, fireUpdated, photoUpload]);

  useEffect(() => {
    if (deletedId) {
      const fired = fireDeleted(deletedId, () => toast.success("Atividade excluída com sucesso!"));
      if (fired) dispatch(fetchActivities());
    }
  }, [deletedId, dispatch, fireDeleted]);

  useEffect(() => {
    const err = error || createError || updateError || deleteError;
    if (err) toast.error(err);
  }, [error, createError, updateError, deleteError]);

  const isBusy = useBusy(saving, creating, updating);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <h4 className="card-title mb-4">{formValues.id ? "Editar Atividade" : "Nova Atividade"}</h4>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="activityName">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.name]}</Label>
                      <Input
                        id="activityName"
                        type="text"
                        value={formValues[ACTIVITY_FIELDS.name]}
                        onChange={(e) => handleChange(ACTIVITY_FIELDS.name, e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}></Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="activityDescription">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.description]}</Label>
                      <Input
                        id="activityDescription"
                        type="textarea"
                        rows="3"
                        value={formValues[ACTIVITY_FIELDS.description]}
                        onChange={(e) => handleChange(ACTIVITY_FIELDS.description, e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="activityColor">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.color]}</Label>
                      <Input
                        id="activityColor"
                        type="color"
                        value={formValues[ACTIVITY_FIELDS.color]}
                        onChange={(e) => handleChange(ACTIVITY_FIELDS.color, e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup check className="mt-2">
                      <Input
                        type="checkbox"
                        id="activityActive"
                        checked={
                          typeof formValues[ACTIVITY_FIELDS.isActive] === "boolean"
                            ? formValues[ACTIVITY_FIELDS.isActive]
                            : true
                        }
                        onChange={(e) => {
                          handleChange(ACTIVITY_FIELDS.isActive, e.target.checked);
                        }}
                      />
                      <Label className="form-check-label" for="activityActive">
                        {ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.isActive]}
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="activityCapacity">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.capacityDefault]}</Label>
                      <Input
                        id="activityCapacity"
                        type="number"
                        min="0"
                        value={formValues[ACTIVITY_FIELDS.capacityDefault]}
                        onChange={(e) => handleChange(ACTIVITY_FIELDS.capacityDefault, e.target.value)}
                        placeholder="Ex: 20"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="activityDuration">{ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.durationDefault]}</Label>
                      <Input
                        id="activityDuration"
                        type="time"
                        value={formValues[ACTIVITY_FIELDS.durationDefault]}
                        onChange={(e) => handleChange(ACTIVITY_FIELDS.durationDefault, e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <PhotoInput
                      id="activityPhoto"
                      label={ACTIVITY_FIELD_LABELS[ACTIVITY_FIELDS.photo]}
                      onSelect={handlePhotoChange}
                      previewUrl={photoUpload.previewUrl || formValues[ACTIVITY_FIELDS.photo]}
                    />
                  </Col>
                </Row>

                <Button color="primary" type="submit" disabled={isBusy}>
                  {isBusy ? (
                    <>
                      <i className="fas fa-spinner fa-spin me-1" aria-hidden="true"></i>
                      Salvando...
                    </>
                  ) : formValues.id ? (
                    "Atualizar Atividade"
                  ) : (
                    "Criar Atividade"
                  )}
                </Button>
                {formValues.id && (
                  <Button
                    type="button"
                    color="secondary"
                    className="ms-2"
                    onClick={() => {
                      setFormValues({ id: null, ...ACTIVITY_DEFAULT_VALUES });
                      photoUpload.reset();
                    }}
                  >
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
                <h4 className="card-title">Atividades</h4>
              </div>
              {loading ? (
                <div className="text-center">
                  <i className="fas fa-spinner fa-spin fa-2x"></i>
                  <p className="mt-2">Carregando atividades...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table table-centered table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Status</th>
                        <th>Cor</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities && activities.length > 0 ? (
                        activities.map((activity) => {
                          const hasIsActive = Object.prototype.hasOwnProperty.call(activity, ACTIVITY_FIELDS.isActive);
                          const rawActive = hasIsActive ? activity[ACTIVITY_FIELDS.isActive] : undefined;
                          const isActive =
                            typeof rawActive === "boolean"
                              ? rawActive
                              : !Boolean(activity[ACTIVITY_FIELDS.inactive]);
                          const isInactive = !isActive;
                          return (
                          <tr key={activity.id}>
                            <td>
                              <AvatarCell
                                src={activity[ACTIVITY_FIELDS.photo]}
                                alt={activity[ACTIVITY_FIELDS.name]}
                              />
                            </td>
                            <td>{activity[ACTIVITY_FIELDS.name]}</td>
                            <td>
                              <StatusBadge active={!isInactive} />
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "4px",
                                    backgroundColor: activity[ACTIVITY_FIELDS.color] || "#ccc",
                                    border: "1px solid #ddd",
                                    marginRight: "8px"
                                  }}
                                />
                              </div>
                            </td>
                            <td>
                              <Button
                                color="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(activity)}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                color="outline-danger"
                                size="sm"
                                onClick={() => openDeleteModal(activity)}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        )})
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">Nenhuma atividade cadastrada</td>
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

      <ConfirmDeleteModal
        isOpen={deleteModal}
        toggle={cancelDelete}
        onConfirm={confirmDelete}
        itemName={activityToDelete?.[ACTIVITY_FIELDS.name] || "esta atividade"}
        loading={deleting}
      />
    </React.Fragment>
  );
};

export default ActivitiesPage;
