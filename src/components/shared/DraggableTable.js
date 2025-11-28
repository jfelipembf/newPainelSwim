import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const DraggableTable = ({
  items,
  onDragEnd,
  renderItem,
  droppableId,
  className = "table table-centered table-nowrap",
  theadClassName = "thead-light",
  headers = []
}) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    onDragEnd(sourceIndex, destinationIndex);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className="table-responsive"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <table className={className}>
              <thead className={theadClassName}>
                <tr>
                  <th style={{ width: "50px" }}></th>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <Draggable
                    key={item.id || item[Object.keys(item)[0]]}
                    draggableId={item.id || item[Object.keys(item)[0]]}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: snapshot.isDragging ? '#f8f9fa' : 'transparent',
                        }}
                      >
                        <td {...provided.dragHandleProps}>
                          <i className="fas fa-grip-vertical text-muted" />
                        </td>
                        {renderItem(item, index)}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTable;
