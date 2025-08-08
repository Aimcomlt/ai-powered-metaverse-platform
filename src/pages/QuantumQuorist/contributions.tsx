import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const QuantumQuoristContributions: React.FC = () => (
  <>
    <Helmet>
      <title>Quantum Quorist Contributions | Metaverse Platform</title>
      <meta
        name="description"
        content="Browse contributions in the Quantum Quorist faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="quantum-quorist.contributions.mpns"
      title="Quantum Quorist Contributions"
    />
  </>
);

export default QuantumQuoristContributions;
