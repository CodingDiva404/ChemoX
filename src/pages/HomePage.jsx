import React from 'react';
import '../App.css';
import HeroSection from '../components/layout/HeroSection.jsx';
import SubjectSelector from '../components/ui/SubjectSelector.jsx';
import HowItWorks from './HowItWorks';

const Home = () => {
  return (
    <div className="App">
      <HeroSection />
      <SubjectSelector />
      <div className="wave-separator">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#f4f7fa" d="M0,32 C360,96 1080,0 1440,64 L1440,100 L0,100 Z" />
        </svg>
      </div>
      <HowItWorks />
    </div>
  );
};

export default Home;
