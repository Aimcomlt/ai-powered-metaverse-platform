import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const GenesisFactionTasks: React.FC = () => (
  <>
    <Helmet>
      <title>Genesis Faction Tasks | Metaverse Platform</title>
      <meta name="description" content="Tasks for the Genesis Faction." />
    </Helmet>
    <FactionContentList mpnsName="genesis-faction.tasks.mpns" title="Genesis Faction Tasks" />
  </>
);

export default GenesisFactionTasks;
