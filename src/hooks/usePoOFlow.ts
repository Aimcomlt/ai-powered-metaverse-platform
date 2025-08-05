import { useState, useCallback } from 'react';
import { useToast } from '../components/ToastProvider';
import { ProofOfObservation, PoO_TaskFlow } from '../contracts';
import { getSigner } from '../services/provider';

interface RewardParams {
  user: string;
  tokenId: bigint;
  taskId: bigint;
  ftId: bigint;
  ftAmount: bigint;
  moderationPassed: boolean;
  uniqueSubmission: boolean;
}

export const usePoOFlow = (account?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showSuccess, showError } = useToast();

  const getProofOfObservation = useCallback(async () => {
    const address =
      process.env.REACT_APP_PROOF_OF_OBSERVATION_ADDRESS ||
      process.env.PROOF_OF_OBSERVATION_ADDRESS ||
      '0x0000000000000000000000000000000000000000';
    const signer = await getSigner(account);
    return new ProofOfObservation(address, signer);
  }, [account]);

  const getPoOTaskFlow = useCallback(async () => {
    const address =
      process.env.REACT_APP_POO_TASK_FLOW_ADDRESS ||
      process.env.POO_TASK_FLOW_ADDRESS ||
      '0x0000000000000000000000000000000000000000';
    const signer = await getSigner(account);
    return new PoO_TaskFlow(address, signer);
  }, [account]);

  const submitTask = useCallback(
    async (taskId: bigint, proof: string) => {
      setLoading(true);
      setError(null);
      try {
        const poo = await getProofOfObservation();
        const tx = await poo.submitTask(taskId, proof);
        await tx.wait();
        showSuccess('PoO task submitted');
        return tx;
      } catch (err: any) {
        setError(err);
        showError('Failed to submit PoO task');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getProofOfObservation],
  );

  const rewardAfterTask = useCallback(
    async (params: RewardParams) => {
      setLoading(true);
      setError(null);
      try {
        const flow = await getPoOTaskFlow();
        const tx = await flow.rewardAfterTask(
          params.user,
          params.tokenId,
          params.taskId,
          params.ftId,
          params.ftAmount,
          params.moderationPassed,
          params.uniqueSubmission,
        );
        await tx.wait();
        showSuccess('Reward issued');
        return tx;
      } catch (err: any) {
        setError(err);
        showError('Reward failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getPoOTaskFlow],
  );

  return { submitTask, rewardAfterTask, loading, error };
};

export default usePoOFlow;
