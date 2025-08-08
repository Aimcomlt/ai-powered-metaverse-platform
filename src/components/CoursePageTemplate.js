import React from 'react';
import '../styles/CoursePage.css';

  const CoursePageTemplate = ({
    title,
    courseTitle,
    overview,
    objectives = [],
    modules = [],
    projects,
    assessment,
    resources,
  }) => {
    return (
      <main id="main-content" tabIndex={-1} className="course-page">
        <h1>{title}</h1>

        {courseTitle && (
          <section aria-labelledby="course-title">
            <h2 id="course-title">Course Title</h2>
            <p>{courseTitle}</p>
          </section>
        )}

        {overview && (
          <section aria-labelledby="overview">
            <h2 id="overview">Course Overview</h2>
            <p>{overview}</p>
          </section>
        )}

        {objectives.length > 0 && (
          <section aria-labelledby="objectives">
            <h2 id="objectives">Learning Objectives</h2>
            <ul>
              {objectives.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </section>
        )}

        {modules.length > 0 && (
          <section aria-labelledby="modules-lessons">
            <h2 id="modules-lessons">Modules and Lessons</h2>
            {modules.map((module, index) => (
              <div className="module" key={index}>
                <h3>{module.title}</h3>
                <ul>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex}>{lesson}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {projects && (
          <section aria-labelledby="projects">
            <h2 id="projects">Hands-On Projects</h2>
            <p>{projects}</p>
          </section>
        )}

        {assessment && (
          <section aria-labelledby="assessment">
            <h2 id="assessment">Assessment and Certification</h2>
            <p>{assessment}</p>
          </section>
        )}

        {resources && (
          <section aria-labelledby="resources">
            <h2 id="resources">Additional Resources</h2>
            <p>{resources}</p>
          </section>
        )}
      </main>
    );
  };

export default CoursePageTemplate;
