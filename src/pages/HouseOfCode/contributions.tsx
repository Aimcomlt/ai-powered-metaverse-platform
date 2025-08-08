import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const HouseOfCodeContributions: React.FC = () => (
  <>
    <Helmet>
      <title>House of Code Contributions | Metaverse Platform</title>
      <meta
        name="description"
        content="Browse contributions in the House of Code faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="house-of-code.contributions.mpns"
      title="House of Code Contributions"
    />
  </>
);

export default HouseOfCodeContributions;
