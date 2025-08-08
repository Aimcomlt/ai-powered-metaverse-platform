import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const HouseOfCodeTasks: React.FC = () => (
  <>
    <Helmet>
      <title>House of Code Tasks | Metaverse Platform</title>
      <meta name="description" content="Tasks for the House of Code faction." />
    </Helmet>
    <FactionContentList mpnsName="house-of-code.tasks.mpns" title="House of Code Tasks" />
  </>
);

export default HouseOfCodeTasks;
