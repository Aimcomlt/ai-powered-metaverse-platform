import React from 'react';
import '../styles/CoursePage.css';

const BlockchainCourse = () => {
  return (
    <div className="course-page">
      <h1>Blockchain Battalion: Comprehensive Blockchain Course</h1>
      
      <section>
        <h2>Course Title</h2>
        <p>Comprehensive Blockchain Course</p>
      </section>

      <section>
        <h2>Course Overview</h2>
        <p>
          This course provides an in-depth understanding of blockchain technology and its applications, focusing on both theoretical concepts and practical skills. 
          Designed for developers and technology enthusiasts, the course requires basic programming knowledge and an interest in blockchain technologies.
        </p>
      </section>

      <section>
        <h2>Learning Objectives</h2>
        <ul>
          <li>Understand the fundamentals of blockchain technology</li>
          <li>Learn Solidity programming and smart contract development</li>
          <li>Build decentralized applications (DApps)</li>
          <li>Deploy and manage blockchain projects</li>
        </ul>
      </section>

      <section>
        <h2>Modules and Lessons</h2>
        <div className="module">
          <h3>Module 1: Introduction</h3>
          <ul>
            <li>Lesson 1: Overview of Blockchain Technology</li>
            <li>Lesson 2: Ethereum and its Ecosystem</li>
          </ul>
        </div>
        <div className="module">
          <h3>Module 2: Solidity Programming</h3>
          <ul>
            <li>Lesson 1: Basics of Solidity</li>
            <li>Lesson 2: Advanced Solidity Concepts</li>
          </ul>
        </div>
        <div className="module">
          <h3>Module 3: Smart Contracts Development</h3>
          <ul>
            <li>Lesson 1: Writing Smart Contracts</li>
            <li>Lesson 2: Testing and Deployment</li>
          </ul>
        </div>
        <div className="module">
          <h3>Module 4: DApps Development</h3>
          <ul>
            <li>Lesson 1: Building Frontend for DApps</li>
            <li>Lesson 2: Integrating with Smart Contracts</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Hands-On Projects</h2>
        <p>
          Engage in real-world projects that allow you to apply the concepts learned throughout the course. These projects will help you build a portfolio of work that demonstrates your blockchain development skills.
        </p>
      </section>

      <section>
        <h2>Assessment and Certification</h2>
        <p>
          The course includes quizzes, assignments, and a final project to assess your understanding and skills. Upon successful completion, you will receive a certification that acknowledges your expertise in blockchain technology.
        </p>
      </section>

      <section>
        <h2>Additional Resources</h2>
        <p>
          Access a list of recommended readings, tools, and forums to further your knowledge and connect with other blockchain enthusiasts.
        </p>
      </section>
    </div>
  );
};

export default BlockchainCourse;
