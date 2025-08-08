import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const BlockchainBattalionGovernance: React.FC = () => (
  <>
    <Helmet>
      <title>Blockchain Battalion Governance | Metaverse Platform</title>
      <meta
        name="description"
        content="Governance documents for the Blockchain Battalion faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="blockchain-battalion.governance.mpns"
      title="Blockchain Battalion Governance"
    />
  </>
);

export default BlockchainBattalionGovernance;
