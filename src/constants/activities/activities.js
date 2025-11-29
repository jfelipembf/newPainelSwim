// Activities (catálogo)

export const ACTIVITY_FIELDS = {
  idActivity: "idActivity",
  name: "name",
  description: "description",
  color: "color",
  photo: "photo",
  isActive: "isActive",
  capacityDefault: "capacityDefault",
  durationDefault: "durationDefault",
};

export const ACTIVITY_FIELD_LABELS = {
  [ACTIVITY_FIELDS.idActivity]: "ID da Atividade",
  [ACTIVITY_FIELDS.name]: "Nome",
  [ACTIVITY_FIELDS.description]: "Descrição",
  [ACTIVITY_FIELDS.color]: "Cor",
  [ACTIVITY_FIELDS.photo]: "Foto",
  [ACTIVITY_FIELDS.isActive]: "Ativa",
  [ACTIVITY_FIELDS.capacityDefault]: "Capacidade padrão",
  [ACTIVITY_FIELDS.durationDefault]: "Duração padrão (HH:MM)",
};

export const ACTIVITY_DEFAULT_VALUES = {
  [ACTIVITY_FIELDS.idActivity]: "",
  [ACTIVITY_FIELDS.name]: "",
  [ACTIVITY_FIELDS.description]: "",
  [ACTIVITY_FIELDS.color]: "#007bff",
  [ACTIVITY_FIELDS.photo]: "",
  [ACTIVITY_FIELDS.isActive]: true,
  [ACTIVITY_FIELDS.capacityDefault]: 0,
  [ACTIVITY_FIELDS.durationDefault]: "00:00",
};

export const ACTIVITY_LIST_DEFAULTS = {
  take: 25,
  skip: 0,
  maxTake: 50,
};

export const ACTIVITY_FILTERS = {
  name: "name",
  isActive: "isActive",
};
