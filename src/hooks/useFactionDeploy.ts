import { useState, useCallback } from 'react';
import useContract from './useContract';
import ipfsService from '../services/ipfsService';

export const useFactionDeploy = (account?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [factionAddress, setFactionAddress] = useState<string | null>(null);

  const getFactory = useContract('GenesisBlockFactory', account);
  const getRegistry = useContract('FactionCharterRegistry', account);

  const deployFaction = useCallback(
    async (
      name: string,
      agentMd: File | string,
      immutableFlag: boolean = false,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const cid = await ipfsService.uploadAgentMd(agentMd);
        const factory = await getFactory();
        const tx = await factory.createFaction(name);
        const receipt = await tx.wait();
        const faction = (receipt?.events?.[0]?.args?.faction as string) || null;
        if (faction) {
          const registry = await getRegistry();
          await registry.registerCharter(faction, name, cid, immutableFlag);
        }
        setFactionAddress(faction);
        return { tx, faction, cid };
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getFactory, getRegistry],
  );

  return { deployFaction, loading, error, factionAddress };
};

export default useFactionDeploy;
