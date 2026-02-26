import React from 'react';
import '../../App.css';
import mascot from '../../assets/images/mascot.png';

const Footer = () => {
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
