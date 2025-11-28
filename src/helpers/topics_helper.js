import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { AUDIT_ACTIONS, AUDIT_RESOURCES } from '../constants/audit';
import { getAuditHelper } from "./audit_helper";

class TopicsHelper {
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

  async createTopic(topicData) {
    try {
      const docRef = this.db.collection('evaluation_topics').doc();
      const docData = {
        ...topicData,
        idTopic: topicData.idTopic || docRef.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await docRef.set(docData);
      this.logAudit(AUDIT_ACTIONS.CREATE_EVALUATION_TOPIC, docRef.id, { topicData: docData });

      return { id: docRef.id, ...docData };
    } catch (error) {
      console.error('Erro ao criar tópico:', error);
      throw error;
    }
  }

  async listTopics(filters = {}) {
    try {
      let query = this.db.collection('evaluation_topics');

      // Aplicar filtros
      if (filters.idObjective) {
        query = query.where('idObjective', '==', filters.idObjective);
      }
      if (filters.isActive !== undefined) {
        query = query.where('isActive', '==', filters.isActive);
      }

      // Ordenação
      query = query.orderBy('order', 'asc').orderBy('name');

      const snapshot = await query.get();
      const topics = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return topics;
    } catch (error) {
      console.error('Erro ao listar tópicos:', error);
      throw error;
    }
  }

  async getTopic(topicId) {
    try {
      const doc = await this.db.collection('evaluation_topics').doc(topicId).get();

      if (!doc.exists) {
        throw new Error('Tópico não encontrado');
      }

      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Erro ao buscar tópico:', error);
      throw error;
    }
  }

  async updateTopic(topicId, topicData) {
    try {
      const updateData = {
        ...topicData,
        idTopic: topicData.idTopic || topicId,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await this.db.collection('evaluation_topics').doc(topicId).update(updateData);
      this.logAudit(AUDIT_ACTIONS.UPDATE_EVALUATION_TOPIC, topicId, { topicData: updateData });

      return { id: topicId, ...updateData };
    } catch (error) {
      console.error('Erro ao atualizar tópico:', error);
      throw error;
    }
  }

  async deleteTopic(topicId) {
    try {
      const topicData = await this.getTopic(topicId);
      await this.db.collection('evaluation_topics').doc(topicId).delete();
      this.logAudit(AUDIT_ACTIONS.DELETE_EVALUATION_TOPIC, topicId, { topicData });

      return { id: topicId };
    } catch (error) {
      console.error('Erro ao excluir tópico:', error);
      throw error;
    }
  }

  async getTopicsByObjective(objectiveId) {
    try {
      return await this.listTopics({ idObjective: objectiveId });
    } catch (error) {
      console.error('Erro ao buscar tópicos por objetivo:', error);
      throw error;
    }
  }

  async batchUpdateTopics(updates) {
    try {
      const batch = this.db.batch();

      updates.forEach(({ id, updates: updateData }) => {
        const docRef = this.db.collection('evaluation_topics').doc(id);
        const finalUpdateData = {
          ...updateData,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        batch.update(docRef, finalUpdateData);
      });

      await batch.commit();

      // Log audit for batch operation
      this.logAudit(AUDIT_ACTIONS.UPDATE_EVALUATION_TOPIC, 'batch', {
        operation: 'batch_update_order',
        updates: updates
      });

      return { success: true, updatedCount: updates.length };
    } catch (error) {
      console.error('Erro ao atualizar tópicos em lote:', error);
      throw error;
    }
  }
}

let _topicsHelper = null;

export const getTopicsHelper = () => {
  if (!_topicsHelper) {
    _topicsHelper = new TopicsHelper();
  }
  return _topicsHelper;
};
