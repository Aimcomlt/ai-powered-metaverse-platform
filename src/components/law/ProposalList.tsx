import React from 'react';

interface Proposal {
  id: string | number;
  title: string;
  description: string;
  status: string;
}

interface ProposalListProps {
  proposals: Proposal[];
  onSelect?: (proposal: Proposal) => void;
}

const ProposalCard: React.FC<{ proposal: Proposal; onSelect?: (proposal: Proposal) => void }> = ({ proposal, onSelect }) => {
  const statusColor =
    {
      pending: 'text-gray-500',
      active: 'text-blue-500',
      executed: 'text-green-600',
      rejected: 'text-red-600',
    }[proposal.status.toLowerCase() as keyof Record<string, string>] || 'text-gray-600';

  return (
    <div
      className="p-4 border rounded hover:shadow cursor-pointer"
      onClick={() => onSelect && onSelect(proposal)}
    >
      <h3 className="text-lg font-semibold">{proposal.title}</h3>
      <p className="text-gray-600">{proposal.description}</p>
      <div className="mt-2">
        <span className="text-sm font-medium mr-1">Status:</span>
        <span className={`text-sm font-semibold ${statusColor}`}>{proposal.status}</span>
      </div>
    </div>
  );
};

const ProposalList: React.FC<ProposalListProps> = ({ proposals, onSelect }) => {
  if (!proposals || proposals.length === 0) {
    return <div className="text-gray-500">No proposals available.</div>;
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ProposalList;

