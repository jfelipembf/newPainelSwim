import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuditHelper } from "./audit_helper";
import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";
import { getStorageHelper } from "./storage_helper";

class AreasHelper {
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
      resource: AUDIT_RESOURCES.AREAS,
      resourceId,
      details,
    });
  }

  async uploadPhoto(file) {
    if (!file || !this.storageHelper) return "";
    const path = `areas/${Date.now()}_${file.name}`;
    const uploadResult = await this.storageHelper.uploadPhoto(file, path);
    return uploadResult.url;
  }

  async createArea(areaData) {
    const docRef = this.db.collection("areas").doc();
    const idArea = docRef.id;

    const docData = {
      ...areaData,
      idArea,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await docRef.set(docData);
    await this.logAudit(AUDIT_ACTIONS.CREATE_AREA, docRef.id, { areaData: docData });
    return { id: docRef.id, ...docData };
  }

  async listAreas() {
    const snapshot = await this.db.collection("areas").get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, idArea: data.idArea || doc.id, ...data };
    });
  }

  async getArea(id) {
    const doc = await this.db.collection("areas").doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();
    return { id: doc.id, idArea: data.idArea || doc.id, ...data };
  }

  async updateArea(id, updates) {
    const payload = {
      ...updates,
      idArea: updates.idArea || id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await this.db.collection("areas").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_AREA, id, { updates });
    return this.getArea(id);
  }

  async deleteArea(id) {
    await this.db.collection("areas").doc(id).delete();
    await this.logAudit(AUDIT_ACTIONS.DELETE_AREA, id);
    return true;
  }
}

let _areasHelper = null;

export const getAreasHelper = () => {
  if (!_areasHelper) {
    _areasHelper = new AreasHelper();
  }
  return _areasHelper;
};
