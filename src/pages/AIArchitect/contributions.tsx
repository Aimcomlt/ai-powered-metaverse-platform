import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const AIArchitectContributions: React.FC = () => (
  <>
    <Helmet>
      <title>AI Architect Contributions | Metaverse Platform</title>
      <meta
        name="description"
        content="Browse contributions in the AI Architect faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="ai-architect.contributions.mpns"
      title="AI Architect Contributions"
    />
  </>
);

export default AIArchitectContributions;
