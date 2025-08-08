import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const IoTInnovatorTasks: React.FC = () => (
  <>
    <Helmet>
      <title>IoT Innovator Tasks | Metaverse Platform</title>
      <meta name="description" content="Tasks for the IoT Innovator faction." />
    </Helmet>
    <FactionContentList mpnsName="iot-innovator.tasks.mpns" title="IoT Innovator Tasks" />
  </>
);

export default IoTInnovatorTasks;
