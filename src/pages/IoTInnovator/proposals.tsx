import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const IoTInnovatorProposals: React.FC = () => (
  <>
    <Helmet>
      <title>IoT Innovator Proposals | Metaverse Platform</title>
      <meta
        name="description"
        content="Proposals within the IoT Innovator faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="iot-innovator.proposals.mpns"
      title="IoT Innovator Proposals"
    />
  </>
);

export default IoTInnovatorProposals;
