import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const BlockchainBattalionContributions: React.FC = () => (
  <>
    <Helmet>
      <title>Blockchain Battalion Contributions | Metaverse Platform</title>
      <meta
        name="description"
        content="Browse contributions in the Blockchain Battalion faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="blockchain-battalion.contributions.mpns"
      title="Blockchain Battalion Contributions"
    />
  </>
);

export default BlockchainBattalionContributions;
