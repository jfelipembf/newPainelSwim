import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "reactstrap";
import { ACTIVITY_FIELDS } from "../../../../constants/activities/activities";
import AvatarCell from "../../../../components/shared/AvatarCell";

const ActivitiesList = ({ items = [], busy, onEdit, onDelete }) => (
  <div className="table-responsive">
    <Table className="table align-middle">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Cor</th>
              <th>Status</th>
              <th>Capacidade</th>
              <th>Duração</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length ? (
              items.map((activity) => {
                const id = activity.id || activity[ACTIVITY_FIELDS.idActivity];
                return (
                  <tr key={id}>
                    <td>
                      <AvatarCell
                        src={activity[ACTIVITY_FIELDS.photo]}
                        alt={activity[ACTIVITY_FIELDS.name] || "Atividade"}
                        size="md"
                      />
                    </td>
                    <td>{activity[ACTIVITY_FIELDS.name]}</td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          borderRadius: "4px",
                          backgroundColor: activity[ACTIVITY_FIELDS.color] || "#ccc",
                          border: "1px solid #ddd",
                        }}
                      />
                    </td>
                    <td>
                      <span className={`badge ${activity[ACTIVITY_FIELDS.isActive] ? "bg-success" : "bg-danger"}`}>
                        {activity[ACTIVITY_FIELDS.isActive] ? "Ativa" : "Inativa"}
                      </span>
                    </td>
                    <td>{activity[ACTIVITY_FIELDS.capacityDefault]}</td>
                    <td>{activity[ACTIVITY_FIELDS.durationDefault]}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="outline-primary"
                        className="me-2"
                        onClick={() => onEdit(activity)}
                        disabled={busy}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        color="outline-danger"
                        onClick={() => onDelete(activity)}
                        disabled={busy}
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Nenhuma atividade cadastrada.
                </td>
              </tr>
            )}
          </tbody>
    </Table>
  </div>
);

ActivitiesList.propTypes = {
  items: PropTypes.array,
  busy: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActivitiesList;
