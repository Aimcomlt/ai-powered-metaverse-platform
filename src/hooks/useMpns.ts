import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '../services/provider';
import MpNSRegistryAbi from '../abis/MpNSRegistry.json';
import localRecords from '../data/mpns.json';

export type MpnsResolution = {
  type: 'contract' | 'ipfs' | 'empty';
  value: string;
};

export const useMpns = (name?: string) => {
  const [result, setResult] = useState<MpnsResolution>({
    type: 'empty',
    value: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  const provider = getProvider();
  const registryAddress =
    process.env.REACT_APP_MPNS_REGISTRY_ADDRESS ||
    process.env.MPNS_REGISTRY_ADDRESS;

  const resolve = useCallback(
    async (lookup: string): Promise<MpnsResolution> => {
      if (!lookup) {
        const empty: MpnsResolution = { type: 'empty', value: '' };
        setResult(empty);
        setStatus('ready');
        return empty;
      }
      setStatus('loading');
      try {
        let uri: string | undefined;
        if (registryAddress) {
          try {
            const registry = new ethers.Contract(
              registryAddress,
              MpNSRegistryAbi,
              provider,
            );
            uri = await registry.nameToUri(lookup);
          } catch {
            uri = undefined;
          }
        }
        if (!uri) {
          uri = (localRecords as Record<string, string>)[lookup];
        }
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
        setStatus('ready');
        return res;
      } catch {
        const empty: MpnsResolution = { type: 'empty', value: '' };
        setResult(empty);
        setStatus('error');
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
      setStatus('idle');
    }
  }, [name, resolve]);

  return { result, resolve, status };
};

export default useMpns;
