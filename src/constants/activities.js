// Activities Constants
// Estrutura baseada na API W12 - Apidog Documentation

// =============================================
// CAMPOS PRINCIPAIS DA ATIVIDADE
// =============================================

export const ACTIVITY_FIELDS = {
  // Identificação
  idActivity: 'idActivity',
  name: 'name',
  description: 'description',

  // Apresentação
  photo: 'photo',
  color: 'color',

  // Controle
  isActive: 'isActive',
  inactive: 'inactive',
  capacityDefault: 'capacityDefault',
  durationDefault: 'durationDefault',
  totalRecords: 'totalRecords',
};

// =============================================
// TIPOS DE ATIVIDADES
// =============================================

export const ACTIVITY_TYPES = {
  FITNESS: 'Fitness',
  SWIMMING: 'Natação',
  MARTIAL_ARTS: 'Artes Marciais',
  DANCE: 'Dança',
  PILATES: 'Pilates',
  YOGA: 'Yoga',
  CROSSFIT: 'Crossfit',
  FUNCTIONAL: 'Funcional',
  SPINNING: 'Spinning',
  AEROBICS: 'Aeróbica',
};

// =============================================
// STATUS POSSÍVEIS
// =============================================

export const ACTIVITY_STATUS = {
  ACTIVE: false,      // inactive: false = ativo
  INACTIVE: true      // inactive: true = inativo
};

// =============================================
// LABELS PARA FORMULÁRIOS
// =============================================

export const ACTIVITY_FIELD_LABELS = {
  [ACTIVITY_FIELDS.idActivity]: 'ID da Atividade',
  [ACTIVITY_FIELDS.name]: 'Nome da Atividade',
  [ACTIVITY_FIELDS.description]: 'Descrição',
  [ACTIVITY_FIELDS.photo]: 'Foto da Atividade',
  [ACTIVITY_FIELDS.color]: 'Cor da Atividade',
  [ACTIVITY_FIELDS.isActive]: 'Ativo',
  [ACTIVITY_FIELDS.inactive]: 'Inativo',
  [ACTIVITY_FIELDS.capacityDefault]: 'Capacidade padrão',
  [ACTIVITY_FIELDS.durationDefault]: 'Duração padrão (HH:MM)',
  [ACTIVITY_FIELDS.totalRecords]: 'Total de Registros',
};

// =============================================
// VALORES PADRÃO PARA NOVA ATIVIDADE
// =============================================

export const ACTIVITY_DEFAULT_VALUES = {
  [ACTIVITY_FIELDS.idActivity]: null,
  [ACTIVITY_FIELDS.name]: '',
  [ACTIVITY_FIELDS.description]: '',
  [ACTIVITY_FIELDS.photo]: '',
  [ACTIVITY_FIELDS.color]: '#007bff',
  [ACTIVITY_FIELDS.isActive]: true,
  [ACTIVITY_FIELDS.inactive]: false,
  [ACTIVITY_FIELDS.capacityDefault]: 0,
  [ACTIVITY_FIELDS.durationDefault]: '00:00',
  [ACTIVITY_FIELDS.totalRecords]: 0,
};

// =============================================
// VALIDAÇÃO DE CAMPOS
// =============================================

export const ACTIVITY_VALIDATION_RULES = {
  [ACTIVITY_FIELDS.name]: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  [ACTIVITY_FIELDS.description]: {
    required: false,
    maxLength: 500
  },
  [ACTIVITY_FIELDS.color]: {
    required: true,
    pattern: /^#[0-9A-F]{6}$/i  // Formato hexadecimal
  },
  [ACTIVITY_FIELDS.capacityDefault]: {
    required: true,
    min: 0,
    type: 'integer'
  },
  [ACTIVITY_FIELDS.durationDefault]: {
    required: true,
    pattern: /^([0-1]\d|2[0-3]):[0-5]\d$/ // HH:MM 00-23:00-59
  },
};

// =============================================
// CONSTANTES DE PAGINAÇÃO PARA LISTAGEM
// =============================================

export const ACTIVITY_LIST_DEFAULTS = {
  take: 25,
  skip: 0,
  maxTake: 50
};

// =============================================
// FILTROS DISPONÍVEIS PARA LISTAGEM
// =============================================

export const ACTIVITY_FILTERS = {
  idActivity: 'idActivity',
  name: 'name',
  active: 'active',
  search: 'search'
};

// =============================================
// ORDENAÇÃO DISPONÍVEL
// =============================================

export const ACTIVITY_SORT_OPTIONS = {
  name: 'name',
  idActivity: 'idActivity'
};
