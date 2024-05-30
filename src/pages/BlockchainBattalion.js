import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FactionPage.css';

const BlockchainBattalion = () => {
    return (
      <div className="faction-page">
        <h1>Blockchain Battalion</h1>
        <p>Exploring and developing the next generation of blockchain technologies and smart contracts.</p>
        
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
            The Blockchain Battalion Charter establishes the foundation for our operations, governance, and strategic objectives. 
            Our primary aim is to foster innovation in blockchain technology through collaborative efforts, education, and real-world applications. 
            We uphold the principles of decentralization, transparency, and security as we navigate the evolving landscape of blockchain and digital assets.
          </p>
          <p>
            The governance structure includes a decentralized decision-making process, ensuring all members have a voice. Regular meetings, 
            voting on proposals, and community engagement are key components of our governance framework.
          </p>
        </section>
  
        <section id="mission">
          <h2>Mission</h2>
          <p>
            Our mission is to advance the development and application of blockchain technology by providing a platform for education, innovation, 
            and collaboration. We aim to create an ecosystem where developers, researchers, and enthusiasts can come together to share knowledge, 
            develop new technologies, and drive the adoption of blockchain solutions across various industries.
          </p>
          <p>
            By focusing on cutting-edge research and practical implementations, we strive to be at the forefront of the blockchain revolution, 
            contributing to the broader community and influencing the future of decentralized technologies.
          </p>
        </section>
  
        <section id="focus">
          <h2>Focus</h2>
          <p>
            Our focus areas include:
          </p>
          <ul>
            <li>Developing secure and scalable blockchain protocols</li>
            <li>Advancing smart contract technology and programming</li>
            <li>Creating decentralized applications (DApps) with real-world utility</li>
            <li>Exploring interoperability between different blockchain networks</li>
            <li>Enhancing blockchain security and privacy</li>
            <li>Promoting blockchain education and community engagement</li>
          </ul>
          <p>
            Through these focus areas, we aim to address current challenges in the blockchain space and drive forward the adoption of innovative solutions 
            that can transform industries and create new opportunities.
          </p>
        </section>
  
        <Link to="/blockchain-battalion/course" className="course-link">View Course</Link>
      </div>
    );
  };
  
  export default BlockchainBattalion;
