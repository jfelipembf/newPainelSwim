import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../../../store/activities/actions";
import { ACTIVITY_DEFAULT_VALUES, ACTIVITY_FIELDS } from "../../../constants/activities/activities";
import { usePhotoUpload } from "../../../hooks/usePhotoUpload";
import ActivitiesForm from "./components/ActivitiesForm";
import ActivitiesList from "./components/ActivitiesList";
import ConfirmDeleteModal from "../../../components/shared/ConfirmDeleteModal";

const ActivitiesPage = () => {
  const dispatch = useDispatch();
  const { items, loading, creating, updating, deleting, created, updated, deletedId, error } =
    useSelector((state) => state.activities || {});

  const [formValues, setFormValues] = useState({ ...ACTIVITY_DEFAULT_VALUES });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const wasEditingRef = useRef(false);
  const {
    file: photoFile,
    previewUrl: photoPreview,
    onSelectFile,
    upload: uploadPhoto,
    reset: resetPhoto,
  } = usePhotoUpload("activities");

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  useEffect(() => {
    if (created || updated) {
      setFormValues({ ...ACTIVITY_DEFAULT_VALUES });
      setEditingId(null);
      resetPhoto();
      dispatch(fetchActivities());
      toast.success(wasEditingRef.current ? "Atividade atualizada com sucesso" : "Atividade criada com sucesso");
      wasEditingRef.current = false;
      setIsSubmitting(false);
    }
  }, [created, updated, dispatch, resetPhoto]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setIsSubmitting(false);
    }
  }, [error]);

  useEffect(() => {
    if (deletedId) {
      setActivityToDelete(null);
      setDeleteModalOpen(false);
      dispatch(fetchActivities());
    }
  }, [deletedId, dispatch, resetPhoto]);

  const handleChange = useCallback((field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault?.();
      if (creating || updating || isSubmitting) return;
      const payload = { ...formValues };
      try {
        setIsSubmitting(true);
        wasEditingRef.current = !!editingId;
        if (photoFile) {
          const uploadedUrl = await uploadPhoto();
          payload[ACTIVITY_FIELDS.photo] = uploadedUrl;
        }
        if (editingId) {
          dispatch(updateActivity(editingId, payload));
        } else {
          dispatch(createActivity(payload));
        }
      } catch (uploadError) {
        toast.error(uploadError.message || "Erro ao salvar atividade");
        setIsSubmitting(false);
      }
    },
    [dispatch, editingId, formValues, photoFile, uploadPhoto, creating, updating, isSubmitting]
  );

  const handleEdit = useCallback(
    (activity) => {
      setEditingId(activity.id || activity[ACTIVITY_FIELDS.idActivity]);
      setFormValues({
        ...ACTIVITY_DEFAULT_VALUES,
        ...activity,
      });
      resetPhoto();
    },
    [resetPhoto]
  );

  const handleDelete = useCallback((activity) => {
    const id = activity.id || activity[ACTIVITY_FIELDS.idActivity];
    if (!id) return;
    setActivityToDelete({ ...activity, id });
    setDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!activityToDelete?.id) return;
    dispatch(deleteActivity(activityToDelete.id));
  }, [activityToDelete, dispatch]);

  const cancelDelete = useCallback(() => {
    setDeleteModalOpen(false);
    setActivityToDelete(null);
  }, []);

  const busy = useMemo(() => loading || creating || updating || deleting, [loading, creating, updating, deleting]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <CardTitle tag="h4" className="mb-4">
                {editingId ? "Editar Atividade" : "Nova Atividade"}
              </CardTitle>
              <ActivitiesForm
                formValues={formValues}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setEditingId(null);
                  setFormValues({ ...ACTIVITY_DEFAULT_VALUES });
                  resetPhoto();
                }}
                busy={busy}
                isEditing={!!editingId}
                isSaving={isSubmitting || creating || updating}
                photoPreview={photoPreview || formValues[ACTIVITY_FIELDS.photo]}
                onPhotoSelect={onSelectFile}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <CardTitle tag="h4" className="mb-4">
                Atividades
              </CardTitle>
              <ActivitiesList items={items} busy={busy} onEdit={handleEdit} onDelete={handleDelete} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        toggle={cancelDelete}
        onConfirm={confirmDelete}
        loading={deleting}
        itemName={activityToDelete?.[ACTIVITY_FIELDS.name] || "esta atividade"}
      />
    </React.Fragment>
  );
};

export default ActivitiesPage;
