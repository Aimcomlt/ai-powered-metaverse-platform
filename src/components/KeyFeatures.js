import React from 'react';
import '../styles/KeyFeatures.css';

const KeyFeatures = () => {
  const features = [
    { title: 'Independent Blockchains', description: 'Tailored governance and operational efficiency for each faction.' },
    { title: 'AI Agents', description: 'Proposing tasks, optimizing documents, and enhancing engagement.' },
    { title: 'Cross-Faction Projects', description: 'Fostering interdisciplinary collaboration and innovation.' },
    { title: 'Decentralized Storage', description: 'Ensuring data integrity and accessibility with IPFS and MpNS.' }
  ];

  return (
    <section className="key-features">
      <h2>Key Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
