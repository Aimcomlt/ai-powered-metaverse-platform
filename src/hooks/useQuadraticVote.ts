import { useCallback, useMemo, useState } from 'react';
import { vote as serviceVote } from '../services/houseOfTheLawService';

export const useQuadraticVote = (proposalId: number) => {
  const [votes, setVotes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastVote, setLastVote] = useState<number | null>(null);

  const cost = useMemo(() => votes * votes, [votes]);

  const castVote = useCallback(async () => {
    if (votes <= 0) return;
    setLoading(true);
    setError(null);
    try {
      await serviceVote({ proposalId, votes });
      setLastVote(votes);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [proposalId, votes]);

  return { votes, setVotes, cost, castVote, loading, error, lastVote };
};

export default useQuadraticVote;
