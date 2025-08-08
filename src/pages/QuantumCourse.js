import React from 'react';
import { Helmet } from 'react-helmet-async';
import CoursePageTemplate from '../components/CoursePageTemplate';

const quantumCourseData = {
  title: 'Quantum Quorist: Comprehensive Quantum Computing Course',
  courseTitle: 'Comprehensive Quantum Computing Course',
  overview: `This course provides an in-depth understanding of quantum mechanics and computing, focusing on both theoretical concepts and practical skills. Designed for scientists and technology enthusiasts, the course requires basic knowledge of physics and an interest in quantum technologies.`,
  objectives: [
    'Understand the fundamentals of quantum mechanics',
    'Learn quantum computing algorithms and architectures',
    'Explore quantum cryptography and secure communications',
    'Develop quantum simulations for scientific research',
  ],
  modules: [
    {
      title: 'Module 1: Introduction to Quantum Mechanics',
      lessons: [
        'Lesson 1: Fundamentals of Quantum Mechanics',
        'Lesson 2: Quantum States and Entanglement',
      ],
    },
    {
      title: 'Module 2: Quantum Computing',
      lessons: [
        'Lesson 1: Basics of Quantum Computing',
        'Lesson 2: Quantum Algorithms',
      ],
    },
    {
      title: 'Module 3: Quantum Cryptography',
      lessons: [
        'Lesson 1: Principles of Quantum Cryptography',
        'Lesson 2: Quantum Key Distribution',
      ],
    },
    {
      title: 'Module 4: Quantum Simulations',
      lessons: [
        'Lesson 1: Designing Quantum Simulations',
        'Lesson 2: Applications of Quantum Simulations',
      ],
    },
  ],
  projects: `Engage in real-world projects that allow you to apply the concepts learned throughout the course. These projects will help you build a portfolio of work that demonstrates your quantum computing skills.`,
  assessment: `The course includes quizzes, assignments, and a final project to assess your understanding and skills. Upon successful completion, you will receive a certification that acknowledges your expertise in quantum computing.`,
  resources: `Access a list of recommended readings, tools, and forums to further your knowledge and connect with other quantum computing enthusiasts.`,
};

const QuantumCourse = () => (
  <>
    <Helmet>
      <title>Quantum Quorist Course | Metaverse Platform</title>
      <meta
        name="description"
        content="Comprehensive quantum computing course covering algorithms, cryptography, and simulations."
      />
    </Helmet>
    <CoursePageTemplate {...quantumCourseData} />
  </>
);

export default QuantumCourse;
