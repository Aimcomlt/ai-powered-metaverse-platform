import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const GenesisFactionContributions: React.FC = () => (
  <>
    <Helmet>
      <title>Genesis Faction Contributions | Metaverse Platform</title>
      <meta
        name="description"
        content="Browse contributions in the Genesis Faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="genesis-faction.contributions.mpns"
      title="Genesis Faction Contributions"
    />
  </>
);

export default GenesisFactionContributions;
