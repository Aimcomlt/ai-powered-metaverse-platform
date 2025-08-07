import { useState, useEffect } from 'react';
import useContract from './useContract';

interface CharterMetadata {
  [key: string]: any;
}

export const useCharterMetadata = (factionName?: string) => {
  const [metadata, setMetadata] = useState<CharterMetadata | null>(null);
  const [immutableGenesis, setImmutableGenesis] = useState<boolean | null>(null);
  const [agentHandles, setAgentHandles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getRegistry = useContract('FactionCharterRegistry');

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!factionName) {
        setMetadata(null);
        setImmutableGenesis(null);
        setAgentHandles([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const registry = await getRegistry();
        const charter = await registry.getCharterByName(factionName);
        if (charter?.ipfsHash) {
          setImmutableGenesis(charter.immutableGenesis);
          let url: string = charter.ipfsHash;
          if (url.startsWith('ipfs://')) {
            url = `https://ipfs.io/ipfs/${url.slice(7)}`;
          } else if (!url.startsWith('http')) {
            url = `https://ipfs.io/ipfs/${url}`;
          }
          const res = await fetch(url);
          const data = await res.json();
          setMetadata(data);
          const agents = Array.isArray(data?.agents)
            ? data.agents.map((a: any) =>
                typeof a === 'string' ? a : a.handle || a.name || '',
              )
            : Array.isArray(data?.agentHandles)
            ? data.agentHandles
            : [];
          setAgentHandles(agents.filter(Boolean));
        } else {
          setMetadata(null);
          setImmutableGenesis(null);
          setAgentHandles([]);
        }
      } catch (err: any) {
        setError(err);
        setMetadata(null);
        setImmutableGenesis(null);
        setAgentHandles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
  }, [factionName, getRegistry]);

  return { metadata, immutableGenesis, agentHandles, loading, error };
};

export default useCharterMetadata;

