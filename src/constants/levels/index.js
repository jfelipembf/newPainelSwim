// =============================================
// CAMPOS DE NÍVEIS DE AVALIAÇÃO
// =============================================

export const LEVEL_FIELDS = {
  idLevel: 'idLevel',
  value: 'value', // número ou string
  label: 'label',
  description: 'description',
  order: 'order',
  isActive: 'isActive',
};

// =============================================
// TIPOS DE NÍVEIS
// =============================================

export const LEVEL_TYPES = {
  NUMERIC: 'numeric',
  TEXT: 'text',
};

// =============================================
// LABELS PARA FORMULÁRIOS
// =============================================

export const LEVEL_FIELD_LABELS = {
  [LEVEL_FIELDS.idLevel]: 'ID do Nível',
  [LEVEL_FIELDS.value]: 'Valor',
  [LEVEL_FIELDS.label]: 'Rótulo',
  [LEVEL_FIELDS.description]: 'Descrição',
  [LEVEL_FIELDS.order]: 'Ordem',
  [LEVEL_FIELDS.isActive]: 'Nível Ativo',
};

// =============================================
// VALORES PADRÃO
// =============================================

export const LEVEL_DEFAULT_VALUES = {
  [LEVEL_FIELDS.idLevel]: null,
  [LEVEL_FIELDS.value]: '',
  [LEVEL_FIELDS.label]: '',
  [LEVEL_FIELDS.description]: '',
  [LEVEL_FIELDS.order]: 0,
  [LEVEL_FIELDS.isActive]: true,
};

// =============================================
// VALIDAÇÃO DE CAMPOS
// =============================================

export const LEVEL_VALIDATION_RULES = {
  [LEVEL_FIELDS.label]: {
    required: true,
    minLength: 1,
    maxLength: 50,
  },
};

// =============================================
// CONSTANTES DE PAGINAÇÃO
// =============================================

export const LEVEL_LIST_DEFAULTS = {
  take: 50,
  skip: 0,
  maxTake: 100
};

// =============================================
// FILTROS DISPONÍVEIS
// =============================================

export const LEVEL_FILTERS = {
  isActive: 'isActive',
};

// =============================================
// ORDENAÇÃO DISPONÍVEL
// =============================================

export const LEVEL_SORT_OPTIONS = {
  order: 'order',
  label: 'label',
  createdAt: 'createdAt',
};
