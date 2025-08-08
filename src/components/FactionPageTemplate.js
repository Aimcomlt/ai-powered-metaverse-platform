import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FactionPage.css';

const FactionPageTemplate = ({ data, loading, error }) => {
  if (loading) {
    return <div className="faction-page">Loading...</div>;
  }
  if (error || !data) {
    return <div className="faction-page">Error loading faction data.</div>;
  }

  const { title, description, charter, mission, focus, courseLink } = data;

  return (
    <div className="faction-page">
      <h1>{title}</h1>
      <p>{description}</p>

      <div className="documents-section">
        <h2>Documents</h2>
        <ul>
          <li>
            <a href="#charter">Charter</a>
          </li>
          <li>
            <a href="#mission">Mission</a>
          </li>
          <li>
            <a href="#focus">Focus</a>
          </li>
        </ul>
      </div>

      <section id="charter">
        <h2>Charter</h2>
        {Array.isArray(charter) &&
          charter.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
      </section>

      <section id="mission">
        <h2>Mission</h2>
        {Array.isArray(mission) &&
          mission.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
      </section>

      <section id="focus">
        <h2>Focus</h2>
        {focus?.intro && <p>{focus.intro}</p>}
        {Array.isArray(focus?.areas) && (
          <ul>
            {focus?.areas.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
        {focus?.summary && <p>{focus.summary}</p>}
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
