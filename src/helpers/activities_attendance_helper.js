import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";
import { getAuditHelper } from "./audit_helper";

class ActivitiesAttendanceHelper {
  constructor() {
    if (!firebase.apps.length) throw new Error("Firebase app not initialized");
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  logAudit(action, resourceId, details = {}) {
    const auditHelper = getAuditHelper?.();
    if (!auditHelper) return;
    const actor = this.auth.currentUser;
    const actorEmail = actor?.email || "";
    const actorName = actor?.displayName || actorEmail || "unknown";
    return auditHelper.logActivity({
      userId: actor?.uid || "unknown",
      userEmail: actorEmail,
      userName: actorName,
      userRole: "admin",
      action,
      resource: AUDIT_RESOURCES.ACTIVITIES,
      resourceId,
      details,
    });
  }

  async listAttendance(idActivitySession) {
    let query = this.db.collection("activities_attendance");
    if (idActivitySession) query = query.where("idActivitySession", "==", idActivitySession);
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async markAttendance({ idActivitySession, idMember, status = "present", idConfiguration }) {
    const docRef = this.db.collection("activities_attendance").doc();
    const payload = {
      idAttendance: docRef.id,
      idActivitySession,
      idConfiguration: idConfiguration || "",
      idMember,
      status,
      checkInAt: new Date().toISOString(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await docRef.set(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_ACTIVITY, docRef.id, { attendance: payload });
    return { id: docRef.id, ...payload };
  }
}

let _activitiesAttendanceHelper = null;
export const getActivitiesAttendanceHelper = () => {
  if (!_activitiesAttendanceHelper) _activitiesAttendanceHelper = new ActivitiesAttendanceHelper();
  return _activitiesAttendanceHelper;
};
