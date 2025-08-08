import React from 'react';
import { Helmet } from 'react-helmet-async';
import CoursePageTemplate from '../components/CoursePageTemplate';

const iotCourseData = {
  title: 'IoT Innovator: Comprehensive IoT Course',
  courseTitle: 'Comprehensive IoT Course',
  overview: `This course provides an in-depth understanding of Internet of Things (IoT) technology and its applications, focusing on both theoretical concepts and practical skills. Designed for developers and technology enthusiasts, the course requires basic programming knowledge and an interest in IoT technologies.`,
  objectives: [
    'Understand the fundamentals of IoT technology',
    'Learn IoT device integration and interoperability',
    'Build smart applications and systems',
    'Explore IoT security and privacy considerations',
  ],
  modules: [
    {
      title: 'Module 1: Introduction to IoT',
      lessons: [
        'Lesson 1: Overview of Internet of Things',
        'Lesson 2: History and Evolution of IoT',
      ],
    },
    {
      title: 'Module 2: IoT Devices and Protocols',
      lessons: [
        'Lesson 1: Basics of IoT Devices',
        'Lesson 2: IoT Communication Protocols',
      ],
    },
    {
      title: 'Module 3: IoT Systems Development',
      lessons: [
        'Lesson 1: Designing IoT Systems',
        'Lesson 2: Implementing IoT Solutions',
      ],
    },
    {
      title: 'Module 4: IoT Security and Privacy',
      lessons: [
        'Lesson 1: Securing IoT Systems',
        'Lesson 2: Privacy Considerations in IoT',
      ],
    },
  ],
  projects: `Engage in real-world projects that allow you to apply the concepts learned throughout the course. These projects will help you build a portfolio of work that demonstrates your IoT development skills.`,
  assessment: `The course includes quizzes, assignments, and a final project to assess your understanding and skills. Upon successful completion, you will receive a certification that acknowledges your expertise in Internet of Things technology.`,
  resources: `Access a list of recommended readings, tools, and forums to further your knowledge and connect with other IoT enthusiasts.`,
};

const IoTCourse = () => (
  <>
    <Helmet>
      <title>IoT Innovator Course | Metaverse Platform</title>
      <meta
        name="description"
        content="Comprehensive IoT course covering devices, protocols, and security."
      />
    </Helmet>
    <CoursePageTemplate {...iotCourseData} />
  </>
);

export default IoTCourse;
