import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionPageTemplate from '../../components/FactionPageTemplate';
import useFactionMetadata from '../../hooks/useFactionMetadata';

const QuantumQuorist: React.FC = () => {
  const { data, loading, error } = useFactionMetadata('quantum-quorist');
  return (
    <>
      <Helmet>
        <title>Quantum Quorist Faction | Metaverse Platform</title>
        <meta
          name="description"
          content="Discover the Quantum Quorist faction within the metaverse platform."
        />
      </Helmet>
      <FactionPageTemplate data={data} loading={loading} error={error} />
    </>
  );
};

export default QuantumQuorist;
