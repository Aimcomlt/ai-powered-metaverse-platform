import React from 'react';
import FactionPageTemplate from '../../components/FactionPageTemplate';
import useFactionMetadata from '../../hooks/useFactionMetadata';

const AIArchitect: React.FC = () => {
  const { data, loading, error } = useFactionMetadata('ai-architect');
  return <FactionPageTemplate data={data} loading={loading} error={error} />;
};

export default AIArchitect;
