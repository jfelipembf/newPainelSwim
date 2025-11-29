// Matrículas em turma (config)

export const ACTIVITY_ENROLLMENT_FIELDS = {
  idEnrollment: "idEnrollment",
  idConfiguration: "idConfiguration",
  idMember: "idMember",
  enrollDate: "enrollDate",
  cancelDate: "cancelDate",
  status: "status", // active|canceled
};

export const ACTIVITY_ENROLLMENT_DEFAULTS = {
  [ACTIVITY_ENROLLMENT_FIELDS.idEnrollment]: "",
  [ACTIVITY_ENROLLMENT_FIELDS.idConfiguration]: "",
  [ACTIVITY_ENROLLMENT_FIELDS.idMember]: "",
  [ACTIVITY_ENROLLMENT_FIELDS.enrollDate]: "",
  [ACTIVITY_ENROLLMENT_FIELDS.cancelDate]: "",
  [ACTIVITY_ENROLLMENT_FIELDS.status]: "active",
};

export const ACTIVITY_ENROLLMENT_FILTERS = {
  idConfiguration: "idConfiguration",
  idMember: "idMember",
  status: "status",
};
