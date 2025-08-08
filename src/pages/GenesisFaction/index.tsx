import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionPageTemplate from '../../components/FactionPageTemplate';
import useFactionMetadata from '../../hooks/useFactionMetadata';

const GenesisFaction: React.FC = () => {
  const { data, loading, error } = useFactionMetadata('genesis-faction');
  return (
    <>
      <Helmet>
        <title>Genesis Faction | Metaverse Platform</title>
        <meta
          name="description"
          content="Explore the Genesis Faction within the metaverse platform."
        />
      </Helmet>
      <FactionPageTemplate data={data} loading={loading} error={error} />
    </>
  );
};

export default GenesisFaction;
