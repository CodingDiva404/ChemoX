import React from 'react';
import '../../App.css';

const Footer = () => {
  const mascot = "/1.png";
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <img src={mascot} alt="Mascot" className="footer-mascot" />
        <p>Learn, Experiment, and Grow with Fun!</p>
      </div>
      <div className="footer-right">
        <ul>
          <li>About</li>
          <li>Contact</li>
          <li>Privacy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
