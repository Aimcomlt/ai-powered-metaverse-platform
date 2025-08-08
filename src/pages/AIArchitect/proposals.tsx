import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const AIArchitectProposals: React.FC = () => (
  <>
    <Helmet>
      <title>AI Architect Proposals | Metaverse Platform</title>
      <meta
        name="description"
        content="Proposals within the AI Architect faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="ai-architect.proposals.mpns"
      title="AI Architect Proposals"
    />
  </>
);

export default AIArchitectProposals;
