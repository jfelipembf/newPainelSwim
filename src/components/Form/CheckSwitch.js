import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

/**
 * CheckSwitch - simples wrapper para switches/checkbox
 * Props:
 * - id: string (obrigatório)
 * - label: string
 * - checked: boolean
 * - onToggle: function (novoValor)
 * - helperText: string (opcional)
 * - disabled: boolean (opcional)
 * - className: string (opcional)
 */
const CheckSwitch = ({
  id,
  label,
  checked = false,
  onToggle = () => {},
  helperText = "",
  disabled = false,
  className = "",
}) => {
  const handleChange = (e) => {
    const nextChecked = e.target.checked;
    console.log(`CheckSwitch change -> ${id}:`, nextChecked);
    onToggle(nextChecked);
  };

  return (
    <FormGroup check className={`form-switch ${className}`}>
      <Input
        className="form-check-input"
        type="checkbox"
        id={id}
        checked={!!checked}
        disabled={disabled}
        onChange={handleChange}
      />
      {label && (
        <Label className="form-check-label" htmlFor={id}>
          {label}
        </Label>
      )}
      {helperText && <small className="text-muted d-block">{helperText}</small>}
    </FormGroup>
  );
};

export default CheckSwitch;
