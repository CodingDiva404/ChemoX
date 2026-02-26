import React from 'react';
import '../App.css';

const steps = [
  { title: 'Select Subject', description: 'Pick Chemistry, Physics, or Biology.', icon: '🧪' },
  { title: 'Start Experiment', description: 'Perform interactive virtual experiments safely.', icon: '⚡' },
  { title: 'Learn & Track', description: 'Save your results and improve understanding.', icon: '📊' },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works-container">
      <h2>How It Works</h2>
      <div className="steps-grid">
        {steps.map((step, idx) => (
          <div className="step-card" key={idx}>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
