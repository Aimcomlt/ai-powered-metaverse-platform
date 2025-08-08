import React from 'react';
import FactionPageTemplate from '../components/FactionPageTemplate';
import useFactionMetadata from '../hooks/useFactionMetadata';

const QuantumQuorist = () => {
  const { data, loading, error } = useFactionMetadata('quantum-quorist');
  return <FactionPageTemplate data={data} loading={loading} error={error} />;
};

export default QuantumQuorist;
