import React from "react";
import { Button } from "reactstrap";
import DraggableTable from "../../../../components/shared/DraggableTable";
import { LEVEL_FIELDS } from "../../../../constants/levels";

const LevelsList = ({ loading, localLevels, onDragEnd, onEdit, onDelete }) => {
  const renderLevelRow = (level) => (
    <>
      <td>
        <div className="fw-bold">{level[LEVEL_FIELDS.label] || "-"}</div>
        <div className="text-muted small">
          {level[LEVEL_FIELDS.description] || "Sem descrição"}
        </div>
      </td>
      <td>
        <span className={`badge ${level[LEVEL_FIELDS.isActive] ? 'bg-success' : 'bg-danger'}`}>
          {level[LEVEL_FIELDS.isActive] ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td className="text-end">
        <Button
          color="outline-primary"
          size="sm"
          className="me-2"
          onClick={() => onEdit(level)}
        >
          <i className="fas fa-edit" />
        </Button>
        <Button
          color="outline-danger"
          size="sm"
          onClick={() => onDelete(level)}
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
        <p className="mt-2">Carregando níveis...</p>
      </div>
    );
  }

  if (!localLevels || localLevels.length === 0) {
    return (
      <div className="text-center py-4 text-muted">
        Nenhum nível cadastrado.
      </div>
    );
  }

  return (
    <DraggableTable
      items={localLevels}
      onDragEnd={onDragEnd}
      renderItem={renderLevelRow}
      droppableId="levels-droppable"
      headers={['Nível', 'Status', 'Ações']}
    />
  );
};

export default LevelsList;
