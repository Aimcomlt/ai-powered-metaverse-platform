import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useCreateProposal from '../../hooks/useCreateProposal';

const ProposalCreator: React.FC = () => {
  const isValidated = useSelector((state: any) => state.ai?.status === 'validated');
  const { createProposal, loading, error, success } = useCreateProposal();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [executionData, setExecutionData] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProposal({ title, description, executionData });
      setTitle('');
      setDescription('');
      setExecutionData('');
    } catch (err) {
      // errors handled in hook
    }
  };

  if (!isValidated) {
    return <div className="text-gray-500">AI assistant validation required to create proposals.</div>;
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl mb-4">Create Proposal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={executionData}
          onChange={(e) => setExecutionData(e.target.value)}
          placeholder="Execution Data"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Submitting...' : 'Submit Proposal'}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error.message || 'Submission failed'}</div>}
      {success && <div className="text-green-500 mt-2">Proposal submitted successfully!</div>}
    </div>
  );
};

export default ProposalCreator;
