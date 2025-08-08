import { useState, useCallback } from 'react';
import { createProposal as serviceCreateProposal } from '../services/houseOfTheLawService';
import { resolveMpnsName } from '../services/mpns';

interface CreateProposalArgs {
  title: string;
  description: string;
  executionData: string;
  targetMpns: string;
}

export const useCreateProposal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const createProposal = useCallback(
    async ({ title, description, executionData, targetMpns }: CreateProposalArgs) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        const targetRes = await resolveMpnsName(targetMpns);
        if (targetRes.type !== 'contract') {
          throw new Error('Invalid target contract');
        }
        await serviceCreateProposal({
          description,
          ipfsHash: '',
          eligibleGTId: 0,
          target: targetRes.value,
          data: executionData,
        });
        setSuccess(true);
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { createProposal, loading, error, success };
};

export default useCreateProposal;
