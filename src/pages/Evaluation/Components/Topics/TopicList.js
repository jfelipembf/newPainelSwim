import React from "react";
import { Button } from "reactstrap";
import DraggableTable from "../../../../components/shared/DraggableTable";
import { TOPIC_FIELDS } from "../../../../constants/topics";

const TopicList = ({
  loading,
  localTopics,
  selectedObjectiveId,
  getObjectiveName,
  onEdit,
  onDelete,
  onDragEnd,
}) => {
  const renderTopicRow = (topic) => (
    <>
      <td>
        <div className="fw-bold">{topic[TOPIC_FIELDS.name] || "-"}</div>
        <div className="text-muted small">
          {topic[TOPIC_FIELDS.description] || "Sem descrição"}
        </div>
      </td>
      <td>{getObjectiveName(topic[TOPIC_FIELDS.idObjective])}</td>
      <td>
        <span className={`badge ${topic[TOPIC_FIELDS.isActive] ? 'bg-success' : 'bg-danger'}`}>
          {topic[TOPIC_FIELDS.isActive] ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td className="text-end">
        <Button
          color="outline-primary"
          size="sm"
          className="me-2"
          onClick={() => onEdit(topic)}
        >
          <i className="fas fa-edit" />
        </Button>
        <Button
          color="outline-danger"
          size="sm"
          onClick={() => onDelete(topic)}
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
        <p className="mt-2">Carregando tópicos...</p>
      </div>
    );
  }

  if (!localTopics || localTopics.length === 0) {
    return (
      <div className="text-center py-4 text-muted">
        Nenhum tópico cadastrado.
      </div>
    );
  }

  return (
    <DraggableTable
      items={localTopics}
      onDragEnd={onDragEnd}
      renderItem={renderTopicRow}
      droppableId={selectedObjectiveId ? "topics-droppable" : "topics-droppable-all"}
      headers={['Tópico', 'Objetivo', 'Status', 'Ações']}
    />
  );
};

export default TopicList;
