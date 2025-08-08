import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const QuantumQuoristGovernance: React.FC = () => (
  <>
    <Helmet>
      <title>Quantum Quorist Governance | Metaverse Platform</title>
      <meta
        name="description"
        content="Governance documents for the Quantum Quorist faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="quantum-quorist.governance.mpns"
      title="Quantum Quorist Governance"
    />
  </>
);

export default QuantumQuoristGovernance;
