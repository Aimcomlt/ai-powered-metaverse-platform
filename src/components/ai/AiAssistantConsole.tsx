import React from 'react';
import { useSelector } from 'react-redux';
import useAiRecommendations from '../../hooks/useAiRecommendations';

interface RootState {
  gt: {
    staked: Record<number, number>;
  };
}

const STAKE_THRESHOLD = 10;

const AiAssistantConsole: React.FC = () => {
  const staked = useSelector((state: RootState) => state.gt.staked[0] || 0);
  const { recommendations, status } = useAiRecommendations();

  if (staked < STAKE_THRESHOLD) {
    return null;
  }

  const handleCreateProposal = () => {
    console.log('Initiate proposal creation');
  };

  const handleStartTask = () => {
    console.log('Initiate task');
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-xl mb-4">AI Assistant</h3>
      {status === 'loading' && <p className="text-gray-500">Loading recommendations...</p>}
      {status === 'error' && <p className="text-red-500">Failed to load recommendations</p>}
      {recommendations.length > 0 && (
        <ul className="mb-4 list-disc list-inside">
          {recommendations.map((rec: any, idx: number) => (
            <li key={idx}>{rec.title || rec}</li>
          ))}
        </ul>
      )}
        <div className="flex space-x-2">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCreateProposal}
          >
            Create Proposal
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleStartTask}
          >
            Start Task
          </button>
        </div>
    </div>
  );
};

export default AiAssistantConsole;
