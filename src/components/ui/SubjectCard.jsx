import React from 'react';
import '../../App.css';

const SubjectCard = ({ name, icon, gradientClass, onClick }) => {
  return (
    <div className={`subject-card ${gradientClass}`} onClick={onClick}>
      <div className="card-content">
        <span className="card-icon">{icon}</span>
        <h3 className="card-title">{name}</h3>
      </div>
    </div>
  );
};

export default SubjectCard;
