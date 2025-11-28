// Employee Validation Helper
// Follows the project validation patterns

import { EMPLOYEE_VALIDATION_RULES } from '../../constants/employees';

/**
 * Validate a single field
 * @param {string} fieldName - Name of the field
 * @param {any} value - Value to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (fieldName, value) => {
  const rules = EMPLOYEE_VALIDATION_RULES[fieldName];

  if (!rules) {
    return null; // Field not found in validation rules
  }

  // Check required
  if (rules.required && (!value || value.toString().trim() === '')) {
    return `Campo obrigatório`;
  }

  // Skip other validations if field is empty and not required
  if (!rules.required && (!value || value.toString().trim() === '')) {
    return null;
  }

  // Check minLength
  if (rules.minLength && value && value.length < rules.minLength) {
    return `Deve ter pelo menos ${rules.minLength} caracteres`;
  }

  // Check maxLength
  if (rules.maxLength && value && value.length > rules.maxLength) {
    return `Deve ter no máximo ${rules.maxLength} caracteres`;
  }

  // Check pattern
  if (rules.pattern && value && !rules.pattern.test(value)) {
    return `Formato inválido`;
  }

  // Check allowed values
  if (rules.allowedValues && value && !rules.allowedValues.includes(value)) {
    return rules.message.allowedValues;
  }

  // Custom validation
  if (rules.custom && typeof rules.custom === 'function') {
    const customResult = rules.custom(value);
    if (customResult !== true) {
      return rules.message.custom || customResult;
    }
  }

  return null; // Valid
};

/**
 * Validate all employee data
 * @param {object} employeeData - Complete employee data object
 * @returns {object} Validation result with errors and isValid flag
 */
export const validateEmployee = (employeeData) => {
  const errors = {};
  let isValid = true;

  Object.keys(EMPLOYEE_VALIDATION_RULES).forEach(fieldName => {
    const error = validateField(fieldName, employeeData[fieldName]);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  });

  return {
    isValid,
    errors,
    hasErrors: !isValid
  };
};

/**
 * Check if employee can be submitted (all required fields filled)
 * @param {object} employeeData - Complete employee data object
 * @returns {boolean} - True if can submit
 */
export const canSubmitEmployee = (employeeData) => {
  const requiredFields = Object.keys(EMPLOYEE_VALIDATION_RULES)
    .filter(fieldName => EMPLOYEE_VALIDATION_RULES[fieldName].required);

  return requiredFields.every(fieldName => {
    const value = employeeData[fieldName];
    return value !== null && value !== undefined && value.toString().trim() !== '';
  });
};

/**
 * Get list of missing required fields
 * @param {object} employeeData - Complete employee data object
 * @returns {array} - Array of missing field names
 */
export const getMissingRequiredFields = (employeeData) => {
  const requiredFields = Object.keys(EMPLOYEE_VALIDATION_RULES)
    .filter(fieldName => EMPLOYEE_VALIDATION_RULES[fieldName].required);

  return requiredFields.filter(fieldName => {
    const value = employeeData[fieldName];
    return !value || value.toString().trim() === '';
  });
};

// Export validation rules from constants
export { EMPLOYEE_VALIDATION_RULES } from '../../constants/employees';
