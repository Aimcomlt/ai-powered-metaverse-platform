import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionPageTemplate from '../../components/FactionPageTemplate';
import useFactionMetadata from '../../hooks/useFactionMetadata';

const AIArchitect: React.FC = () => {
  const { data, loading, error } = useFactionMetadata('ai-architect');
  return (
    <>
      <Helmet>
        <title>AI Architect Faction | Metaverse Platform</title>
        <meta
          name="description"
          content="Learn about the AI Architect faction within the metaverse platform."
        />
      </Helmet>
      <FactionPageTemplate data={data} loading={loading} error={error} />
    </>
  );
};

export default AIArchitect;
