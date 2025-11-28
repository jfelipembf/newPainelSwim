import React from "react";
import { Button } from "reactstrap";
import DraggableTable from "../../../../components/shared/DraggableTable";
import { OBJECTIVE_FIELDS } from "../../../../constants/objectives";

const ObjectiveList = ({
  loading,
  localObjectives,
  onDragEnd,
  onEdit,
  onDelete,
  getActivityName,
  topicCounts = {},
}) => {
  const renderObjectiveRow = (objective) => (
    <>
      <td>
        <div className="fw-bold">{objective[OBJECTIVE_FIELDS.name] || "-"}</div>
        <div className="text-muted small">
          {objective[OBJECTIVE_FIELDS.description] || "Sem descrição"}
        </div>
      </td>
      <td>
        {getActivityName(objective[OBJECTIVE_FIELDS.idActivity])}
      </td>
      <td>{topicCounts[objective.id || objective[OBJECTIVE_FIELDS.idObjective]] || 0} tópicos</td>
      <td>
        <span className={`badge ${objective[OBJECTIVE_FIELDS.isActive] ? 'bg-success' : 'bg-danger'}`}>
          {objective[OBJECTIVE_FIELDS.isActive] ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td className="text-end">
        <Button
          color="outline-primary"
          size="sm"
          className="me-2"
          onClick={() => onEdit(objective)}
        >
          <i className="fas fa-edit" />
        </Button>
        <Button
          color="outline-danger"
          size="sm"
          onClick={() => onDelete(objective)}
        >
          <i className="fas fa-trash" />
        </Button>
      </td>
    </>
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-spinner fa-spin fa-2x" />
        <p className="mt-2">Carregando objetivos...</p>
      </div>
    );
  }

  if (!localObjectives || localObjectives.length === 0) {
    return (
      <div className="text-center py-4 text-muted">
        Nenhum objetivo cadastrado.
      </div>
    );
  }

  return (
    <DraggableTable
      items={localObjectives}
      onDragEnd={onDragEnd}
      renderItem={renderObjectiveRow}
      droppableId="objectives-droppable"
      headers={['Objetivo', 'Atividade', 'Tópicos', 'Status', 'Ações']}
    />
  );
};

export default ObjectiveList;
