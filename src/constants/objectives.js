// =============================================
// CAMPOS DE OBJETIVOS
// =============================================

export const OBJECTIVE_FIELDS = {
  idObjective: 'idObjective',
  name: 'name',
  description: 'description',
  order: 'order',
  idActivity: 'idActivity', // ex: "pernada_crawl", "bracada_crawl"
  isActive: 'isActive',
};

// =============================================
// LABELS PARA FORMULÁRIOS
// =============================================

export const OBJECTIVE_FIELD_LABELS = {
  [OBJECTIVE_FIELDS.idObjective]: 'ID do Objetivo',
  [OBJECTIVE_FIELDS.name]: 'Nome do Objetivo',
  [OBJECTIVE_FIELDS.description]: 'Descrição',
  [OBJECTIVE_FIELDS.order]: 'Ordem',
  [OBJECTIVE_FIELDS.idActivity]: 'Atividade',
  [OBJECTIVE_FIELDS.isActive]: 'Objetivo Ativo',
};

// =============================================
// VALORES PADRÃO
// =============================================

export const OBJECTIVE_DEFAULT_VALUES = {
  [OBJECTIVE_FIELDS.idObjective]: null,
  [OBJECTIVE_FIELDS.name]: '',
  [OBJECTIVE_FIELDS.description]: '',
  [OBJECTIVE_FIELDS.order]: 0,
  [OBJECTIVE_FIELDS.idActivity]: '',
  [OBJECTIVE_FIELDS.isActive]: true,
};

// =============================================
// VALIDAÇÃO DE CAMPOS
// =============================================

export const OBJECTIVE_VALIDATION_RULES = {
  [OBJECTIVE_FIELDS.name]: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  [OBJECTIVE_FIELDS.idActivity]: {
    required: true,
  },
};

// =============================================
// CONSTANTES DE PAGINAÇÃO
// =============================================

export const OBJECTIVE_LIST_DEFAULTS = {
  take: 25,
  skip: 0,
  maxTake: 50
};

// =============================================
// FILTROS DISPONÍVEIS
// =============================================

export const OBJECTIVE_FILTERS = {
  idActivity: 'idActivity',
  isActive: 'isActive',
};

// =============================================
// ORDENAÇÃO DISPONÍVEL
// =============================================

export const OBJECTIVE_SORT_OPTIONS = {
  name: 'name',
  idActivity: 'idActivity',
  createdAt: 'createdAt',
};
