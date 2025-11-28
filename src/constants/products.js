// Products Constants
// Estrutura baseada na API W12 - Apidog Documentation

// =============================================
// CAMPOS PRINCIPAIS DO PRODUCT
// =============================================

export const PRODUCT_FIELDS = {
  // Identificação
  idProduct: 'idProduct',
  name: 'name',
  description: 'description',

  // Apresentação
  photoUrl: 'photoUrl',
  isActive: 'isActive',

  // Valores
  itemValue: 'itemValue',
  saleValue: 'saleValue',
  quantity: 'quantity',
};

// =============================================
// TIPOS DE PRODUTOS
// =============================================

export const PRODUCT_TYPES = {
  ITEM: 'Item',
  SERVICE: 'Serviço',
  EQUIPMENT: 'Equipamento',
  SUPPLEMENT: 'Suplemento',
  ACCESSORY: 'Acessório',
};

// =============================================
// CATEGORIAS DE PRODUTOS
// =============================================

export const PRODUCT_CATEGORIES = {
  FITNESS: 'Fitness',
  NUTRITION: 'Nutrição',
  SWIMMING: 'Natação',
  EQUIPMENT: 'Equipamentos',
  CLOTHING: 'Vestuário',
  ACCESSORIES: 'Acessórios',
};

// =============================================
// LABELS PARA FORMULÁRIOS
// =============================================

export const PRODUCT_FIELD_LABELS = {
  [PRODUCT_FIELDS.idProduct]: 'ID do Produto',
  [PRODUCT_FIELDS.name]: 'Nome do Produto',
  [PRODUCT_FIELDS.description]: 'Descrição',
  [PRODUCT_FIELDS.photoUrl]: 'Foto do Produto',
  [PRODUCT_FIELDS.isActive]: 'Produto Ativo',
  [PRODUCT_FIELDS.itemValue]: 'Valor de compra (R$)',
  [PRODUCT_FIELDS.saleValue]: 'Valor de Venda (R$)',
  [PRODUCT_FIELDS.quantity]: 'Quantidade',
};

// =============================================
// VALORES PADRÃO PARA NOVO PRODUCT
// =============================================

export const PRODUCT_DEFAULT_VALUES = {
  [PRODUCT_FIELDS.idProduct]: null,
  [PRODUCT_FIELDS.name]: '',
  [PRODUCT_FIELDS.description]: '',
  [PRODUCT_FIELDS.photoUrl]: '',
  [PRODUCT_FIELDS.isActive]: true,
  [PRODUCT_FIELDS.itemValue]: 0.00,
  [PRODUCT_FIELDS.saleValue]: 0.00,
  [PRODUCT_FIELDS.quantity]: 1,
};

// =============================================
// VALIDAÇÃO DE CAMPOS
// =============================================

export const PRODUCT_VALIDATION_RULES = {
  [PRODUCT_FIELDS.name]: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  [PRODUCT_FIELDS.itemValue]: {
    required: true,
    min: 0,
    type: 'number'
  },
  [PRODUCT_FIELDS.saleValue]: {
    min: 0,
    type: 'number'
  },
  [PRODUCT_FIELDS.quantity]: {
    required: true,
    min: 1,
    type: 'integer'
  },
};

// =============================================
// CONSTANTES DE PAGINAÇÃO PARA LISTAGEM
// =============================================

export const PRODUCT_LIST_DEFAULTS = {
  take: 25,
  skip: 0,
  maxTake: 50
};

// =============================================
// FILTROS DISPONÍVEIS PARA LISTAGEM
// =============================================

export const PRODUCT_FILTERS = {
  idProduct: 'idProduct',
  name: 'name',
  category: 'category',
  active: 'active'
};

// =============================================
// ORDENAÇÃO DISPONÍVEL
// =============================================

export const PRODUCT_SORT_OPTIONS = {
  name: 'name',
  itemValue: 'itemValue',
  saleValue: 'saleValue',
  quantity: 'quantity'
};

// =============================================
// ESTADOS POSSÍVEIS
// =============================================

export const PRODUCT_STATUS = {
  ACTIVE: true,
  INACTIVE: false
};
