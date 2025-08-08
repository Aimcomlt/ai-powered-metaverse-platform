import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FactionPage.css';

const FactionPageTemplate = ({ title, description, charter, mission, focus, courseLink }) => {
  return (
    <div className="faction-page">
      <h1>{title}</h1>
      <p>{description}</p>

      <div className="documents-section">
        <h2>Documents</h2>
        <ul>
          <li><a href="#charter">Charter</a></li>
          <li><a href="#mission">Mission</a></li>
          <li><a href="#focus">Focus</a></li>
        </ul>
      </div>

      <section id="charter">
        <h2>Charter</h2>
        {charter}
      </section>

      <section id="mission">
        <h2>Mission</h2>
        {mission}
      </section>

      <section id="focus">
        <h2>Focus</h2>
        {focus}
      </section>

      {courseLink && (
        <Link to={courseLink} className="course-link">
          View Course
        </Link>
      )}
    </div>
  );
};

export default FactionPageTemplate;
