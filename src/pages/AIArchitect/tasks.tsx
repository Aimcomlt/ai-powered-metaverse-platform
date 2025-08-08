import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const AIArchitectTasks: React.FC = () => (
  <>
    <Helmet>
      <title>AI Architect Tasks | Metaverse Platform</title>
      <meta name="description" content="Tasks for the AI Architect faction." />
    </Helmet>
    <FactionContentList mpnsName="ai-architect.tasks.mpns" title="AI Architect Tasks" />
  </>
);

export default AIArchitectTasks;
