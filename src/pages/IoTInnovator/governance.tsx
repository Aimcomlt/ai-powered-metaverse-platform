import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const IoTInnovatorGovernance: React.FC = () => (
  <>
    <Helmet>
      <title>IoT Innovator Governance | Metaverse Platform</title>
      <meta
        name="description"
        content="Governance documents for the IoT Innovator faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="iot-innovator.governance.mpns"
      title="IoT Innovator Governance"
    />
  </>
);

export default IoTInnovatorGovernance;
