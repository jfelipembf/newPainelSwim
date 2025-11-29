export const ACTIVITY_CONFIG_FIELDS = {
  idConfiguration: "idConfiguration",
  idActivity: "idActivity",
  activityName: "activityName",
  activityColor: "activityColor",
  idArea: "idArea",
  areaName: "areaName",
  idInstructor: "idInstructor",
  instructorName: "instructorName",
  capacity: "capacity",
  startDate: "startDate",
  endDate: "endDate",
  startTime: "startTime",
  duration: "duration",
  daysOfWeek: "daysOfWeek",
  code: "code",
  status: "status",
  allowChoosingSpot: "allowChoosingSpot",
};

export const ACTIVITY_CONFIG_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const ACTIVITY_CONFIG_STATUS_LABELS = {
  [ACTIVITY_CONFIG_STATUS.ACTIVE]: "Ativa",
  [ACTIVITY_CONFIG_STATUS.INACTIVE]: "Inativa",
};

export const ACTIVITY_CONFIG_FIELD_LABELS = {
  [ACTIVITY_CONFIG_FIELDS.idConfiguration]: "ID da Configuração",
  [ACTIVITY_CONFIG_FIELDS.idActivity]: "Atividade",
  [ACTIVITY_CONFIG_FIELDS.idArea]: "Área",
  [ACTIVITY_CONFIG_FIELDS.idInstructor]: "Instrutor",
  [ACTIVITY_CONFIG_FIELDS.capacity]: "Capacidade",
  [ACTIVITY_CONFIG_FIELDS.startDate]: "Data inicial",
  [ACTIVITY_CONFIG_FIELDS.endDate]: "Data final",
  [ACTIVITY_CONFIG_FIELDS.startTime]: "Horário inicial",
  [ACTIVITY_CONFIG_FIELDS.duration]: "Duração (min)",
  [ACTIVITY_CONFIG_FIELDS.daysOfWeek]: "Dias da semana",
  [ACTIVITY_CONFIG_FIELDS.code]: "Código",
  [ACTIVITY_CONFIG_FIELDS.status]: "Status",
  [ACTIVITY_CONFIG_FIELDS.allowChoosingSpot]: "Permitir escolha de vaga",
};

export const ACTIVITY_CONFIG_DEFAULT_VALUES = {
  [ACTIVITY_CONFIG_FIELDS.idConfiguration]: "",
  [ACTIVITY_CONFIG_FIELDS.idActivity]: "",
  [ACTIVITY_CONFIG_FIELDS.activityName]: "",
  [ACTIVITY_CONFIG_FIELDS.activityColor]: "",
  [ACTIVITY_CONFIG_FIELDS.idArea]: "",
  [ACTIVITY_CONFIG_FIELDS.areaName]: "",
  [ACTIVITY_CONFIG_FIELDS.idInstructor]: "",
  [ACTIVITY_CONFIG_FIELDS.instructorName]: "",
  [ACTIVITY_CONFIG_FIELDS.capacity]: 0,
  [ACTIVITY_CONFIG_FIELDS.startDate]: "",
  [ACTIVITY_CONFIG_FIELDS.endDate]: "",
  [ACTIVITY_CONFIG_FIELDS.startTime]: "",
  [ACTIVITY_CONFIG_FIELDS.duration]: 60,
  [ACTIVITY_CONFIG_FIELDS.daysOfWeek]: [],
  [ACTIVITY_CONFIG_FIELDS.code]: "",
  [ACTIVITY_CONFIG_FIELDS.status]: ACTIVITY_CONFIG_STATUS.ACTIVE,
  [ACTIVITY_CONFIG_FIELDS.allowChoosingSpot]: false,
};
