import React from 'react';
import useVote from '../../hooks/useVote';

interface VotePanelProps {
  proposalId: number;
  userAddress: string;
}

const VotePanel: React.FC<VotePanelProps> = ({ proposalId, userAddress }) => {
  const { voteYes, voteNo, abstain, loading, error, lastVote } = useVote(
    proposalId,
    userAddress,
  );

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">Vote on Proposal</h3>
      <div className="text-sm text-gray-600 mb-4">Address: {userAddress}</div>
      <div className="space-x-2 mb-4">
        <button
          onClick={voteYes}
          disabled={loading}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Yes
        </button>
        <button
          onClick={voteNo}
          disabled={loading}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          No
        </button>
        <button
          onClick={abstain}
          disabled={loading}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Abstain
        </button>
      </div>
      {loading && <div className="text-blue-500">Submitting vote...</div>}
      {error && <div className="text-red-500">{error.message || 'Vote failed'}</div>}
      {lastVote && !error && !loading && (
        <div className="text-green-500">Vote cast successfully: {lastVote}</div>
      )}
    </div>
  );
};

export default VotePanel;
