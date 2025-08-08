import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const HouseOfCodeProposals: React.FC = () => (
  <>
    <Helmet>
      <title>House of Code Proposals | Metaverse Platform</title>
      <meta
        name="description"
        content="Proposals within the House of Code faction."
      />
    </Helmet>
    <FactionContentList
      mpnsName="house-of-code.proposals.mpns"
      title="House of Code Proposals"
    />
  </>
);

export default HouseOfCodeProposals;
