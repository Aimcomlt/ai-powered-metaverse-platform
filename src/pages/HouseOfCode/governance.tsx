import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const HouseOfCodeGovernance: React.FC = () => (
  <>
    <Helmet>
      <title>House of Code Governance | Metaverse Platform</title>
      <meta
        name="description"
        content="Governance documents for the House of Code faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="house-of-code.governance.mpns"
      title="House of Code Governance"
    />
  </>
);

export default HouseOfCodeGovernance;
