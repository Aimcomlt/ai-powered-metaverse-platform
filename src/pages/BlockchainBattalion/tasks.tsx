import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const BlockchainBattalionTasks: React.FC = () => (
  <>
    <Helmet>
      <title>Blockchain Battalion Tasks | Metaverse Platform</title>
      <meta name="description" content="Tasks for the Blockchain Battalion faction." />
    </Helmet>
    <FactionContentList
      mpnsName="blockchain-battalion.tasks.mpns"
      title="Blockchain Battalion Tasks"
    />
  </>
);

export default BlockchainBattalionTasks;
