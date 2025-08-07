import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useMpns, { MpnsResolution } from './useMpns';
import aiService from '../services/aiService';

interface RootState {
  gt: {
    balance: number;
  };
}

const fetchMpnsContent = async (res: MpnsResolution): Promise<any> => {
  if (res.type === 'ipfs' && res.value) {
    let url = res.value;
    if (url.startsWith('ipfs://')) {
      url = `https://ipfs.io/ipfs/${url.slice(7)}`;
    }
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
  const { result: rulesResult } = useMpns(factionRulesName);
  const { result: levelResult } = useMpns(userLevelName);
  const balance = useSelector((state: RootState) => state.gt.balance);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  useEffect(() => {
    const run = async () => {
      if (rulesResult.type === 'empty' || levelResult.type === 'empty') {
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
  }, [rulesResult, levelResult, balance]);

  return { suggestions, status };
};

export default useGptRecommendation;
