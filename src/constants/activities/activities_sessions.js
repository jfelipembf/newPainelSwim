// Sessions (ocorrências geradas a partir das configs)

export const ACTIVITY_SESSION_FIELDS = {
  idActivitySession: "idActivitySession",
  idConfiguration: "idConfiguration",
  idActivity: "idActivity",
  activityDate: "activityDate",
  startTime: "startTime",
  endTime: "endTime",
  capacity: "capacity",
  ocupation: "ocupation",
  status: "status",
  idInstructor: "idInstructor",
  idArea: "idArea",
  allowChoosingSpot: "allowChoosingSpot",
  spots: "spots",
};

export const ACTIVITY_SESSION_DEFAULTS = {
  [ACTIVITY_SESSION_FIELDS.idActivitySession]: "",
  [ACTIVITY_SESSION_FIELDS.idConfiguration]: "",
  [ACTIVITY_SESSION_FIELDS.idActivity]: "",
  [ACTIVITY_SESSION_FIELDS.activityDate]: "",
  [ACTIVITY_SESSION_FIELDS.startTime]: "",
  [ACTIVITY_SESSION_FIELDS.endTime]: "",
  [ACTIVITY_SESSION_FIELDS.capacity]: 0,
  [ACTIVITY_SESSION_FIELDS.ocupation]: 0,
  [ACTIVITY_SESSION_FIELDS.status]: 1,
  [ACTIVITY_SESSION_FIELDS.idInstructor]: "",
  [ACTIVITY_SESSION_FIELDS.idArea]: "",
  [ACTIVITY_SESSION_FIELDS.allowChoosingSpot]: false,
  [ACTIVITY_SESSION_FIELDS.spots]: [],
};

export const ACTIVITY_SESSION_FILTERS = {
  idConfiguration: "idConfiguration",
  idActivity: "idActivity",
  startDate: "startDate",
  endDate: "endDate",
};
