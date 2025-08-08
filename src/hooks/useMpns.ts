import { useCallback, useEffect, useState } from 'react';
import { getProvider } from '../services/provider';
import { MpnsResolution, resolveMpnsName } from '../services/mpns';

export const useMpns = (name?: string) => {
  const [result, setResult] = useState<MpnsResolution>({
    type: 'empty',
    value: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  const provider = getProvider();

  const resolve = useCallback(
    async (lookup: string): Promise<MpnsResolution> => {
      if (!lookup) {
        const empty: MpnsResolution = { type: 'empty', value: '' };
        setResult(empty);
        setStatus('ready');
        return empty;
      }
      setStatus('loading');
      const res = await resolveMpnsName(lookup, provider);
      setResult(res);
      setStatus('ready');
      return res;
    },
    [provider],
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
