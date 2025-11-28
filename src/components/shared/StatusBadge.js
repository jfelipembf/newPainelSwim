import React from "react";
import PropTypes from "prop-types";

const StatusBadge = ({ active = true }) => {
  const isInactive = !active;
  return (
    <span className={`badge bg-${isInactive ? "danger" : "success"} text-white`}>
      {isInactive ? "Inativo" : "Ativo"}
    </span>
  );
};

StatusBadge.propTypes = {
  active: PropTypes.bool,
};

export default StatusBadge;
