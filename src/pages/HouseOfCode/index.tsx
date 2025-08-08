import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionPageTemplate from '../../components/FactionPageTemplate';
import useFactionMetadata from '../../hooks/useFactionMetadata';

const HouseOfCode: React.FC = () => {
  const { data, loading, error } = useFactionMetadata('house-of-code');
  return (
    <>
      <Helmet>
        <title>House of Code Faction | Metaverse Platform</title>
        <meta
          name="description"
          content="Discover the House of Code faction within the metaverse platform."
        />
      </Helmet>
      <FactionPageTemplate data={data} loading={loading} error={error} />
    </>
  );
};

export default HouseOfCode;
