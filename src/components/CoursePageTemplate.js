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
    <div className="course-page">
      <h1>{title}</h1>

      {courseTitle && (
        <section>
          <h2>Course Title</h2>
          <p>{courseTitle}</p>
        </section>
      )}

      {overview && (
        <section>
          <h2>Course Overview</h2>
          <p>{overview}</p>
        </section>
      )}

      {objectives.length > 0 && (
        <section>
          <h2>Learning Objectives</h2>
          <ul>
            {objectives.map((obj, index) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </section>
      )}

      {modules.length > 0 && (
        <section>
          <h2>Modules and Lessons</h2>
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
        <section>
          <h2>Hands-On Projects</h2>
          <p>{projects}</p>
        </section>
      )}

      {assessment && (
        <section>
          <h2>Assessment and Certification</h2>
          <p>{assessment}</p>
        </section>
      )}

      {resources && (
        <section>
          <h2>Additional Resources</h2>
          <p>{resources}</p>
        </section>
      )}
    </div>
  );
};

export default CoursePageTemplate;
