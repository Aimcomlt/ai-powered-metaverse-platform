import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionPageTemplate from '../../components/FactionPageTemplate';
import useFactionMetadata from '../../hooks/useFactionMetadata';

const BlockchainBattalion: React.FC = () => {
  const { data, loading, error } = useFactionMetadata('blockchain-battalion');
  return (
    <>
      <Helmet>
        <title>Blockchain Battalion Faction | Metaverse Platform</title>
        <meta
          name="description"
          content="Discover the Blockchain Battalion faction in the metaverse platform."
        />
      </Helmet>
      <FactionPageTemplate data={data} loading={loading} error={error} />
    </>
  );
};

export default BlockchainBattalion;
