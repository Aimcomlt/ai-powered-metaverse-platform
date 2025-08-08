import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FeaturedFactions.css';

const FeaturedFactions = () => {
  const factions = [
    { 
      name: 'Quantum Quorist', 
      description: 'Advancing the understanding and application of quantum mechanics and computing.',
      image: '/images/quantum-quorist.webp',
      link: '/quantum-quorist'
    },
    { 
      name: 'Blockchain Battalion', 
      description: 'Exploring and developing the next generation of blockchain technologies and smart contracts.',
      image: '/images/blockchain-battalion.webp',
      link: '/blockchain-battalion'
    },
    { 
      name: 'AI Architect', 
      description: 'Designing and implementing advanced artificial intelligence systems and promoting AI ethics.',
      image: '/images/ai-architect.webp',
      link: '/ai-architect'
    },
    {
      name: 'IoT Innovator',
      description: 'Pioneering innovations in Internet of Things (IoT) systems and enhancing IoT security.',
      image: '/images/iot-innovator.webp',
      link: '/iot-innovator'
    },
    {
      name: 'Genesis Faction',
      description: 'Establishing core principles and cross-domain collaboration for the metaverse.',
      image: '/images/genesis-faction.webp',
      link: '/genesis-faction'
    }
  ];

  return (
    <section className="featured-factions">
      <h2>Featured Factions</h2>
      <div className="factions-grid">
        {factions.map((faction, index) => (
          <Link key={index} to={faction.link} className="faction-card">
            <img src={faction.image} alt={faction.name} className="faction-logo" />
            <h3>{faction.name}</h3>
            <p>{faction.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedFactions;

