import React from 'react';
import useAgent from '../../hooks/useAgent';
import LoadingSpinner from '../shared/LoadingSpinner';

interface Props {
  handle: string;
}

const AgentMarkdownViewer: React.FC<Props> = ({ handle }) => {
  const { agent, loading, error } = useAgent(handle);

  if (loading) return <LoadingSpinner size="md" text="Loading agent..." />;
  if (error) return <div>Error loading agent.</div>;
  if (!agent) return <div>Agent not found.</div>;

  return (
    <pre style={{ whiteSpace: 'pre-wrap' }}>
      {agent.content || 'No content available.'}
    </pre>
  );
};

export default AgentMarkdownViewer;
