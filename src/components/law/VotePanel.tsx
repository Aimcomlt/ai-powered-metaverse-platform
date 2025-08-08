import React from 'react';
import useGtValidation from '../../hooks/useGtValidation';
import useQuadraticVote from '../../hooks/useQuadraticVote';

interface VotePanelProps {
  proposalId: number;
  userAddress: string;
}

const VotePanel: React.FC<VotePanelProps> = ({ proposalId, userAddress }) => {
  const hasGt = useGtValidation(1);
  const { votes, setVotes, cost, castVote, loading, error, lastVote } =
    useQuadraticVote(proposalId);

  if (!hasGt) {
    return (
      <div className="p-4 border rounded text-gray-500">
        Governance tokens are required to vote on proposals.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">Vote on Proposal</h3>
      <div className="text-sm text-gray-600 mb-4">Address: {userAddress}</div>
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="number"
          min={0}
          value={votes}
          onChange={(e) => setVotes(Number(e.target.value))}
          className="border px-2 py-1 rounded w-20"
        />
        <button
          onClick={castVote}
          disabled={loading || votes <= 0}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Cast Vote
        </button>
      </div>
      <div className="text-sm text-gray-600 mb-2">Cost: {cost} GTs</div>
      {loading && <div className="text-blue-500">Submitting vote...</div>}
      {error && <div className="text-red-500">{error.message || 'Vote failed'}</div>}
      {lastVote !== null && !error && !loading && (
        <div className="text-green-500">Vote cast successfully: {lastVote}</div>
      )}
    </div>
  );
};

export default VotePanel;
