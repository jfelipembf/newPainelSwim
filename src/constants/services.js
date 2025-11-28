// Services Constants
// Estrutura baseada na API W12 - Apidog Documentation

// =============================================
// CAMPOS PRINCIPAIS DO SERVICE
// =============================================

export const SERVICE_FIELDS = {
  // Identificação
  idService: 'idService',
  nameService: 'nameService',

  // Valores
  value: 'value',

  // Configurações
  isActive: 'isActive',
  onlineSalesObservations: 'onlineSalesObservations',
};

// =============================================
// TIPOS DE SERVIÇOS
// =============================================

export const SERVICE_TYPES = {
  PERSONAL_TRAINING: 'Treino Personalizado',
  GROUP_CLASS: 'Aula em Grupo',
  SWIMMING_LESSON: 'Aula de Natação',
  MASSAGE: 'Massagem',
  PHYSIOTHERAPY: 'Fisioterapia',
  NUTRITIONAL_ADVICE: 'Orientação Nutricional',
  ASSESSMENT: 'Avaliação',
  CONSULTATION: 'Consulta',
};

// =============================================
// CATEGORIAS DE SERVIÇOS
// =============================================

export const SERVICE_CATEGORIES = {
  FITNESS: 'Fitness',
  WELLNESS: 'Bem-estar',
  HEALTH: 'Saúde',
  SPORTS: 'Esportes',
  THERAPEUTIC: 'Terapêutico',
  EDUCATIONAL: 'Educacional',
};

// =============================================
// LABELS PARA FORMULÁRIOS
// =============================================

export const SERVICE_FIELD_LABELS = {
  [SERVICE_FIELDS.idService]: 'ID do Serviço',
  [SERVICE_FIELDS.nameService]: 'Nome do Serviço',
  [SERVICE_FIELDS.value]: 'Valor do Serviço (R$)',
  [SERVICE_FIELDS.isActive]: 'Serviço Ativo',
  [SERVICE_FIELDS.onlineSalesObservations]: 'Observações de Venda Online',
};

// =============================================
// VALORES PADRÃO PARA NOVO SERVICE
// =============================================

export const SERVICE_DEFAULT_VALUES = {
  [SERVICE_FIELDS.idService]: null,
  [SERVICE_FIELDS.nameService]: '',
  [SERVICE_FIELDS.value]: 0.00,
  [SERVICE_FIELDS.isActive]: true,
  [SERVICE_FIELDS.onlineSalesObservations]: '',
};

// =============================================
// VALIDAÇÃO DE CAMPOS
// =============================================

export const SERVICE_VALIDATION_RULES = {
  [SERVICE_FIELDS.nameService]: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  [SERVICE_FIELDS.value]: {
    required: true,
    min: 0,
    type: 'number'
  },
};

// =============================================
// CONSTANTES DE PAGINAÇÃO PARA LISTAGEM
// =============================================

export const SERVICE_LIST_DEFAULTS = {
  take: 25,
  skip: 0,
  maxTake: 50
};

// =============================================
// FILTROS DISPONÍVEIS PARA LISTAGEM
// =============================================

export const SERVICE_FILTERS = {
  idService: 'idService',
  nameService: 'nameService',
  active: 'active',
};

// =============================================
// ORDENAÇÃO DISPONÍVEL
// =============================================

export const SERVICE_SORT_OPTIONS = {
  nameService: 'nameService',
  value: 'value',
  idService: 'idService'
};

// =============================================
// ESTADOS POSSÍVEIS
// =============================================

export const SERVICE_STATUS = {
  ACTIVE: false,    // inactive: false = ativo
  INACTIVE: true    // inactive: true = inativo
};
