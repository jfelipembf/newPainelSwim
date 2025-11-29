// Membership/Planos Constants
// Estrutura baseada na API W12 - Apidog Documentation

// =============================================
// CAMPOS PRINCIPAIS DO MEMBERSHIP
// =============================================

export const MEMBERSHIP_FIELDS = {
  // Identificação
  idMembership: 'idMembership',
  nameMembership: 'nameMembership',

  // Valores
  value: 'value',
  membershipValue: 'membershipValue',
  serviceValue: 'serviceValue',
  valuePromotionalPeriod: 'valuePromotionalPeriod',

  // Duração e Tipo
  duration: 'duration',
  durationType: 'durationType',
  membershipType: 'membershipType',
  inactive: 'inactive',

  // Regras de Cancelamento e Suspensão
  cancellationFine: 'cancellationFine',
  cancellationGracePeriod: 'cancellationGracePeriod',
  scheduleCancellation: 'scheduleCancellation',
  allowSuspension: 'allowSuspension',
  maxSuspensionDays: 'maxSuspensionDays',
  minSuspensionPeriod: 'minSuspensionPeriod',

  // Período Promocional
  typePromotionalPeriod: 'typePromotionalPeriod',
  monthsPromotionalPeriod: 'monthsPromotionalPeriod',
  daysPromotionalPeriod: 'daysPromotionalPeriod',
  installmentsPromotionalPeriod: 'installmentsPromotionalPeriod',

  // Descrições
  description: 'description',
  displayName: 'displayName',

  // Limitações de Acesso
  entries: 'entries',
  allowedDays: 'allowedDays',
  entriesQuantity: 'entriesQuantity',
  idEntriesType: 'idEntriesType',
  entriesTypeDescription: 'entriesTypeDescription',
  dailyLimit: 'dailyLimit',
  weeklyLimit: 'weeklyLimit',
  monthlyLimit: 'monthlyLimit',
};

// =============================================
// TIPOS DE DURAÇÃO
// =============================================

export const MEMBERSHIP_DURATION_TYPES = {
  DIARIA: 'Diária',
  SEMANAL: 'Semanal',
  MENSAL: 'Mensal',
  BIMESTRAL: 'Bimestral',
  TRIMESTRAL: 'Trimestral',
  SEMESTRAL: 'Semestral',
  ANUAL: 'Anual',
  VITALICIA: 'Vitalícia'
};

// =============================================
// TIPOS DE ENTRADA
// =============================================

export const MEMBERSHIP_ENTRY_TYPES = {
  UNLIMITED: 1,
  LIMITED_BY_QUANTITY: 2,
  LIMITED_BY_TIME: 3,
  LIMITED_BY_DAY: 4,
  LIMITED_BY_WEEK: 5,
  LIMITED_BY_MONTH: 6
};

export const MEMBERSHIP_ENTRY_TYPE_LABELS = {
  [MEMBERSHIP_ENTRY_TYPES.UNLIMITED]: 'Ilimitado',
  [MEMBERSHIP_ENTRY_TYPES.LIMITED_BY_QUANTITY]: 'Limitado por Quantidade',
  [MEMBERSHIP_ENTRY_TYPES.LIMITED_BY_TIME]: 'Limitado por Tempo',
  [MEMBERSHIP_ENTRY_TYPES.LIMITED_BY_DAY]: 'Limitado por Dia',
  [MEMBERSHIP_ENTRY_TYPES.LIMITED_BY_WEEK]: 'Limitado por Semana',
  [MEMBERSHIP_ENTRY_TYPES.LIMITED_BY_MONTH]: 'Limitado por Mês'
};

export const MEMBERSHIP_TYPES = {
  COMUM: 'Comum',
  EXTENSAO_PLANO: 'Extensão de Plano',
  EXTENSAO_BLOQUEIO: 'Extensão de Bloqueio',
  MENSAL_RECORRENTE: 'Mensal Recorrente',
  RECORRENTE_COM_VALIDADE: 'Recorrente Mensal com Validade',
  RECORRENTE_RENOVACAO_AUTO: 'Mensal Recorrente com Renovação Automática',
  DEPENDENTE_ADICIONAL: 'Dependente Adicional',
  ANUAL_COM_TERMINO: 'Anual com Data de Término Específica',
  CONTRATO_ADICIONAL: 'Contrato Adicional'
};

// =============================================
// DIAS DA SEMANA (0 = DOMINGO)
// =============================================

export const DAYS_OF_WEEK = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado'
};

export const DAYS_OF_WEEK_OPTIONS = Object.entries(DAYS_OF_WEEK).map(([value, label]) => ({
  value: parseInt(value),
  label
}));

// =============================================
// CÓDIGOS NUMÉRICOS DOS TIPOS
// =============================================

export const MEMBERSHIP_TYPE_CODES = {
  1: 'Comum',
  3: 'Extensão de Plano',
  4: 'Extensão de Bloqueio',
  5: 'Mensal Recorrente',
  6: 'Recorrente Mensal com Validade',
  7: 'Mensal Recorrente com Renovação Automática',
  8: 'Dependente Adicional',
  9: 'Anual com Data de Término Específica',
  10: 'Contrato Adicional'
};

// =============================================
// ESTRUTURA COMPLETA DE UM MEMBERSHIP
// =============================================

export const MEMBERSHIP_STRUCTURE = {
  // Campos obrigatórios
  required: [
    'idMembership',
    'nameMembership',
    'value',
    'duration',
    'durationType',
    'membershipType',
    'inactive'
  ],

  // Campos opcionais
  optional: [
    'description',
    'maxAmountInstallments',
    'displayName',
    'updateDate'
  ],

  // Campos promocionais
  promotional: [
    'typePromotionalPeriod',
    'valuePromotionalPeriod',
    'monthsPromotionalPeriod',
    'daysPromotionalPeriod',
    'installmentsPromotionalPeriod'
  ],

  // Campos de arrays/relacionamentos
  relationships: [
    'differentials',
    'activitiesGroups',
    'additionalService',
    'serviceYearly',
    'entries'
  ],
};

// =============================================
// ESTRUTURA DO DIFERENCIAL (BENEFÍCIO)
// =============================================

export const MEMBERSHIP_DIFFERENTIAL_STRUCTURE = {
  id: 'id',
  name: 'name',
  description: 'description',
  active: 'active'
};

// =============================================
// ESTRUTURA DO GRUPO DE ATIVIDADES
// =============================================

export const MEMBERSHIP_ACTIVITY_GROUP_STRUCTURE = {
  idActivityGroup: 'idActivityGroup',
  name: 'name',
  description: 'description',
  active: 'active'
};

// =============================================
// ESTRUTURA DO SERVIÇO ADICIONAL
// =============================================

export const MEMBERSHIP_ADDITIONAL_SERVICE_STRUCTURE = {
  idService: 'idService',
  name: 'name',
  value: 'value'
};

// =============================================
// ESTRUTURA DO SERVIÇO ANUAL
// =============================================

export const MEMBERSHIP_YEARLY_SERVICE_STRUCTURE = {
  idService: 'idService',
  name: 'name',
  value: 'value',
  type: 'type',
  billingMonth: 'billingMonth',
  billingDay: 'billingDay',
  billingAfterMonths: 'billingAfterMonths',
  installments: 'installments'
};

// =============================================
// ESTRUTURA DAS ENTRADAS (ACESSOS)
// =============================================

export const MEMBERSHIP_ENTRIES_STRUCTURE = {
  unlimited: 'unlimited',
  allowedDays: 'allowedDays',
  dailyLimit: 'dailyLimit',
  weeklyLimit: 'weeklyLimit',
  monthlyLimit: 'monthlyLimit',
  entriesQuantity: 'entriesQuantity',
  idEntriesType: 'idEntriesType',
  entriesTypeDescription: 'entriesTypeDescription'
};

// =============================================
// LABELS PARA FORMULÁRIOS
// =============================================

export const MEMBERSHIP_FIELD_LABELS = {
  [MEMBERSHIP_FIELDS.idMembership]: 'ID do Plano',
  [MEMBERSHIP_FIELDS.nameMembership]: 'Nome do Plano',
  [MEMBERSHIP_FIELDS.value]: 'Valor do Plano (R$)',
  [MEMBERSHIP_FIELDS.membershipValue]: 'Valor de Venda (R$)',
  [MEMBERSHIP_FIELDS.serviceValue]: 'Valor do Serviço (R$)',
  [MEMBERSHIP_FIELDS.valuePromotionalPeriod]: 'Valor Promocional (R$)',
  [MEMBERSHIP_FIELDS.duration]: 'Duração',
  [MEMBERSHIP_FIELDS.durationType]: 'Tipo de Duração',
  [MEMBERSHIP_FIELDS.membershipType]: 'Tipo de Plano',
  [MEMBERSHIP_FIELDS.inactive]: 'Inativo',
  [MEMBERSHIP_FIELDS.cancellationFine]: 'Multa de Cancelamento (%)',
  [MEMBERSHIP_FIELDS.cancellationGracePeriod]: 'Período de Carência para Cancelamento (dias)',
  [MEMBERSHIP_FIELDS.scheduleCancellation]: 'Permitir Agendar Cancelamento',
  [MEMBERSHIP_FIELDS.allowSuspension]: 'Permitir Suspensão (via solicitação)',
  [MEMBERSHIP_FIELDS.maxSuspensionDays]: 'Máximo de Dias de Suspensão',
  [MEMBERSHIP_FIELDS.minSuspensionPeriod]: 'Período Mínimo Entre Suspensões (dias)',
  [MEMBERSHIP_FIELDS.typePromotionalPeriod]: 'Tipo de Período Promocional',
  [MEMBERSHIP_FIELDS.monthsPromotionalPeriod]: 'Meses Promocionais',
  [MEMBERSHIP_FIELDS.daysPromotionalPeriod]: 'Dias Promocionais',
  [MEMBERSHIP_FIELDS.installmentsPromotionalPeriod]: 'Parcelas Promocionais',
  [MEMBERSHIP_FIELDS.description]: 'Descrição',
  [MEMBERSHIP_FIELDS.displayName]: 'Nome de Exibição',
  [MEMBERSHIP_FIELDS.updateDate]: 'Data de Atualização',
  [MEMBERSHIP_FIELDS.differentials]: 'Diferenciais/Benefícios',
  [MEMBERSHIP_FIELDS.activitiesGroups]: 'Grupos de Atividades',
  [MEMBERSHIP_FIELDS.entries]: 'Configuração de Entradas',
  [MEMBERSHIP_FIELDS.allowedDays]: 'Dias Permitidos',
  [MEMBERSHIP_FIELDS.entriesQuantity]: 'Quantidade de Entradas',
  [MEMBERSHIP_FIELDS.idEntriesType]: 'Tipo de Entrada',
  [MEMBERSHIP_FIELDS.entriesTypeDescription]: 'Descrição do Tipo',
  [MEMBERSHIP_FIELDS.dailyLimit]: 'Limite Diário',
  [MEMBERSHIP_FIELDS.weeklyLimit]: 'Limite Semanal',
  [MEMBERSHIP_FIELDS.monthlyLimit]: 'Limite Mensal'
};

// =============================================
// VALORES PADRÃO PARA NOVO MEMBERSHIP
// =============================================

export const MEMBERSHIP_DEFAULT_VALUES = {
  [MEMBERSHIP_FIELDS.idMembership]: null,
  [MEMBERSHIP_FIELDS.nameMembership]: '',
  [MEMBERSHIP_FIELDS.value]: 0.00,
  [MEMBERSHIP_FIELDS.membershipValue]: 0.00,
  [MEMBERSHIP_FIELDS.serviceValue]: 0.00,
  [MEMBERSHIP_FIELDS.valuePromotionalPeriod]: null,
  [MEMBERSHIP_FIELDS.duration]: 30,
  [MEMBERSHIP_FIELDS.durationType]: MEMBERSHIP_DURATION_TYPES.MENSAL,
  [MEMBERSHIP_FIELDS.membershipType]: MEMBERSHIP_TYPES.COMUM,
  [MEMBERSHIP_FIELDS.inactive]: false,
  [MEMBERSHIP_FIELDS.cancellationFine]: null,
  [MEMBERSHIP_FIELDS.cancellationGracePeriod]: null,
  [MEMBERSHIP_FIELDS.scheduleCancellation]: false,
  [MEMBERSHIP_FIELDS.allowSuspension]: false,
  [MEMBERSHIP_FIELDS.maxSuspensionDays]: null,
  [MEMBERSHIP_FIELDS.minSuspensionPeriod]: null,
  [MEMBERSHIP_FIELDS.typePromotionalPeriod]: 0,
  [MEMBERSHIP_FIELDS.monthsPromotionalPeriod]: null,
  [MEMBERSHIP_FIELDS.daysPromotionalPeriod]: 0,
  [MEMBERSHIP_FIELDS.installmentsPromotionalPeriod]: null,
  [MEMBERSHIP_FIELDS.description]: '',
  [MEMBERSHIP_FIELDS.displayName]: '',
  [MEMBERSHIP_FIELDS.updateDate]: null,
  [MEMBERSHIP_FIELDS.differentials]: [],
  [MEMBERSHIP_FIELDS.activitiesGroups]: [],
  [MEMBERSHIP_FIELDS.additionalService]: null,
  [MEMBERSHIP_FIELDS.serviceYearly]: null,
  [MEMBERSHIP_FIELDS.entries]: {
    unlimited: true,
    allowedDays: [],
    dailyLimit: null,
    weeklyLimit: null,
    monthlyLimit: null,
    entriesQuantity: null,
    idEntriesType: null,
    entriesTypeDescription: null
  }
};

// =============================================
// VALIDAÇÃO DE CAMPOS
// =============================================

export const MEMBERSHIP_VALIDATION_RULES = {
  [MEMBERSHIP_FIELDS.nameMembership]: {
    required: true,
    minLength: 3,
    maxLength: 100
  },
  [MEMBERSHIP_FIELDS.value]: {
    required: true,
    min: 0.01,
    type: 'number'
  },
  [MEMBERSHIP_FIELDS.membershipValue]: {
    min: 0,
    type: 'number'
  },
  [MEMBERSHIP_FIELDS.duration]: {
    required: true,
    min: 1,
    type: 'integer'
  },
  [MEMBERSHIP_FIELDS.maxAmountInstallments]: {
    min: 1,
    max: 60,
    type: 'integer'
  },
  [MEMBERSHIP_FIELDS.entriesQuantity]: {
    min: 1,
    type: 'integer'
  },
  [MEMBERSHIP_FIELDS.cancellationFine]: {
    min: 0,
    type: 'number'
  },
  [MEMBERSHIP_FIELDS.cancellationGracePeriod]: {
    min: 0,
    type: 'integer'
  },
  [MEMBERSHIP_FIELDS.maxSuspensionDays]: {
    min: 1,
    type: 'integer'
  },
  [MEMBERSHIP_FIELDS.minSuspensionPeriod]: {
    min: 1,
    type: 'integer'
  },
  // sem validação específica para suspensãoReason, campo removido
};

// =============================================
// CONSTANTES DE PAGINAÇÃO PARA LISTAGEM
// =============================================

export const MEMBERSHIP_LIST_DEFAULTS = {
  take: 25,
  skip: 0,
  maxTake: 50
};

// =============================================
// FILTROS DISPONÍVEIS PARA LISTAGEM
// =============================================

export const MEMBERSHIP_FILTERS = {
  idMembership: 'idMembership',
  name: 'name',
  active: 'active',
  updateDate: 'updateDate'
};

// =============================================
// ORDENAÇÃO DISPONÍVEL
// =============================================

export const MEMBERSHIP_SORT_OPTIONS = {
  name: 'nameMembership',
  value: 'value',
  updateDate: 'updateDate',
  id: 'idMembership'
};

// =============================================
// ESTADOS POSSÍVEIS
// =============================================

export const MEMBERSHIP_STATUS = {
  ACTIVE: false,    // inactive: false = ativo
  INACTIVE: true    // inactive: true = inativo
};
