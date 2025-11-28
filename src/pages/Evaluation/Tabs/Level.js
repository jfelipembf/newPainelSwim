import React, { useMemo } from "react";
import { Card, CardBody, Col, Row, Button } from "reactstrap";

import LevelsForm from "../Components/Level/LevelsForm";
import LevelsList from "../Components/Level/LevelsList";
import ConfirmDeleteModal from "../../../components/shared/ConfirmDeleteModal";

import useLevelsData from "../Hooks/Level/useLevelsData";
import useLevelsForm from "../Hooks/Level/useLevelsForm";
import useLevelsReorder from "../Hooks/Level/useLevelsReorder";
import useLevelsDeletion from "../Hooks/Level/useLevelsDeletion";
import useLevelsFeedback from "../Hooks/Level/useLevelsFeedback";
import { useBusy } from "../../../hooks/useBusy";
import { LEVEL_FIELDS } from "../../../constants/levels";
import { useUniqueToast } from "../../../hooks/useUniqueToast";

const resolveLevelId = (level) => level?.id || level?.[LEVEL_FIELDS.idLevel];

const LevelTab = () => {
  const {
    levels,
    loadingLevels,
    creatingLevel,
    updatingLevel,
    deletingLevel,
    createdLevel,
    updatedLevel,
    deletedLevelId,
    error,
    createLevelError,
    updateLevelError,
    deleteLevelError,
  } = useLevelsData();

  const { localLevels, handleDragEnd, reorderState, saveOrderNow } = useLevelsReorder(levels);
  const form = useLevelsForm(localLevels);
  const deletion = useLevelsDeletion();

  const { fire: fireCreated } = useUniqueToast();
  const { fire: fireUpdated } = useUniqueToast();
  const { fire: fireDeleted } = useUniqueToast();

  const isBusy = useBusy(creatingLevel, updatingLevel);

  const errors = useMemo(
    () => [error, createLevelError, updateLevelError, deleteLevelError],
    [error, createLevelError, updateLevelError, deleteLevelError]
  );

  useLevelsFeedback({
    resolveId: resolveLevelId,
    createdLevel,
    updatedLevel,
    deletedLevelId,
    fireCreated,
    fireUpdated,
    fireDeleted,
    onReset: form.resetForm,
    errors,
  });

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">
                  {form.formState.isEditing ? "Editar nível" : "Novo nível"}
                </h5>
                {form.formState.isEditing && (
                  <Button color="link" onClick={form.resetForm}>
                    Cancelar edição
                  </Button>
                )}
              </div>

              <LevelsForm
                formValues={form.formValues}
                onChange={form.handleChange}
                onSubmit={form.submit}
                onCancel={form.resetForm}
                isBusy={isBusy}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Níveis de Avaliação</h5>
                <div>
                  {reorderState.hasPendingChanges && (
                    <Button color="success" size="sm" className="me-2" onClick={saveOrderNow}>
                      {reorderState.savingOrder ? "Salvando..." : "Salvar ordem"}
                    </Button>
                  )}
                </div>
              </div>

              <LevelsList
                loading={loadingLevels}
                localLevels={localLevels}
                onDragEnd={handleDragEnd}
                onEdit={form.handleEdit}
                onDelete={deletion.openDeleteModal}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <ConfirmDeleteModal
        isOpen={deletion.modalOpen}
        toggle={deletion.closeDeleteModal}
        onConfirm={deletion.confirmDelete}
        loading={deletingLevel}
        itemName={deletion.itemName}
      />
    </div>
  );
};

export default LevelTab;
