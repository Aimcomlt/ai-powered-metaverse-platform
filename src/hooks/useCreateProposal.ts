import { useState, useCallback } from 'react';
import { createProposal as serviceCreateProposal } from '../services/houseOfTheLawService';

interface CreateProposalArgs {
  title: string;
  description: string;
  executionData: string;
}

export const useCreateProposal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const createProposal = useCallback(
    async ({ title, description, executionData }: CreateProposalArgs) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        await serviceCreateProposal({
          description,
          ipfsHash: '',
          eligibleGTId: 0,
          target: '0x0000000000000000000000000000000000000000',
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
