import React from 'react';
import '../styles/CoursePage.css';

const IoTCourse = () => {
  return (
    <div className="course-page">
      <h1>IoT Innovator: Comprehensive IoT Course</h1>
      
      <section>
        <h2>Course Title</h2>
        <p>Comprehensive IoT Course</p>
      </section>

      <section>
        <h2>Course Overview</h2>
        <p>
          This course provides an in-depth understanding of Internet of Things (IoT) technology and its applications, focusing on both theoretical concepts and practical skills. 
          Designed for developers and technology enthusiasts, the course requires basic programming knowledge and an interest in IoT technologies.
        </p>
      </section>

      <section>
        <h2>Learning Objectives</h2>
        <ul>
          <li>Understand the fundamentals of IoT technology</li>
          <li>Learn IoT device integration and interoperability</li>
          <li>Build smart applications and systems</li>
          <li>Explore IoT security and privacy considerations</li>
        </ul>
      </section>

      <section>
        <h2>Modules and Lessons</h2>
        <div className="module">
          <h3>Module 1: Introduction to IoT</h3>
          <ul>
            <li>Lesson 1: Overview of Internet of Things</li>
            <li>Lesson 2: History and Evolution of IoT</li>
          </ul>
        </div>
        <div className="module">
          <h3>Module 2: IoT Devices and Protocols</h3>
          <ul>
            <li>Lesson 1: Basics of IoT Devices</li>
            <li>Lesson 2: IoT Communication Protocols</li>
          </ul>
        </div>
        <div className="module">
          <h3>Module 3: IoT Systems Development</h3>
          <ul>
            <li>Lesson 1: Designing IoT Systems</li>
            <li>Lesson 2: Implementing IoT Solutions</li>
          </ul>
        </div>
        <div className="module">
          <h3>Module 4: IoT Security and Privacy</h3>
          <ul>
            <li>Lesson 1: Securing IoT Systems</li>
            <li>Lesson 2: Privacy Considerations in IoT</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Hands-On Projects</h2>
        <p>
          Engage in real-world projects that allow you to apply the concepts learned throughout the course. These projects will help you build a portfolio of work that demonstrates your IoT development skills.
        </p>
      </section>

      <section>
        <h2>Assessment and Certification</h2>
        <p>
          The course includes quizzes, assignments, and a final project to assess your understanding and skills. Upon successful completion, you will receive a certification that acknowledges your expertise in Internet of Things technology.
        </p>
      </section>

      <section>
        <h2>Additional Resources</h2>
        <p>
          Access a list of recommended readings, tools, and forums to further your knowledge and connect with other IoT enthusiasts.
        </p>
      </section>
    </div>
  );
};

export default IoTCourse;
