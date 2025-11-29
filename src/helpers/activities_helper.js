import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";
import { getAuditHelper } from "./audit_helper";
import { getStorageHelper } from "./storage_helper";

class ActivitiesHelper {
  constructor() {
    if (!firebase.apps.length) throw new Error("Firebase app not initialized");
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.storageHelper = getStorageHelper?.();
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

  async uploadPhoto(file) {
    if (!file || !this.storageHelper) return "";
    const path = `activities/${Date.now()}_${file.name}`;
    const uploadResult = await this.storageHelper.uploadPhoto(file, path);
    return uploadResult.url;
  }

  async createActivity(data) {
    const docRef = this.db.collection("activities").doc();
    const payload = {
      ...data,
      idActivity: data.idActivity || docRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await docRef.set(payload);
    await this.logAudit(AUDIT_ACTIONS.CREATE_ACTIVITY, docRef.id, { activity: payload });
    return { id: docRef.id, ...payload };
  }

  async listActivities() {
    const snapshot = await this.db.collection("activities").get();
    return snapshot.docs.map((doc) => {
      const data = doc.data() || {};
      return { id: doc.id, idActivity: data.idActivity || doc.id, ...data };
    });
  }

  async getActivity(id) {
    const doc = await this.db.collection("activities").doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data() || {};
    return { id: doc.id, idActivity: data.idActivity || doc.id, ...data };
  }

  async updateActivity(id, updates) {
    const payload = {
      ...updates,
      idActivity: updates.idActivity || id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await this.db.collection("activities").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_ACTIVITY, id, { updates: payload });
    return this.getActivity(id);
  }

  async deleteActivity(id) {
    if (!id) throw new Error("Activity id is required for deletion");
    await this.db.collection("activities").doc(id).delete();
    await this.logAudit(AUDIT_ACTIONS.DELETE_ACTIVITY, id);
    return true;
  }
}

let _activitiesHelper = null;
export const getActivitiesHelper = () => {
  if (!_activitiesHelper) _activitiesHelper = new ActivitiesHelper();
  return _activitiesHelper;
};
