import React from 'react';
import { Helmet } from 'react-helmet-async';
import CoursePageTemplate from '../components/CoursePageTemplate';

const blockchainCourseData = {
  title: 'Blockchain Battalion: Comprehensive Blockchain Course',
  courseTitle: 'Comprehensive Blockchain Course',
  overview: `This course provides an in-depth understanding of blockchain technology and its applications, focusing on both theoretical concepts and practical skills. Designed for developers and technology enthusiasts, the course requires basic programming knowledge and an interest in blockchain technologies.`,
  objectives: [
    'Understand the fundamentals of blockchain technology',
    'Learn Solidity programming and smart contract development',
    'Build decentralized applications (DApps)',
    'Deploy and manage blockchain projects',
  ],
  modules: [
    {
      title: 'Module 1: Introduction',
      lessons: [
        'Lesson 1: Overview of Blockchain Technology',
        'Lesson 2: Ethereum and its Ecosystem',
      ],
    },
    {
      title: 'Module 2: Solidity Programming',
      lessons: [
        'Lesson 1: Basics of Solidity',
        'Lesson 2: Advanced Solidity Concepts',
      ],
    },
    {
      title: 'Module 3: Smart Contracts Development',
      lessons: [
        'Lesson 1: Writing Smart Contracts',
        'Lesson 2: Testing and Deployment',
      ],
    },
    {
      title: 'Module 4: DApps Development',
      lessons: [
        'Lesson 1: Building Frontend for DApps',
        'Lesson 2: Integrating with Smart Contracts',
      ],
    },
  ],
  projects: `Engage in real-world projects that allow you to apply the concepts learned throughout the course. These projects will help you build a portfolio of work that demonstrates your blockchain development skills.`,
  assessment: `The course includes quizzes, assignments, and a final project to assess your understanding and skills. Upon successful completion, you will receive a certification that acknowledges your expertise in blockchain technology.`,
  resources: `Access a list of recommended readings, tools, and forums to further your knowledge and connect with other blockchain enthusiasts.`,
};

const BlockchainCourse = () => (
  <>
    <Helmet>
      <title>Blockchain Battalion Course | Metaverse Platform</title>
      <meta
        name="description"
        content="Comprehensive blockchain course covering Solidity, smart contracts, and DApps development."
      />
    </Helmet>
    <CoursePageTemplate {...blockchainCourseData} />
  </>
);

export default BlockchainCourse;
