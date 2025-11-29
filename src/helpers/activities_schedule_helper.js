import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";
import { getAuditHelper } from "./audit_helper";

class ActivitiesScheduleHelper {
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
      resource: AUDIT_RESOURCES.ACTIVITIES_SCHEDULE,
      resourceId,
      details,
    });
  }

  async createConfig(data) {
    const docRef = this.db.collection("activities_configs").doc();
    const payload = {
      ...data,
      idConfiguration: data.idConfiguration || docRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await docRef.set(payload);
    await this.logAudit(AUDIT_ACTIONS.CREATE_ACTIVITY, docRef.id, { config: payload });
    return { id: docRef.id, ...payload };
  }

  async listConfigs(filters = {}) {
    let query = this.db.collection("activities_configs");
    if (filters.idActivity) query = query.where("idActivity", "==", filters.idActivity);
    if (filters.idArea) query = query.where("idArea", "==", filters.idArea);
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getConfig(id) {
    const doc = await this.db.collection("activities_configs").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async updateConfig(id, updates) {
    const payload = {
      ...updates,
      idConfiguration: updates.idConfiguration || id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await this.db.collection("activities_configs").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_ACTIVITY, id, { updates: payload });
    return this.getConfig(id);
  }

  async deleteConfig(id) {
    if (!id) throw new Error("Config id is required");
    await this.db.collection("activities_configs").doc(id).delete();
    await this.logAudit(AUDIT_ACTIONS.DELETE_ACTIVITY, id);
    return true;
  }
}

let _activitiesScheduleHelper = null;
export const getActivitiesScheduleHelper = () => {
  if (!_activitiesScheduleHelper) _activitiesScheduleHelper = new ActivitiesScheduleHelper();
  return _activitiesScheduleHelper;
};
