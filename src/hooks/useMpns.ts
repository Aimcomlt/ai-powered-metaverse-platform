import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '../services/provider';
import MpNSRegistryAbi from '../abis/MpNSRegistry.json';

export type MpnsResolution = {
  type: 'contract' | 'ipfs' | 'empty';
  value: string;
};

export const useMpns = (name?: string) => {
  const [result, setResult] = useState<MpnsResolution>({
    type: 'empty',
    value: '',
  });

  const provider = getProvider();
  const registryAddress =
    process.env.REACT_APP_MPNS_REGISTRY_ADDRESS ||
    process.env.MPNS_REGISTRY_ADDRESS;

  const resolve = useCallback(
    async (lookup: string): Promise<MpnsResolution> => {
      if (!registryAddress || !lookup) {
        const empty: MpnsResolution = { type: 'empty', value: '' };
        setResult(empty);
        return empty;
      }
      try {
        const registry = new ethers.Contract(
          registryAddress,
          MpNSRegistryAbi,
          provider,
        );
        const uri: string = await registry.nameToUri(lookup);
        let res: MpnsResolution;
        if (!uri) {
          res = { type: 'empty', value: '' };
        } else if (/^0x[a-fA-F0-9]{40}$/.test(uri)) {
          res = { type: 'contract', value: uri };
        } else if (uri.startsWith('ipfs://') || uri.includes('/ipfs/')) {
          res = { type: 'ipfs', value: uri };
        } else {
          res = { type: 'empty', value: uri };
        }
        setResult(res);
        return res;
      } catch {
        const empty: MpnsResolution = { type: 'empty', value: '' };
        setResult(empty);
        return empty;
      }
    },
    [registryAddress, provider],
  );

  useEffect(() => {
    if (name) {
      resolve(name);
    } else {
      setResult({ type: 'empty', value: '' });
    }
  }, [name, resolve]);

  return { result, resolve };
};

export default useMpns;
