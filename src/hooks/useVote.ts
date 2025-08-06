import { useCallback, useState } from 'react';
import { vote as serviceVote } from '../services/houseOfTheLawService';

export type VoteChoice = 'yes' | 'no' | 'abstain';

const mapChoiceToNumber = (choice: VoteChoice): number => {
  switch (choice) {
    case 'yes':
      return 1;
    case 'no':
      return 2;
    case 'abstain':
    default:
      return 0;
  }
};

export const useVote = (proposalId: number, _userAddress?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastVote, setLastVote] = useState<VoteChoice | null>(null);

  const cast = useCallback(
    async (choice: VoteChoice) => {
      setLoading(true);
      setError(null);
      try {
        await serviceVote({ proposalId, votes: mapChoiceToNumber(choice) });
        setLastVote(choice);
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [proposalId],
  );

  const voteYes = useCallback(() => cast('yes'), [cast]);
  const voteNo = useCallback(() => cast('no'), [cast]);
  const abstain = useCallback(() => cast('abstain'), [cast]);

  return { voteYes, voteNo, abstain, loading, error, lastVote };
};

export default useVote;
