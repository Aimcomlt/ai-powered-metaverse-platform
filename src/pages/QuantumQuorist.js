import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FactionPage.css';

const QuantumQuorist = () => {
    return (
      <div className="faction-page">
        <h1>Quantum Quorist</h1>
        <p>Advancing the understanding and application of quantum mechanics and computing.</p>
        
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
            The Quantum Quorist Charter establishes the foundation for our operations, governance, and strategic objectives. 
            Our primary aim is to foster innovation in quantum mechanics and computing through collaborative efforts, education, and real-world applications. 
            We uphold the principles of scientific rigor, transparency, and ethical considerations as we navigate the evolving landscape of quantum technologies.
          </p>
          <p>
            The governance structure includes a decentralized decision-making process, ensuring all members have a voice. Regular meetings, 
            voting on proposals, and community engagement are key components of our governance framework.
          </p>
        </section>
  
        <section id="mission">
          <h2>Mission</h2>
          <p>
            Our mission is to advance the development and application of quantum mechanics and computing by providing a platform for education, innovation, 
            and collaboration. We aim to create an ecosystem where scientists, researchers, and enthusiasts can come together to share knowledge, 
            develop new technologies, and drive the adoption of quantum solutions across various industries.
          </p>
          <p>
            By focusing on cutting-edge research and practical implementations, we strive to be at the forefront of the quantum revolution, 
            contributing to the broader community and influencing the future of quantum technologies.
          </p>
        </section>
  
        <section id="focus">
          <h2>Focus</h2>
          <p>
            Our focus areas include:
          </p>
          <ul>
            <li>Advancing quantum computing algorithms and architectures</li>
            <li>Exploring quantum cryptography and secure communications</li>
            <li>Developing quantum simulations for scientific research</li>
            <li>Enhancing quantum hardware and materials</li>
            <li>Promoting quantum education and community engagement</li>
          </ul>
          <p>
            Through these focus areas, we aim to address current challenges in the quantum space and drive forward the adoption of innovative solutions 
            that can transform industries and create new opportunities.
          </p>
        </section>
  
        <Link to="/quantum-quorist/course" className="course-link">View Course</Link>
      </div>
    );
  };
  
  export default QuantumQuorist;
