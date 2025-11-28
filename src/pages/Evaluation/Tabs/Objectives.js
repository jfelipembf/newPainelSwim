import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import ObjectiveForm from "../Components/Objectives/ObjectiveForm";
import ObjectiveList from "../Components/Objectives/ObjectiveList";
import ConfirmDeleteModal from "../../../components/shared/ConfirmDeleteModal";
import { fetchActivities } from "../../../store/activities/actions";
import { fetchTopics } from "../../../store/topics/actions";
import { OBJECTIVE_FIELDS } from "../../../constants/objectives";
import { TOPIC_FIELDS } from "../../../constants/topics";
import useObjectivesData from "../Hooks/Objectives/useObjectivesData";
import useObjectivesForm from "../Hooks/Objectives/useObjectivesForm";
import useObjectivesReorder from "../Hooks/Objectives/useObjectivesReorder";
import useObjectivesDeletion from "../Hooks/Objectives/useObjectivesDeletion";
import useObjectivesFeedback from "../Hooks/Objectives/useObjectivesFeedback";
import { useBusy } from "../../../hooks/useBusy";
import { useUniqueToast } from "../../../hooks/useUniqueToast";

const resolveObjectiveId = (objective) =>
  objective?.id || objective?.[OBJECTIVE_FIELDS.idObjective];

const ObjectivesTab = () => {
  const dispatch = useDispatch();

  const { items: activities = [], loading: loadingActivities = false } =
    useSelector((state) => state.activities || {});
  const { topics = [] } = useSelector((state) => state.topics || {});

  const {
    objectives,
    loadingObjectives,
    creatingObjective,
    updatingObjective,
    deletingObjective,
    createdObjective,
    updatedObjective,
    deletedObjectiveId,
    error,
    createObjectiveError,
    updateObjectiveError,
    deleteObjectiveError,
  } = useObjectivesData();

  useEffect(() => {
    dispatch(fetchActivities());
    dispatch(fetchTopics());
  }, [dispatch]);

  const [selectedActivityId, setSelectedActivityId] = useState("");

  const filteredObjectives = useMemo(() => {
    if (!selectedActivityId) return [];
    return (objectives || []).filter((objective) => {
      const activityId = objective[OBJECTIVE_FIELDS.idActivity] || objective.idActivity;
      return activityId === selectedActivityId;
    });
  }, [objectives, selectedActivityId]);

  const { localObjectives, handleDragEnd, reorderState, saveOrderNow } =
    useObjectivesReorder(filteredObjectives);
  const {
    formValues,
    formState,
    handleChange,
    handleEdit,
    resetForm,
    submit,
  } = useObjectivesForm(localObjectives);
  const deletion = useObjectivesDeletion();

  const { fire: fireCreated } = useUniqueToast();
  const { fire: fireUpdated } = useUniqueToast();
  const { fire: fireDeleted } = useUniqueToast();

  const isBusy = useBusy(creatingObjective, updatingObjective);

  const handleActivitySelection = useCallback(
    (field, value) => {
      handleChange(field, value);
      if (field === OBJECTIVE_FIELDS.idActivity) {
        setSelectedActivityId(value);
      }
    },
    [handleChange]
  );

  const handleObjectiveEdit = useCallback(
    (objective) => {
      handleEdit(objective);
      const activityId = objective?.[OBJECTIVE_FIELDS.idActivity] || objective?.idActivity;
      if (activityId) {
        setSelectedActivityId(activityId);
      }
    },
    [handleEdit]
  );

  useEffect(() => {
    const activityFromForm = formValues[OBJECTIVE_FIELDS.idActivity];
    if (activityFromForm && activityFromForm !== selectedActivityId) {
      setSelectedActivityId(activityFromForm);
    }
  }, [formValues, selectedActivityId]);

  const errors = useMemo(
    () => [error, createObjectiveError, updateObjectiveError, deleteObjectiveError],
    [error, createObjectiveError, updateObjectiveError, deleteObjectiveError]
  );

  useObjectivesFeedback({
    resolveId: resolveObjectiveId,
    createdObjective,
    updatedObjective,
    deletedObjectiveId,
    fireCreated,
    fireUpdated,
    fireDeleted,
    onReset: resetForm,
    errors,
  });

  const activityOptions = useMemo(
    () =>
      (activities || []).map((activity) => ({
        value: activity.id || activity.idActivity,
        label: activity.name || "Sem nome",
      })),
    [activities]
  );

  const activityNameMap = useMemo(() => {
    return (activities || []).reduce((acc, activity) => {
      const id = activity.id || activity.idActivity;
      if (id) acc[id] = activity.name || "Sem nome";
      return acc;
    }, {});
  }, [activities]);

  const getActivityName = useCallback(
    (id) => activityNameMap[id] || (loadingActivities ? "Carregando..." : "Sem atividade"),
    [activityNameMap, loadingActivities]
  );

  const topicCounts = useMemo(() => {
    return (topics || []).reduce((acc, topic) => {
      const objectiveId = topic[TOPIC_FIELDS.idObjective] || topic.idObjective;
      if (!objectiveId) return acc;
      acc[objectiveId] = (acc[objectiveId] || 0) + 1;
      return acc;
    }, {});
  }, [topics]);

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">
                  {formState.isEditing ? "Editar objetivo" : "Novo objetivo"}
                </h5>
                {formState.isEditing && (
                  <Button color="link" onClick={resetForm}>
                    Cancelar edição
                  </Button>
                )}
              </div>

          <p className="text-muted small mb-3">
            Selecione uma atividade antes de visualizar, editar ou criar objetivos para
            evitar misturar objetivos de diferentes atividades.
          </p>

          <ObjectiveForm
            formValues={formValues}
            activityOptions={activityOptions}
            onChange={handleActivitySelection}
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
                <h5 className="card-title mb-0">Objetivos de Avaliação</h5>
                <div>
                  {reorderState.hasPendingChanges && (
                    <Button color="success" size="sm" className="me-2" onClick={saveOrderNow}>
                      {reorderState.savingOrder ? "Salvando..." : "Salvar ordem"}
                    </Button>
                  )}
                </div>
              </div>

              {selectedActivityId ? (
                <ObjectiveList
                  loading={loadingObjectives}
                  localObjectives={localObjectives}
                  onDragEnd={handleDragEnd}
                  onEdit={handleObjectiveEdit}
                  onDelete={deletion.openDeleteModal}
                  getActivityName={getActivityName}
                  topicCounts={topicCounts}
                />
              ) : (
                <div className="text-center text-muted py-4">
                  Escolha uma atividade no formulário acima para ver apenas os objetivos
                  dela e evitar reordenações cruzadas.
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
        loading={deletingObjective}
        itemName={deletion.itemName}
      />
    </div>
  );
};

export default ObjectivesTab;
