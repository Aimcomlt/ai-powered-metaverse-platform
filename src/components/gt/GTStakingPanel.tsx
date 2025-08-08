import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { stakeGT, unstakeGT } from '../../store/gtSlice';
import useStakeGT from '../../hooks/useStakeGT';
import useUnstakeGT from '../../hooks/useUnstakeGT';

interface GTStakingPanelProps {
  tokenId: number;
  userAddress: string;
}

const GTStakingPanel: React.FC<GTStakingPanelProps> = ({ tokenId, userAddress }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(1);

  const {
    mutate: stake,
    isLoading: staking,
    isError: stakeError,
    error: stakeErr,
    isSuccess: stakeSuccess,
  } = useStakeGT();

  const {
    mutate: unstake,
    isLoading: unstaking,
    isError: unstakeError,
    error: unstakeErr,
    isSuccess: unstakeSuccess,
  } = useUnstakeGT();

  const handleStake = () => {
    stake({ tokenId, amount, userAddress });
  };

  const handleUnstake = () => {
    unstake({ tokenId, userAddress });
  };

  useEffect(() => {
    if (stakeSuccess) {
      dispatch(stakeGT({ id: tokenId, amount }));
    }
  }, [stakeSuccess, dispatch, tokenId, amount]);

  useEffect(() => {
    if (unstakeSuccess) {
      dispatch(unstakeGT({ id: tokenId, amount }));
    }
  }, [unstakeSuccess, dispatch, tokenId, amount]);

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-xl mb-4">GT Staking</h3>
      <div className="flex items-center mb-4">
        <input
          type="number"
          className="border p-2 mr-2 flex-1"
          value={amount}
          min={1}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleStake}
            disabled={staking}
          >
            Stake
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleUnstake}
            disabled={unstaking}
          >
            Unstake
          </button>
      </div>
      {staking && <p className="text-gray-500">Staking...</p>}
      {stakeError && (
        <p className="text-red-500">{(stakeErr as Error)?.message || 'Stake failed'}</p>
      )}
      {stakeSuccess && <p className="text-green-500">Stake successful!</p>}
      {unstaking && <p className="text-gray-500">Unstaking...</p>}
      {unstakeError && (
        <p className="text-red-500">{(unstakeErr as Error)?.message || 'Unstake failed'}</p>
      )}
      {unstakeSuccess && <p className="text-green-500">Unstake successful!</p>}
    </div>
  );
};

export default GTStakingPanel;
