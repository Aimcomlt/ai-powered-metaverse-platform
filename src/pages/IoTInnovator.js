import React from 'react';
import FactionPageTemplate from '../components/FactionPageTemplate';
import useFactionMetadata from '../hooks/useFactionMetadata';

const IoTInnovator = () => {
  const { data, loading, error } = useFactionMetadata('iot-innovator');
  return <FactionPageTemplate data={data} loading={loading} error={error} />;
};

export default IoTInnovator;
