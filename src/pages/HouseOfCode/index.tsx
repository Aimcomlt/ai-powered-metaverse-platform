import React from 'react';
import FactionPageTemplate from '../../components/FactionPageTemplate';
import useFactionMetadata from '../../hooks/useFactionMetadata';

const HouseOfCode: React.FC = () => {
  const { data, loading, error } = useFactionMetadata('house-of-code');
  return <FactionPageTemplate data={data} loading={loading} error={error} />;
};

export default HouseOfCode;
