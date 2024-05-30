import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: info@metaverse-platform.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Metaverse St, Virtual City</p>
        </div>
        <div className="social-media">
          <h3>Follow Us</h3>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="newsletter">
          <h3>Newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
