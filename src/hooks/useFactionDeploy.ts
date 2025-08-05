import { useState, useCallback } from 'react';
import { GenesisBlockFactory } from '../contracts';
import { getSigner } from '../services/provider';

export const useFactionDeploy = (account?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [factionAddress, setFactionAddress] = useState<string | null>(null);

  const deployFaction = useCallback(
    async (name: string) => {
      setLoading(true);
      setError(null);
      try {
        const address =
          process.env.REACT_APP_GENESIS_BLOCK_FACTORY_ADDRESS ||
          process.env.GENESIS_BLOCK_FACTORY_ADDRESS ||
          '0x0000000000000000000000000000000000000000';
        const signer = await getSigner(account);
        const factory = new GenesisBlockFactory(address, signer);
        const tx = await factory.createFaction(name);
        const receipt = await tx.wait();
        // the returned address is the first event arg or tx return
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
    [account],
  );

  return { deployFaction, loading, error, factionAddress };
};

export default useFactionDeploy;
