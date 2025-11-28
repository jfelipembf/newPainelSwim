import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { AUDIT_ACTIONS, AUDIT_RESOURCES } from '../constants/audit';
import { getAuditHelper } from "./audit_helper";

class LevelsHelper {
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
      resource: AUDIT_RESOURCES.EVALUATIONS,
      resourceId,
      details,
    });
  }

  async createLevel(levelData) {
    try {
      const docRef = this.db.collection('evaluation_levels').doc();
      const docData = {
        ...levelData,
        idLevel: levelData.idLevel || docRef.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await docRef.set(docData);
      this.logAudit(AUDIT_ACTIONS.CREATE_EVALUATION_LEVEL, docRef.id, { levelData: docData });

      return { id: docRef.id, ...docData };
    } catch (error) {
      console.error('Erro ao criar nível:', error);
      throw error;
    }
  }

  async listLevels(filters = {}) {
    try {
      let query = this.db.collection('evaluation_levels');

      // Aplicar filtros
      if (filters.isActive !== undefined) {
        query = query.where('isActive', '==', filters.isActive);
      }

      // Ordenação
      query = query.orderBy('order', 'asc').orderBy('createdAt', 'desc');

      const snapshot = await query.get();
      const levels = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return levels;
    } catch (error) {
      console.error('Erro ao listar níveis:', error);
      throw error;
    }
  }

  async getLevel(levelId) {
    try {
      const doc = await this.db.collection('evaluation_levels').doc(levelId).get();

      if (!doc.exists) {
        throw new Error('Nível não encontrado');
      }

      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Erro ao buscar nível:', error);
      throw error;
    }
  }

  async updateLevel(levelId, levelData) {
    try {
      const updateData = {
        ...levelData,
        idLevel: levelData.idLevel || levelId,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await this.db.collection('evaluation_levels').doc(levelId).update(updateData);
      this.logAudit(AUDIT_ACTIONS.UPDATE_EVALUATION_LEVEL, levelId, { levelData: updateData });

      return { id: levelId, ...updateData };
    } catch (error) {
      console.error('Erro ao atualizar nível:', error);
      throw error;
    }
  }

  async deleteLevel(levelId) {
    try {
      const levelData = await this.getLevel(levelId);
      await this.db.collection('evaluation_levels').doc(levelId).delete();
      this.logAudit(AUDIT_ACTIONS.DELETE_EVALUATION_LEVEL, levelId, { levelData });

      return { id: levelId };
    } catch (error) {
      console.error('Erro ao excluir nível:', error);
      throw error;
    }
  }

  async batchUpdateLevels(updates) {
    try {
      const batch = this.db.batch();

      updates.forEach(({ id, updates: updateData }) => {
        const docRef = this.db.collection('evaluation_levels').doc(id);
        const finalUpdateData = {
          ...updateData,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        batch.update(docRef, finalUpdateData);
      });

      await batch.commit();

      // Log audit for batch operation
      this.logAudit(AUDIT_ACTIONS.UPDATE_EVALUATION_LEVEL, 'batch', {
        operation: 'batch_update_order',
        updates: updates
      });

      return { success: true, updatedCount: updates.length };
    } catch (error) {
      console.error('Erro ao atualizar níveis em lote:', error);
      throw error;
    }
  }

}

let _levelsHelper = null;

export const getLevelsHelper = () => {
  if (!_levelsHelper) {
    _levelsHelper = new LevelsHelper();
  }
  return _levelsHelper;
};
