import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const AIArchitectGovernance: React.FC = () => (
  <>
    <Helmet>
      <title>AI Architect Governance | Metaverse Platform</title>
      <meta
        name="description"
        content="Governance documents for the AI Architect faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="ai-architect.governance.mpns"
      title="AI Architect Governance"
    />
  </>
);

export default AIArchitectGovernance;
