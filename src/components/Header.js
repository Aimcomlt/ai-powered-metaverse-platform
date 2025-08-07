import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/">Home</Link>
        <Link to="/submit">Submit Document</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/governance">Governance</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/house-of-code/tasks">House of Code Tasks</Link>
      </nav>
      <button className="toggle-button" onClick={toggleNav}>
        {isNavVisible ? '<<' : '>>'}
      </button>
    </header>
  );
};

export default Header;

