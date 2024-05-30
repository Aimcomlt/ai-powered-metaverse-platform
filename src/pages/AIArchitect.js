import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FactionPage.css';

const AIArchitect = () => {
    return (
      <div className="faction-page">
        <h1>AI Architect</h1>
        <p>Designing and implementing advanced artificial intelligence systems and promoting AI ethics.</p>
        
        <div className="documents-section">
          <h2>Documents</h2>
          <ul>
            <li><a href="#charter">Charter</a></li>
            <li><a href="#mission">Mission</a></li>
            <li><a href="#focus">Focus</a></li>
            {/* Add more links to documents */}
          </ul>
        </div>
  
        <section id="charter">
          <h2>Charter</h2>
          <p>
            The AI Architect Charter establishes the foundation for our operations, governance, and strategic objectives. 
            Our primary aim is to foster innovation in artificial intelligence through collaborative efforts, education, and real-world applications. 
            We uphold the principles of transparency, ethics, and responsibility as we navigate the evolving landscape of AI and machine learning.
          </p>
          <p>
            The governance structure includes a decentralized decision-making process, ensuring all members have a voice. Regular meetings, 
            voting on proposals, and community engagement are key components of our governance framework.
          </p>
        </section>
  
        <section id="mission">
          <h2>Mission</h2>
          <p>
            Our mission is to advance the development and application of artificial intelligence by providing a platform for education, innovation, 
            and collaboration. We aim to create an ecosystem where developers, researchers, and enthusiasts can come together to share knowledge, 
            develop new technologies, and drive the adoption of AI solutions across various industries.
          </p>
          <p>
            By focusing on cutting-edge research and practical implementations, we strive to be at the forefront of the AI revolution, 
            contributing to the broader community and influencing the future of intelligent technologies.
          </p>
        </section>
  
        <section id="focus">
          <h2>Focus</h2>
          <p>
            Our focus areas include:
          </p>
          <ul>
            <li>Developing advanced machine learning algorithms</li>
            <li>Exploring ethical implications and AI governance</li>
            <li>Creating intelligent systems for real-world applications</li>
            <li>Enhancing AI security and privacy</li>
            <li>Promoting AI education and community engagement</li>
          </ul>
          <p>
            Through these focus areas, we aim to address current challenges in the AI space and drive forward the adoption of innovative solutions 
            that can transform industries and create new opportunities.
          </p>
        </section>
  
        <Link to="/ai-architect/course" className="course-link">View Course</Link>
      </div>
    );
  };
  
  export default AIArchitect;
