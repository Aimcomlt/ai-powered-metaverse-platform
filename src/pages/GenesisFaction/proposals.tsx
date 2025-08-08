import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const GenesisFactionProposals: React.FC = () => (
  <>
    <Helmet>
      <title>Genesis Faction Proposals | Metaverse Platform</title>
      <meta
        name="description"
        content="Proposals within the Genesis Faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="genesis-faction.proposals.mpns"
      title="Genesis Faction Proposals"
    />
  </>
);

export default GenesisFactionProposals;
