import React from 'react';
import FactionPageTemplate from '../components/FactionPageTemplate';

const GenesisFaction = () => {
  return (
    <FactionPageTemplate
      title="Genesis Faction"
      description="The founding faction establishing core principles and cross-domain collaboration."
      charter={(
        <>
          <p>
            The Genesis Faction Charter lays the groundwork for a unified community that bridges innovations across
            decentralized technologies. We operate with transparency, inclusivity, and a commitment to open-source
            advancement as we shape the earliest standards for the metaverse.
          </p>
          <p>
            Governance within Genesis is participatory and consensus-driven, empowering members to propose initiatives,
            vote on priorities, and steward shared resources for the benefit of the broader ecosystem.
          </p>
        </>
      )}
      mission={(
        <>
          <p>
            Our mission is to nurture a collaborative environment where pioneers from diverse technical backgrounds can
            experiment, learn, and build together. By providing guidance and a shared repository of knowledge, Genesis
            accelerates projects that push the boundaries of what interconnected digital worlds can become.
          </p>
          <p>
            Through mentorship, community events, and cross-faction partnerships, we aspire to cultivate the next wave of
            innovators who will define the metaverse era.
          </p>
        </>
      )}
      focus={(
        <>
          <p>Our focus areas include:</p>
          <ul>
            <li>Creating foundational protocols for interoperability between emerging factions</li>
            <li>Documenting best practices around decentralized governance and collaboration</li>
            <li>Hosting hackathons and workshops to incubate new cross-domain projects</li>
            <li>Supporting ethical guidelines and sustainable growth of the metaverse</li>
          </ul>
          <p>
            By concentrating on these pillars, the Genesis Faction serves as the launchpad for initiatives that will
            influence every corner of the platform.
          </p>
        </>
      )}
    />
  );
};

export default GenesisFaction;
