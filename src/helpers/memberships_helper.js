import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuditHelper } from "./audit_helper";
import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";

class MembershipsHelper {
  constructor() {
    if (!firebase.apps.length) {
      throw new Error("Firebase app not initialized");
    }
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
      resource: AUDIT_RESOURCES.MEMBERSHIPS,
      resourceId,
      details,
    });
  }

  async createMembership(membershipData) {
    const docData = {
      ...membershipData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = this.db.collection("memberships").doc();
    await docRef.set(docData);

    await this.logAudit(AUDIT_ACTIONS.CREATE_MEMBERSHIP, docRef.id, {
      membershipData: docData,
    });

    return { id: docRef.id, ...docData };
  }

  async listMemberships() {
    // Sem orderBy para evitar erros quando não houver índice/campo em todos os documentos
    const snapshot = await this.db.collection("memberships").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getMembership(id) {
    const doc = await this.db.collection("memberships").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async updateMembership(id, updates) {
    const payload = {
      ...updates,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await this.db.collection("memberships").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_MEMBERSHIP, id, { updates });
    return this.getMembership(id);
  }

  async deleteMembership(id) {
    await this.db.collection("memberships").doc(id).delete();
    await this.logAudit(AUDIT_ACTIONS.DELETE_MEMBERSHIP, id);
    return true;
  }
}

let _membershipsHelper = null;

export const getMembershipsHelper = () => {
  if (!_membershipsHelper) {
    _membershipsHelper = new MembershipsHelper();
  }
  return _membershipsHelper;
};
