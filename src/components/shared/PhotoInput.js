import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";
import AvatarCell from "./AvatarCell";

const PhotoInput = ({ id, label, onSelect, previewUrl, accept = "image/*" }) => (
  <FormGroup>
    {label && <Label for={id}>{label}</Label>}
    <Input
      id={id}
      type="file"
      accept={accept}
      onChange={(e) => onSelect?.(e.target.files?.[0])}
    />
    {previewUrl && (
      <div className="mt-2">
        <AvatarCell src={previewUrl} alt="Pré-visualização" size="md" />
      </div>
    )}
  </FormGroup>
);

PhotoInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  previewUrl: PropTypes.string,
  accept: PropTypes.string,
};

export default PhotoInput;
