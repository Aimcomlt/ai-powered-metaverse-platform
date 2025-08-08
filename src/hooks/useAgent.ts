import { useState, useEffect } from 'react';
import { getAgent, AgentMetadata } from '../services/agentService';

export const useAgent = (handle?: string) => {
  const [agent, setAgent] = useState<AgentMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      if (!handle) {
        setAgent(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getAgent(handle);
        setAgent(data);
      } catch (err: any) {
        setError(err);
        setAgent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAgent();
  }, [handle]);

  return { agent, loading, error };
};

export default useAgent;
