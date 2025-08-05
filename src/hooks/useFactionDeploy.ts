import { useState, useCallback } from 'react';
import useContract from './useContract';

export const useFactionDeploy = (account?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [factionAddress, setFactionAddress] = useState<string | null>(null);

  const getFactory = useContract('GenesisBlockFactory', account);

  const deployFaction = useCallback(
    async (name: string) => {
      setLoading(true);
      setError(null);
      try {
        const factory = await getFactory();
        const tx = await factory.createFaction(name);
        const receipt = await tx.wait();
        const faction = (receipt?.events?.[0]?.args?.faction as string) || null;
        setFactionAddress(faction);
        return { tx, faction };
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getFactory],
  );

  return { deployFaction, loading, error, factionAddress };
};

export default useFactionDeploy;
