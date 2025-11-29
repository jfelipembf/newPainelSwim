import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardBody, CardTitle, Col, Row, Button } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { fetchConfigs, deleteConfig } from "../../../store/activities_schedule/actions";
import { fetchSessions } from "../../../store/activities_sessions/actions";
import { ACTIVITY_CONFIG_FIELDS } from "../../../constants/activities/activities_configs";
import ConfirmDeleteModal from "../../../components/shared/ConfirmDeleteModal";
import useClassesData from "./hooks/useClassesData";
import useClassesForm from "./hooks/useClassesForm";
import ClassesForm from "./components/ClassesForm";
import SchedulePage from "../Schedule/SchedulePage";

const ClassesPage = () => {
  const dispatch = useDispatch();

  const {
    loading,
    creating,
    updating,
    created,
    updated,
    error,
    activityOptions,
    areaOptions,
    instructorOptions,
    configs,
    getConfigById,
  } = useClassesData();

  const {
    formValues,
    editingId,
    isSubmitting,
    handleChange,
    handleSelectActivity,
    handleSelectArea,
    handleSelectInstructor,
    handleDaysChange,
    handleSubmit,
    handleCancel,
    handleEdit,
    setIsSubmitting,
  } = useClassesForm();

  const [selectedConfigIds, setSelectedConfigIds] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleToggleSelection = useCallback(
    (configId) => {
      if (!configId) return;
      setSelectedConfigIds((prev) => {
        if (prev.includes(configId)) {
          const next = prev.filter((id) => id !== configId);
          if (editingId === configId) {
            handleCancel();
          }
          return next;
        }
        return [...prev, configId];
      });
    },
    [editingId, handleCancel]
  );

  const handleSelectAll = useCallback(() => {
    const allIds = configs
      .map((config) => config.id || config[ACTIVITY_CONFIG_FIELDS.idConfiguration])
      .filter(Boolean);
    setSelectedConfigIds(allIds);
  }, [configs]);

  const handleEditSelected = useCallback(() => {
    if (selectedConfigIds.length !== 1) {
      toast.info("Selecione apenas uma turma para editar.");
      return;
    }
    const config = getConfigById(selectedConfigIds[0]);
    if (config) {
      handleEdit(config);
    } else {
      toast.error("Não foi possível carregar a turma selecionada.");
    }
  }, [selectedConfigIds, getConfigById, handleEdit]);

  const handleDeleteSelected = useCallback(() => {
    if (!selectedConfigIds.length) {
      toast.info("Selecione ao menos uma turma para excluir.");
      return;
    }
    setDeleteModalOpen(true);
  }, [selectedConfigIds.length]);

  const handleConfirmDelete = useCallback(() => {
    if (!selectedConfigIds.length) {
      setDeleteModalOpen(false);
      return;
    }
    selectedConfigIds.forEach((id) => dispatch(deleteConfig(id)));
    if (editingId && selectedConfigIds.includes(editingId)) {
      handleCancel();
    }
    setSelectedConfigIds([]);
    dispatch(fetchConfigs());
    dispatch(fetchSessions());
    toast.success(
      selectedConfigIds.length === 1
        ? "Turma excluída com sucesso"
        : `${selectedConfigIds.length} turmas excluídas com sucesso`
    );
    setDeleteModalOpen(false);
  }, [selectedConfigIds, dispatch, editingId, handleCancel]);

  const handleClearSelection = useCallback(() => {
    setSelectedConfigIds([]);
    handleCancel();
  }, [handleCancel]);

  useEffect(() => {
    if (created || updated) {
      toast.success(editingId ? "Turma atualizada com sucesso" : "Turma criada com sucesso");
      handleCancel();
      dispatch(fetchConfigs());
      setSelectedConfigIds([]);
      setIsSubmitting(false);
    }
  }, [created, updated, editingId, handleCancel, dispatch, setIsSubmitting]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setIsSubmitting(false);
    }
  }, [error, setIsSubmitting]);

  const busy = useMemo(() => loading || creating || updating, [loading, creating, updating]);

  const handleSubmitForm = useCallback(
    (event) => {
      event?.preventDefault?.();
      handleSubmit();
    },
    [handleSubmit]
  );

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <CardTitle tag="h4" className="mb-4">
                {editingId ? "Editar Turma" : "Nova Turma"}
              </CardTitle>
              <ClassesForm
                formValues={formValues}
                onChange={handleChange}
                onSubmit={handleSubmitForm}
                onCancel={handleCancel}
                busy={busy}
                isEditing={!!editingId}
                isSaving={isSubmitting || creating || updating}
                activityOptions={activityOptions}
                areaOptions={areaOptions}
                instructorOptions={instructorOptions}
                onSelectActivity={handleSelectActivity}
                onSelectArea={handleSelectArea}
                onSelectInstructor={handleSelectInstructor}
                onDaysChange={handleDaysChange}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="d-flex flex-wrap gap-2">
          <Button color="secondary" outline size="sm" onClick={handleSelectAll} disabled={!configs.length}>
            Selecionar tudo
          </Button>
          <Button
            color="secondary"
            outline
            size="sm"
            onClick={handleClearSelection}
            disabled={!selectedConfigIds.length}
          >
            Limpar seleção
          </Button>
          <Button
            color="primary"
            outline
            size="sm"
            onClick={handleEditSelected}
            disabled={!selectedConfigIds.length}
          >
            Editar selecionado
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={handleDeleteSelected}
            disabled={!selectedConfigIds.length}
          >
            Excluir selecionado
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <SchedulePage
            selectable
            selectedConfigIds={selectedConfigIds}
            onSelectEvent={(event) => {
              const configId = event?.configId;
              if (!configId) return;
              handleToggleSelection(configId);
            }}
          />
        </Col>
      </Row>

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        toggle={() => setDeleteModalOpen((prev) => !prev)}
        onConfirm={handleConfirmDelete}
        itemName={
          selectedConfigIds.length === 1
            ? "esta turma"
            : `${selectedConfigIds.length} turmas`
        }
      />
    </React.Fragment>
  );
};

export default ClassesPage;
