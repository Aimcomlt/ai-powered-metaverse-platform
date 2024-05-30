import React from 'react';
import '../styles/Introduction.css';

const Introduction = () => {
  return (
    <>


      <section id="tokenomics" className="tokenomics-section">
        <div className="container">
          <h2>Tokenomics Explained</h2>
          <p>The Metaverse-platform is a decentralized hub for innovation, education, and governance. Powered by blockchain technology, AI agents, and decentralized storage solutions like IPFS and MpNS, we enable seamless collaboration across specialized factions.</p>
          <p>The Metaverse-platform features a unique and engaging tokenomics system designed to incentivize learning, participation, and collaboration.</p>
          <div className="tokenomics-details">
            <h3>Tokens</h3>
            <p><strong>Governance Tokens (GTs):</strong> Play a crucial role in the platform’s governance and task engagement.</p>
            <p><strong>Faction Tokens (FTs):</strong> Minted when tasks are completed and can be used in real-world exchanges or liquidity pools.</p>

            <h3>Proof of Observation (PoO) Smart Contract</h3>
            <p>Engage with educational content and earn GTs through a PoO smart contract:</p>
            <ul>
              <li>Engage with Content: Interact with courses, articles, and videos.</li>
              <li>Earn GTs: The PoO smart contract tracks engagement and rewards GTs.</li>
            </ul>

            <h3>Identity Smart Contract</h3>
            <p>Keeps track of user achievements and verifies engagement:</p>
            <ul>
              <li>Achievement Tracking: Records all user activities and achievements.</li>
              <li>Verification: Ensures user engagement and task completion are verified.</li>
            </ul>

            <h3>Governance and Task Engagement</h3>
            <p>Use GTs to participate in governance and engage in tasks:</p>
            <ul>
              <li>Governance Participation: Vote on proposals and influence platform development.</li>
              <li>Task Engagement: Use GTs to take on tasks, which can range from educational assignments to collaborative projects.</li>
            </ul>

            <h3>Task Completion and Token Conversion</h3>
            <p>Completing tasks involves burning GTs and minting FTs:</p>
            <ul>
              <li>GTs are Burned: The GTs used for tasks are burned, reducing the total supply.</li>
              <li>FTs are Minted: Upon successful task completion, FTs are minted and rewarded to the user.</li>
            </ul>

            <h3>Utility and Real-World Use</h3>
            <p>Faction Tokens (FTs) have multiple real-world functionalities:</p>
            <ul>
              <li>Transfer: FTs can be transferred between users.</li>
              <li>Exchange: FTs can be used in real-world exchanges.</li>
              <li>Liquidity Pools: FTs can be added to liquidity pools to earn additional rewards.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Introduction;
