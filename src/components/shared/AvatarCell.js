import React from "react";
import PropTypes from "prop-types";

const AvatarCell = ({ src, alt, size = "sm" }) => {
  const sizeClass = size === "md" ? "avatar-md" : "avatar-sm";
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} rounded-circle`}
        style={{ objectFit: "cover" }}
      />
    );
  }
  return (
    <div className={`${sizeClass} d-flex align-items-center justify-content-center rounded-circle bg-light text-muted`}>
      <i className="fas fa-image"></i>
    </div>
  );
};

AvatarCell.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
};

export default AvatarCell;
