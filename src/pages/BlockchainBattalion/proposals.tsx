import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const BlockchainBattalionProposals: React.FC = () => (
  <>
    <Helmet>
      <title>Blockchain Battalion Proposals | Metaverse Platform</title>
      <meta
        name="description"
        content="Proposals within the Blockchain Battalion faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="blockchain-battalion.proposals.mpns"
      title="Blockchain Battalion Proposals"
    />
  </>
);

export default BlockchainBattalionProposals;
