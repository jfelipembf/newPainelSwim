import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { MEMBER_INITIAL_VALUE } from "../constants/members";
import { getAuditHelper } from "./audit_helper";
import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";

class MembersHelper {
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
      resource: AUDIT_RESOURCES.MEMBERS,
      resourceId,
      details,
    });
  }

  async createMember(memberData) {
    const { photoFile, ...dataWithoutPhoto } = memberData;

    const docData = {
      ...MEMBER_INITIAL_VALUE,
      ...dataWithoutPhoto,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = this.db.collection("members").doc();
    await docRef.set(docData);

    // Upload photo if provided
    let photoUrl = null;
    if (photoFile) {
      try {
        const { getStorageHelper } = await import("../../helpers/storage_helper");
        const storageHelper = getStorageHelper();
        const storagePath = `members/${docRef.id}/photo_${Date.now()}_${photoFile.name}`;
        const uploadResult = await storageHelper.uploadPhoto(photoFile, storagePath);

        // Update document with photo URL
        await docRef.update({ photoUrl: uploadResult.url });
        photoUrl = uploadResult.url;
      } catch (uploadError) {
        console.error("Erro ao fazer upload da foto do membro:", uploadError);
        // Continue without photo
      }
    }

    await this.logAudit(AUDIT_ACTIONS.CREATE_MEMBER, docRef.id, {
      memberData: { ...docData, photoUrl },
    });

    return {
      id: docRef.id,
      ...docData,
      photoUrl
    };
  }

  async listMembers() {
    const snapshot = await this.db.collection("members").orderBy("firstName").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getMember(id) {
    const doc = await this.db.collection("members").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async updateMember(id, updates) {
    const { photoFile, ...dataWithoutPhoto } = updates;

    const payload = {
      ...dataWithoutPhoto,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    // Upload photo if provided
    if (photoFile) {
      try {
        const { getStorageHelper } = await import("../../helpers/storage_helper");
        const storageHelper = getStorageHelper();
        const storagePath = `members/${id}/photo_${Date.now()}_${photoFile.name}`;
        const uploadResult = await storageHelper.uploadPhoto(photoFile, storagePath);

        payload.photoUrl = uploadResult.url;
      } catch (uploadError) {
        console.error("Erro ao fazer upload da foto do membro:", uploadError);
        // Continue without photo
      }
    }

    await this.db.collection("members").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_MEMBER, id, { updates: payload });
    return this.getMember(id);
  }

  async deleteMember(id) {
    await this.db.collection("members").doc(id).delete();
    await this.logAudit(AUDIT_ACTIONS.DELETE_MEMBER, id);
    return true;
  }
}

let _membersHelper = null;

export const getMembersHelper = () => {
  if (!_membersHelper) {
    _membersHelper = new MembersHelper();
  }
  return _membersHelper;
};
