import React from 'react';
import './Footer.css';  // Footer-specific styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>Space-Col &copy; 2024</p>
      <div className="social-media-links">
        <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
