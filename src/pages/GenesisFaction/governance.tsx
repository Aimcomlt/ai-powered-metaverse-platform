import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const GenesisFactionGovernance: React.FC = () => (
  <>
    <Helmet>
      <title>Genesis Faction Governance | Metaverse Platform</title>
      <meta
        name="description"
        content="Governance documents for the Genesis Faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="genesis-faction.governance.mpns"
      title="Genesis Faction Governance"
    />
  </>
);

export default GenesisFactionGovernance;
