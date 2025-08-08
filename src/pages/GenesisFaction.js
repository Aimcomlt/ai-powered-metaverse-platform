import React from 'react';
import FactionPageTemplate from '../components/FactionPageTemplate';
import useFactionMetadata from '../hooks/useFactionMetadata';

const GenesisFaction = () => {
  const { data, loading, error } = useFactionMetadata('genesis-faction');
  return <FactionPageTemplate data={data} loading={loading} error={error} />;
};

export default GenesisFaction;
