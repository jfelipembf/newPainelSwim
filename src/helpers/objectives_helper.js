import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { AUDIT_ACTIONS, AUDIT_RESOURCES } from '../constants/audit';
import { getAuditHelper } from "./audit_helper";

class ObjectivesHelper {
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
      resource: AUDIT_RESOURCES.EVALUATION_OBJECTIVES,
      resourceId,
      details,
    });
  }

  async createObjective(objectiveData) {
    try {
      const docRef = this.db.collection('evaluation_objectives').doc();
      const docData = {
        ...objectiveData,
        idObjective: objectiveData.idObjective || docRef.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await docRef.set(docData);
      this.logAudit(AUDIT_ACTIONS.CREATE_EVALUATION_OBJECTIVE, docRef.id, { objectiveData: docData });

      return { id: docRef.id, ...docData };
    } catch (error) {
      console.error('Erro ao criar objetivo:', error);
      throw error;
    }
  }

  async listObjectives(filters = {}) {
    try {
      let query = this.db.collection('evaluation_objectives');

      // Aplicar filtros
      if (filters.idActivity) {
        query = query.where('idActivity', '==', filters.idActivity);
      }
      if (filters.isActive !== undefined) {
        query = query.where('isActive', '==', filters.isActive);
      }

      // Ordenação
      query = query.orderBy('idActivity').orderBy('name');

      const snapshot = await query.get();
      const objectives = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return objectives;
    } catch (error) {
      console.error('Erro ao listar objetivos:', error);
      throw error;
    }
  }

  async getObjective(objectiveId) {
    try {
      const doc = await this.db.collection('evaluation_objectives').doc(objectiveId).get();

      if (!doc.exists) {
        throw new Error('Objetivo não encontrado');
      }

      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Erro ao buscar objetivo:', error);
      throw error;
    }
  }

  async updateObjective(objectiveId, objectiveData) {
    try {
      const updateData = {
        ...objectiveData,
        idObjective: objectiveData.idObjective || objectiveId,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await this.db.collection('evaluation_objectives').doc(objectiveId).update(updateData);
      this.logAudit(AUDIT_ACTIONS.UPDATE_EVALUATION_OBJECTIVE, objectiveId, { objectiveData: updateData });

      return { id: objectiveId, ...updateData };
    } catch (error) {
      console.error('Erro ao atualizar objetivo:', error);
      throw error;
    }
  }

  async deleteObjective(objectiveId) {
    try {
      // Verificar se há tópicos associados
      const topicsSnapshot = await this.db.collection('evaluation_topics')
        .where('idObjective', '==', objectiveId)
        .limit(1)
        .get();

      if (!topicsSnapshot.empty) {
        throw new Error('Não é possível excluir objetivo com tópicos associados');
      }

      const objectiveData = await this.getObjective(objectiveId);
      await this.db.collection('evaluation_objectives').doc(objectiveId).delete();
      this.logAudit(AUDIT_ACTIONS.DELETE_EVALUATION_OBJECTIVE, objectiveId, { objectiveData });

      return { id: objectiveId };
    } catch (error) {
      console.error('Erro ao excluir objetivo:', error);
      throw error;
    }
  }

  async getObjectivesByActivity(activityId) {
    try {
      return await this.listObjectives({ idActivity: activityId });
    } catch (error) {
      console.error('Erro ao buscar objetivos por atividade:', error);
      throw error;
    }
  }

  async batchUpdateObjectives(updates) {
    try {
      const batch = this.db.batch();

      updates.forEach(({ id, updates: updateData }) => {
        const docRef = this.db.collection('evaluation_objectives').doc(id);
        const finalUpdateData = {
          ...updateData,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        batch.update(docRef, finalUpdateData);
      });

      await batch.commit();

      // Log audit for batch operation
      this.logAudit(AUDIT_ACTIONS.UPDATE_EVALUATION_OBJECTIVE, 'batch', {
        operation: 'batch_update_order',
        updates: updates
      });

      return { success: true, updatedCount: updates.length };
    } catch (error) {
      console.error('Erro ao atualizar objetivos em lote:', error);
      throw error;
    }
  }

}

let _objectivesHelper = null;

export const getObjectivesHelper = () => {
  if (!_objectivesHelper) {
    _objectivesHelper = new ObjectivesHelper();
  }
  return _objectivesHelper;
};
