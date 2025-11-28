import React from 'react';
import { useAuditLogs } from '../../hooks';

const History = () => {
  const { logs, loading, error, refetch } = useAuditLogs();

  console.log('History component render:', { logs, loading, error });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error in History:', error);
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <h1>Audit History</h1>
      <p>Logs count: {logs ? logs.length : 0}</p>
      <button onClick={refetch}>Refresh</button>

      {logs && logs.length > 0 && (
        <ul>
          {logs.map((log, index) => (
            <li key={log?.id || index}>
              {JSON.stringify(log)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
