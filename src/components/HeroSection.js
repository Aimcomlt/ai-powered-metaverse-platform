import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to the Future of Collaboration</h1>
        <p>Join a faction, engage in cross-disciplinary projects, and shape the future with AI-powered governance.</p>
        <button className="cta-button">Get Started</button>
      </div>
    </section>
  );
};

export default HeroSection;
