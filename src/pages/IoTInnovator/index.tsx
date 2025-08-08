import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionPageTemplate from '../../components/FactionPageTemplate';
import useFactionMetadata from '../../hooks/useFactionMetadata';

const IoTInnovator: React.FC = () => {
  const { data, loading, error } = useFactionMetadata('iot-innovator');
  return (
    <>
      <Helmet>
        <title>IoT Innovator Faction | Metaverse Platform</title>
        <meta
          name="description"
          content="Learn about the IoT Innovator faction within the metaverse platform."
        />
      </Helmet>
      <FactionPageTemplate data={data} loading={loading} error={error} />
    </>
  );
};

export default IoTInnovator;
