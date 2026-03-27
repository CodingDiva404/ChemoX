import React from 'react';
import GenericSimulator from './GenericSimulator';
import './PendingPractical.css';

const PendingPractical = ({ chapter }) => {
  const renderPendingMessage = () => (
    <div className="pending-practical-container">
      <div className="pending-content">
        <div className="pending-icon">🛠️</div>
        <h2 className="pending-title">Experiment Under Development</h2>
        <p className="pending-text">
          Our team is currently building the interactive simulation for <strong>"{chapter?.title || 'this experiment'}"</strong>.
        </p>
        <div className="pending-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <p className="pending-footer">Check back soon for the full experience!</p>
      </div>
    </div>
  );

  return (
    <GenericSimulator
      chapter={chapter}
      customRenderer={renderPendingMessage}
    />
  );
};

export default PendingPractical;
