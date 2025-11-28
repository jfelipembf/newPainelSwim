import { useState, useEffect } from 'react';
import { getAuditHelper } from '../../helpers/audit_helper';

/**
 * Hook for managing audit logs
 * @param {Object} initialFilters - Initial filter options
 * @returns {Object} - Hook state and methods
 */
export const useAuditLogs = (initialFilters = {}) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const auditHelper = getAuditHelper();

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await auditHelper.getActivityLogs(filters);
      
      // Transform data to ensure proper types
      const transformedLogs = result.map(log => ({
        ...log,
        // Ensure timestamp is properly handled
        timestamp: log.timestamp,
        // Ensure strings are strings
        userName: String(log.userName || ''),
        userEmail: String(log.userEmail || ''),
        action: String(log.action || ''),
        resource: String(log.resource || ''),
        userRole: String(log.userRole || ''),
      }));
      
      setLogs(transformedLogs);
    } catch (err) {
      const errorMessage = err?.message || err?.toString() || 'Erro desconhecido ao buscar logs';
      setError(errorMessage);
      console.error('Erro ao buscar logs de auditoria:', err);
    } finally {
      setLoading(false);
    }
  };

  const logActivity = async (activityData) => {
    try {
      await auditHelper.logActivity(activityData);
      // Optionally refetch logs if needed
      // await fetchLogs();
    } catch (err) {
      console.error('Erro ao registrar atividade:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  return {
    logs,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchLogs,
    logActivity
  };
};

/**
 * Hook for getting user-specific audit logs
 * @param {string} userId - User ID to filter logs
 * @returns {Object} - Hook state and methods
 */
export const useUserAuditLogs = (userId) => {
  return useAuditLogs({ userId });
};

/**
 * Hook for getting resource-specific audit logs
 * @param {string} resourceId - Resource ID to filter logs
 * @param {string} resourceType - Resource type (optional)
 * @returns {Object} - Hook state and methods
 */
export const useResourceAuditLogs = (resourceId, resourceType = null) => {
  const filters = { resourceId };
  if (resourceType) {
    filters.resource = resourceType;
  }
  return useAuditLogs(filters);
};
