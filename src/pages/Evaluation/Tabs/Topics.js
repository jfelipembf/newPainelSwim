import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import { useBusy } from "../../../hooks/useBusy";
import { useUniqueToast } from "../../../hooks/useUniqueToast";
import ConfirmDeleteModal from "../../../components/shared/ConfirmDeleteModal";
import TopicForm from "../Components/Topics/TopicForm";
import TopicList from "../Components/Topics/TopicList";
import useObjectivesData from "../Hooks/Objectives/useObjectivesData";
import useTopicsData from "../Hooks/Topics/useTopicsData";
import useTopicsForm from "../Hooks/Topics/useTopicsForm";
import useTopicsReorder from "../Hooks/Topics/useTopicsReorder";
import useTopicsDeletion from "../Hooks/Topics/useTopicsDeletion";
import useTopicsFeedback from "../Hooks/Topics/useTopicsFeedback";
import { OBJECTIVE_FIELDS } from "../../../constants/objectives";
import { TOPIC_FIELDS } from "../../../constants/topics";

const resolveTopicId = (topic) => topic?.id || topic?.[TOPIC_FIELDS.idTopic];

const TopicsTab = () => {
  const [selectedObjectiveId, setSelectedObjectiveId] = useState("");
  const { objectives = [], loadingObjectives } = useObjectivesData();

  const {
    topics,
    loadingTopics,
    creatingTopic,
    updatingTopic,
    deletingTopic,
    createdTopic,
    updatedTopic,
    deletedTopicId,
    error,
    createTopicError,
    updateTopicError,
    deleteTopicError,
  } = useTopicsData();

  const filteredTopics = useMemo(() => {
    if (!selectedObjectiveId) return [];
    return (topics || []).filter(
      (topic) =>
        (topic[TOPIC_FIELDS.idObjective] || topic.idObjective || "") === selectedObjectiveId
    );
  }, [selectedObjectiveId, topics]);

  const {
    formValues,
    formState,
    handleChange: handleFormChange,
    handleEdit,
    resetForm,
    submit,
  } = useTopicsForm(filteredTopics);

  const handleTopicFormChange = useCallback(
    (field, value) => {
      handleFormChange(field, value);
      if (field === TOPIC_FIELDS.idObjective) {
        setSelectedObjectiveId(value);
      }
    },
    [handleFormChange]
  );

  useEffect(() => {
    const objectiveFromForm = formValues[TOPIC_FIELDS.idObjective];
    if (objectiveFromForm && objectiveFromForm !== selectedObjectiveId) {
      setSelectedObjectiveId(objectiveFromForm);
    }
  }, [formValues, selectedObjectiveId]);

  const { localTopics, handleDragEnd, reorderState, saveOrderNow } = useTopicsReorder(
    filteredTopics
  );
  const deletion = useTopicsDeletion();

  const { fire: fireCreated } = useUniqueToast();
  const { fire: fireUpdated } = useUniqueToast();
  const { fire: fireDeleted } = useUniqueToast();

  const isBusy = useBusy(creatingTopic, updatingTopic);

  const errors = useMemo(
    () => [error, createTopicError, updateTopicError, deleteTopicError],
    [error, createTopicError, updateTopicError, deleteTopicError]
  );

  useTopicsFeedback({
    resolveId: resolveTopicId,
    createdTopic,
    updatedTopic,
    deletedTopicId,
    fireCreated,
    fireUpdated,
    fireDeleted,
    onReset: resetForm,
    errors,
  });

  const objectiveOptions = useMemo(
    () =>
      (objectives || [])
        .map((objective) => {
          const objectiveId = objective.id || objective[OBJECTIVE_FIELDS.idObjective];
          if (!objectiveId) return null;
          return {
            value: objectiveId,
            label:
              objective[OBJECTIVE_FIELDS.name] || objective.name || "Objetivo sem nome",
          };
        })
        .filter(Boolean),
    [objectives]
  );

  const objectiveNameMap = useMemo(() => {
    return (objectives || []).reduce((acc, objective) => {
      const objectiveId = objective.id || objective[OBJECTIVE_FIELDS.idObjective];
      if (objectiveId) {
        acc[objectiveId] =
          objective[OBJECTIVE_FIELDS.name] || objective.name || "Objetivo sem nome";
      }
      return acc;
    }, {});
  }, [objectives]);

  const getObjectiveName = useCallback(
    (objectiveId) =>
      objectiveNameMap[objectiveId] ||
      (loadingObjectives ? "Carregando..." : "Objetivo não informado"),
    [objectiveNameMap, loadingObjectives]
  );

  const hasSelectedObjective = Boolean(selectedObjectiveId);

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">
                  {formState.isEditing ? "Editar tópico" : "Novo tópico"}
                </h5>
                {formState.isEditing && (
                  <Button color="link" onClick={resetForm}>
                    Cancelar edição
                  </Button>
                )}
              </div>

              <TopicForm
                formValues={formValues}
                objectiveOptions={objectiveOptions}
                onChange={handleTopicFormChange}
                onSubmit={submit}
                onCancel={resetForm}
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
                <h5 className="card-title mb-0">Tópicos de Avaliação</h5>
                <div>
                  {reorderState.hasPendingChanges && (
                    <Button color="success" size="sm" className="me-2" onClick={saveOrderNow}>
                      {reorderState.savingOrder ? "Salvando..." : "Salvar ordem"}
                    </Button>
                  )}
                </div>
              </div>

              {hasSelectedObjective ? (
                <TopicList
                  loading={loadingTopics}
                  localTopics={localTopics}
                  selectedObjectiveId={selectedObjectiveId}
                  getObjectiveName={getObjectiveName}
                  onEdit={handleEdit}
                  onDelete={deletion.openDeleteModal}
                  onDragEnd={handleDragEnd}
                />
              ) : (
                <div className="text-center text-muted py-5">
                  Selecione um objetivo no formulário acima para ver os tópicos que
                  pertencem a ele e evitar reordenações cruzadas.
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <ConfirmDeleteModal
        isOpen={deletion.modalOpen}
        toggle={deletion.closeDeleteModal}
        onConfirm={deletion.confirmDelete}
        loading={deletingTopic}
        itemName={deletion.itemName}
      />
    </div>
  );
};

export default TopicsTab;
