import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";
import { getAuditHelper } from "./audit_helper";

class ActivitiesEnrollmentsHelper {
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

  async enroll(data) {
    const docRef = this.db.collection("activities_enrollments").doc();
    const payload = {
      ...data,
      idEnrollment: data.idEnrollment || docRef.id,
      status: data.status || "active",
      enrollDate: data.enrollDate || new Date().toISOString().slice(0, 10),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await docRef.set(payload);
    await this.logAudit(AUDIT_ACTIONS.CREATE_ACTIVITY, docRef.id, { enrollment: payload });
    return { id: docRef.id, ...payload };
  }

  async unenroll(id, cancelDate = new Date().toISOString().slice(0, 10)) {
    const payload = {
      status: "canceled",
      cancelDate,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await this.db.collection("activities_enrollments").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_ACTIVITY, id, { unenroll: payload });
    const doc = await this.db.collection("activities_enrollments").doc(id).get();
    return { id: doc.id, ...doc.data() };
  }

  async listEnrollments(filters = {}) {
    let query = this.db.collection("activities_enrollments");
    if (filters.idConfiguration) query = query.where("idConfiguration", "==", filters.idConfiguration);
    if (filters.idMember) query = query.where("idMember", "==", filters.idMember);
    if (filters.status) query = query.where("status", "==", filters.status);
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}

let _activitiesEnrollmentsHelper = null;
export const getActivitiesEnrollmentsHelper = () => {
  if (!_activitiesEnrollmentsHelper) _activitiesEnrollmentsHelper = new ActivitiesEnrollmentsHelper();
  return _activitiesEnrollmentsHelper;
};
