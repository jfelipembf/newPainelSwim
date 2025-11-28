import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

class AuditHelper {
  constructor() {
    this.db = firebase.firestore();
  }

  /**
   * Log an activity to the audit trail
   * @param {Object} activityData - The activity data
   * @returns {Promise<string>} - The log document ID
   */
  async logActivity(activityData) {
    try {
      const logData = {
        ...activityData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        id: Date.now().toString() // Simple ID generation
      };

      const docRef = await this.db.collection('activity_logs').add(logData);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao salvar log de auditoria:', error);
      throw error;
    }
  }

  /**
   * Get activity logs with optional filters
   * @param {Object} filters - Filter options
   * @returns {Promise<Array>} - Array of activity logs
   */
  async getActivityLogs(filters = {}) {
    try {
      let query = this.db.collection('activity_logs')
        .orderBy('timestamp', 'desc');

      // Apply basic filters
      if (filters.userId) {
        query = query.where('userId', '==', filters.userId);
      }
      if (filters.action) {
        query = query.where('action', '==', filters.action);
      }
      if (filters.resource) {
        query = query.where('resource', '==', filters.resource);
      }
      if (filters.limit) {
        query = query.limit(filters.limit);
      } else {
        query = query.limit(50); // Default limit
      }

      const snapshot = await query.get();
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          // Ensure all fields are properly typed
          timestamp: data.timestamp,
          userId: String(data.userId || ''),
          userEmail: String(data.userEmail || ''),
          userName: String(data.userName || ''),
          userRole: String(data.userRole || ''),
          action: String(data.action || ''),
          resource: String(data.resource || ''),
          resourceId: String(data.resourceId || ''),
          details: data.details || {},
          ipAddress: String(data.ipAddress || ''),
          userAgent: String(data.userAgent || ''),
        };
      });
    } catch (error) {
      console.error('Erro ao buscar logs de auditoria:', error);
      throw error;
    }
  }

  /**
   * Get activity logs for a specific user
   * @param {string} userId - The user ID
   * @param {number} limit - Number of logs to return
   * @returns {Promise<Array>} - Array of user's activity logs
   */
  async getUserActivityLogs(userId, limit = 20) {
    return this.getActivityLogs({ userId, limit });
  }

  /**
   * Get activity logs for a specific resource
   * @param {string} resourceId - The resource ID
   * @param {string} resourceType - The resource type
   * @returns {Promise<Array>} - Array of resource activity logs
   */
  async getResourceActivityLogs(resourceId, resourceType = null) {
    const filters = { resourceId: resourceId };
    if (resourceType) {
      filters.resource = resourceType;
    }
    return this.getActivityLogs(filters);
  }
}

let _auditHelper = null;

/**
 * Initialize the audit helper
 */
const initAuditHelper = () => {
  if (!_auditHelper) {
    _auditHelper = new AuditHelper();
  }
  return _auditHelper;
};

/**
 * Returns the audit helper instance
 */
const getAuditHelper = () => {
  return _auditHelper;
};

export { initAuditHelper, getAuditHelper };
