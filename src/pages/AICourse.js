import React from 'react';
import CoursePageTemplate from '../components/CoursePageTemplate';

const aiCourseData = {
  title: 'AI Architect: Comprehensive AI Course',
  courseTitle: 'Comprehensive AI Course',
  overview: `This course provides an in-depth understanding of artificial intelligence and its applications, focusing on both theoretical concepts and practical skills. Designed for developers and technology enthusiasts, the course requires basic programming knowledge and an interest in AI technologies.`,
  objectives: [
    'Understand the fundamentals of artificial intelligence',
    'Learn machine learning algorithms and techniques',
    'Build intelligent systems and applications',
    'Explore ethical considerations and AI governance',
  ],
  modules: [
    {
      title: 'Module 1: Introduction to AI',
      lessons: [
        'Lesson 1: Overview of Artificial Intelligence',
        'Lesson 2: History and Evolution of AI',
      ],
    },
    {
      title: 'Module 2: Machine Learning',
      lessons: [
        'Lesson 1: Basics of Machine Learning',
        'Lesson 2: Advanced Machine Learning Techniques',
      ],
    },
    {
      title: 'Module 3: AI Systems Development',
      lessons: [
        'Lesson 1: Designing Intelligent Systems',
        'Lesson 2: Implementing AI Solutions',
      ],
    },
    {
      title: 'Module 4: Ethics and Governance',
      lessons: [
        'Lesson 1: Ethical Implications of AI',
        'Lesson 2: AI Governance and Regulation',
      ],
    },
  ],
  projects: `Engage in real-world projects that allow you to apply the concepts learned throughout the course. These projects will help you build a portfolio of work that demonstrates your AI development skills.`,
  assessment: `The course includes quizzes, assignments, and a final project to assess your understanding and skills. Upon successful completion, you will receive a certification that acknowledges your expertise in artificial intelligence.`,
  resources: `Access a list of recommended readings, tools, and forums to further your knowledge and connect with other AI enthusiasts.`,
};

const AICourse = () => <CoursePageTemplate {...aiCourseData} />;

export default AICourse;
