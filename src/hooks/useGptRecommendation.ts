import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useMpns from './useMpns';
import aiService from '../services/aiService';
import { MpnsResolution, normalizeIpfsUrl } from '../services/mpns';

interface RootState {
  gt: {
    balance: number;
  };
}

const fetchMpnsContent = async (res: MpnsResolution): Promise<any> => {
  if (res.type === 'ipfs' && res.value) {
    const url = normalizeIpfsUrl(res.value);
    try {
      const resp = await fetch(url);
      const text = await resp.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    } catch (err) {
      console.error('Failed to fetch MpNS content', err);
      return null;
    }
  }
  return res.value;
};

const useGptRecommendation = (factionRulesName: string, userLevelName: string) => {
  const { result: rulesResult, status: rulesStatus } = useMpns(factionRulesName);
  const { result: levelResult, status: levelStatus } = useMpns(userLevelName);
  const balance = useSelector((state: RootState) => state.gt.balance);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const run = async () => {
      if (
        rulesStatus !== 'ready' ||
        levelStatus !== 'ready' ||
        rulesResult.type === 'empty' ||
        levelResult.type === 'empty'
      ) {
        return;
      }
      setStatus('loading');
      try {
        const rules = await fetchMpnsContent(rulesResult);
        const level = await fetchMpnsContent(levelResult);
        const payload = { rules, level, balance };
        const resp = await aiService.recommendProposals(payload);
        setSuggestions(resp.proposals || []);
        setStatus('ready');
      } catch (err) {
        console.error('Failed to get GPT recommendation', err);
        setStatus('error');
      }
    };
    run();
  }, [rulesResult, levelResult, balance, rulesStatus, levelStatus, refreshIndex]);

  const refresh = () => setRefreshIndex((i) => i + 1);

  const combinedStatus =
    rulesStatus === 'error' || levelStatus === 'error'
      ? 'error'
      : rulesStatus === 'loading' || levelStatus === 'loading'
      ? 'loading'
      : status;

  return { suggestions, status: combinedStatus, refresh };
};

export default useGptRecommendation;
