import { useEffect, useState } from 'react';
import useMpns from './useMpns';
import { normalizeIpfsUrl } from '../services/mpns';

export interface FactionMetadata {
  title: string;
  description: string;
  charter?: string[];
  mission?: string[];
  focus?: {
    intro?: string;
    areas?: string[];
    summary?: string;
  };
  courseLink?: string;
}

export const useFactionMetadata = (factionId?: string) => {
  const { resolve } = useMpns();
  const [data, setData] = useState<FactionMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!factionId) {
        setData(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await resolve(factionId);
        if (res.type === 'ipfs') {
          const url = normalizeIpfsUrl(res.value);
          const response = await fetch(url);
          const json = await response.json();
          setData(json);
        } else {
          setData(null);
        }
      } catch (err: any) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [factionId, resolve]);

  return { data, loading, error };
};

export default useFactionMetadata;
