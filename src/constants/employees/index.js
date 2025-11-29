// Employee constants
export const EMPLOYEE_INITIAL_VALUE = {
  name: "",
  lastName: "",
  cpf: "",
  rg: "",
  cellphone: "",
  email: "",
  gender: "",
  birthday: null,
  country: "",
  address: "",
  state: "",
  city: "",
  passport: "",
  zipCode: "",
  complement: "",
  neighborhood: "",
  number: "",
  active: true,
  photoUrl: ""
};

// Employee field labels for forms
export const EMPLOYEE_FIELD_LABELS = {
  name: "Nome",
  lastName: "Sobrenome",
  cpf: "CPF",
  rg: "RG",
  cellphone: "Celular",
  email: "E-mail",
  gender: "Gênero",
  birthday: "Data de Nascimento",
  country: "País",
  address: "Endereço",
  state: "Estado",
  city: "Cidade",
  passport: "Passaporte",
  zipCode: "CEP",
  complement: "Complemento",
  neighborhood: "Bairro",
  number: "Número",
  active: "Ativo",
  photoUrl: "Foto"
};

// Employee validation rules
export const EMPLOYEE_VALIDATION_RULES = {
  name: { required: true, minLength: 2, maxLength: 50 },
  lastName: { required: true, minLength: 2, maxLength: 50 },
  cpf: {
    required: true,
    pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    custom: validateCPF
  },
  rg: { required: false },
  cellphone: {
    required: true,
    pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  gender: { required: false },
  birthday: {
    required: true,
    custom: validateBirthday
  },
  country: { required: false },
  address: { required: false },
  state: { required: false },
  city: { required: false },
  passport: { required: false },
  zipCode: { required: false, pattern: /^\d{5}-\d{3}$/ },
  complement: { required: false },
  neighborhood: { required: false },
  number: { required: false },
  active: { required: false },
  photoUrl: { required: false }
};

// Custom validation functions

/**
 * Validate CPF (Brazilian tax ID)
 * @param {string} cpf - CPF to validate
 * @returns {boolean|string} - True if valid, error message if invalid
 */
function validateCPF(cpf) {
  if (!cpf) return true;

  // Remove non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11) {
    return "CPF deve ter 11 dígitos";
  }

  // Check for repeated digits
  if (/^(\d)\1+$/.test(cleanCPF)) {
    return "CPF inválido";
  }

  // Validate check digits
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF[9])) return "CPF inválido";

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF[10])) return "CPF inválido";

  return true;
}

/**
 * Validate birthday (basic date validation only)
 * @param {string} birthday - Birthday in YYYY-MM-DD format
 * @returns {boolean|string} - True if valid, error message if invalid
 */
function validateBirthday(birthday) {
  if (!birthday) return true;

  const birthDate = new Date(birthday);
  const today = new Date();

  if (isNaN(birthDate.getTime())) {
    return "Data de nascimento inválida";
  }

  // Basic validation - date must be in the past and not too far in the future
  if (birthDate > today) {
    return "Data de nascimento não pode ser no futuro";
  }

  return true;
}
