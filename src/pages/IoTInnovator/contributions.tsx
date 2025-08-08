import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const IoTInnovatorContributions: React.FC = () => (
  <>
    <Helmet>
      <title>IoT Innovator Contributions | Metaverse Platform</title>
      <meta
        name="description"
        content="Browse contributions in the IoT Innovator faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="iot-innovator.contributions.mpns"
      title="IoT Innovator Contributions"
    />
  </>
);

export default IoTInnovatorContributions;
