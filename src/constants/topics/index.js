// =============================================
// CAMPOS DE TÓPICOS
// =============================================

export const TOPIC_FIELDS = {
  idTopic: 'idTopic',
  idObjective: 'idObjective',
  name: 'name',
  description: 'description',
  order: 'order',
  isActive: 'isActive',
};

// =============================================
// LABELS PARA FORMULÁRIOS
// =============================================

export const TOPIC_FIELD_LABELS = {
  [TOPIC_FIELDS.idTopic]: 'ID do Tópico',
  [TOPIC_FIELDS.idObjective]: 'Objetivo',
  [TOPIC_FIELDS.name]: 'Nome do Tópico',
  [TOPIC_FIELDS.description]: 'Descrição',
  [TOPIC_FIELDS.order]: 'Ordem',
  [TOPIC_FIELDS.isActive]: 'Tópico Ativo',
};

// =============================================
// VALORES PADRÃO
// =============================================

export const TOPIC_DEFAULT_VALUES = {
  [TOPIC_FIELDS.idTopic]: null,
  [TOPIC_FIELDS.idObjective]: '',
  [TOPIC_FIELDS.name]: '',
  [TOPIC_FIELDS.description]: '',
  [TOPIC_FIELDS.order]: 0,
  [TOPIC_FIELDS.isActive]: true,
};

// =============================================
// VALIDAÇÃO DE CAMPOS
// =============================================

export const TOPIC_VALIDATION_RULES = {
  [TOPIC_FIELDS.name]: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  [TOPIC_FIELDS.idObjective]: {
    required: true,
  },
};

// =============================================
// CONSTANTES DE PAGINAÇÃO
// =============================================

export const TOPIC_LIST_DEFAULTS = {
  take: 50,
  skip: 0,
  maxTake: 100
};

// =============================================
// FILTROS DISPONÍVEIS
// =============================================

export const TOPIC_FILTERS = {
  idObjective: 'idObjective',
  isActive: 'isActive',
};

// =============================================
// ORDENAÇÃO DISPONÍVEL
// =============================================

export const TOPIC_SORT_OPTIONS = {
  order: 'order',
  name: 'name',
  createdAt: 'createdAt',
};
