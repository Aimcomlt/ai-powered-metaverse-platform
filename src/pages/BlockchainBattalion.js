import React from 'react';
import FactionPageTemplate from '../components/FactionPageTemplate';
import useFactionMetadata from '../hooks/useFactionMetadata';

const BlockchainBattalion = () => {
  const { data, loading, error } = useFactionMetadata('blockchain-battalion');
  return <FactionPageTemplate data={data} loading={loading} error={error} />;
};

export default BlockchainBattalion;
