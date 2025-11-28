import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";
import { getAuditHelper } from "./audit_helper";
import { getStorageHelper } from "./storage_helper";

class ServicesHelper {
  constructor() {
    if (!firebase.apps.length) {
      throw new Error("Firebase app not initialized");
    }

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
      resource: AUDIT_RESOURCES.SERVICES,
      resourceId,
      details,
    });
  }

  async uploadPhoto(file) {
    if (!file || !this.storageHelper) return "";
    const path = `services/${Date.now()}_${file.name}`;
    const uploadResult = await this.storageHelper.uploadPhoto(file, path);
    return uploadResult.url;
  }

  async createService(data) {
    const docRef = this.db.collection("services").doc();
    const payload = {
      ...data,
      idService: data.idService || docRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await docRef.set(payload);
    await this.logAudit(AUDIT_ACTIONS.CREATE_SERVICE, docRef.id, { service: payload });
    return { id: docRef.id, ...payload };
  }

  async listServices() {
    const snapshot = await this.db.collection("services").get();
    return snapshot.docs.map((doc) => {
      const data = doc.data() || {};
      return { id: doc.id, idService: data.idService || doc.id, ...data };
    });
  }

  async getService(id) {
    const doc = await this.db.collection("services").doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data() || {};
    return { id: doc.id, idService: data.idService || doc.id, ...data };
  }

  async updateService(id, updates) {
    const payload = {
      ...updates,
      idService: updates.idService || id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await this.db.collection("services").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_SERVICE, id, { updates: payload });
    return this.getService(id);
  }

  async deleteService(id) {
    if (!id) {
      throw new Error("Service id is required for deletion");
    }

    await this.db.collection("services").doc(id).delete();
    await this.logAudit(AUDIT_ACTIONS.DELETE_SERVICE, id);
    return true;
  }
}

let _servicesHelper = null;

export const getServicesHelper = () => {
  if (!_servicesHelper) {
    _servicesHelper = new ServicesHelper();
  }
  return _servicesHelper;
};
