import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const QuantumQuoristProposals: React.FC = () => (
  <>
    <Helmet>
      <title>Quantum Quorist Proposals | Metaverse Platform</title>
      <meta
        name="description"
        content="Proposals within the Quantum Quorist faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="quantum-quorist.proposals.mpns"
      title="Quantum Quorist Proposals"
    />
  </>
);

export default QuantumQuoristProposals;
