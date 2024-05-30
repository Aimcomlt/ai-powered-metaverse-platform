import React, { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [isNavVisible, setNavVisible] = useState(true);

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  return (
    <header className={`header ${isNavVisible ? '' : 'minimized'}`}>
      <div className="logo">Metaverse-Platform</div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#factions">Factions</a>
        <a href="#projects">Projects</a>
        <a href="#governance">Governance</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="toggle-button" onClick={toggleNav}>
        {isNavVisible ? '<<' : '>>'}
      </button>
    </header>
  );
};

export default Header;
