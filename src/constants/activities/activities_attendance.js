// Presenças por sessão

export const ACTIVITY_ATTENDANCE_FIELDS = {
  idAttendance: "idAttendance",
  idActivitySession: "idActivitySession",
  idConfiguration: "idConfiguration",
  idMember: "idMember",
  status: "status", // present|absent|justified
  checkInAt: "checkInAt",
};

export const ACTIVITY_ATTENDANCE_DEFAULTS = {
  [ACTIVITY_ATTENDANCE_FIELDS.idAttendance]: "",
  [ACTIVITY_ATTENDANCE_FIELDS.idActivitySession]: "",
  [ACTIVITY_ATTENDANCE_FIELDS.idConfiguration]: "",
  [ACTIVITY_ATTENDANCE_FIELDS.idMember]: "",
  [ACTIVITY_ATTENDANCE_FIELDS.status]: "absent",
  [ACTIVITY_ATTENDANCE_FIELDS.checkInAt]: "",
};
