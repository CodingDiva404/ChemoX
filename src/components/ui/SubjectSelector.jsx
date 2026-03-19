import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubjectCard from './SubjectCard.jsx';

const subjects = [
  { name: 'Chemistry', icon: '🧪', gradientClass: 'chemistry-gradient' },
  { name: 'Physics', icon: '⚡', gradientClass: 'physics-gradient' },
  { name: 'Biology', icon: '🌱', gradientClass: 'biology-gradient' },
];

const SubjectSelector = () => {
  const navigate = useNavigate();

  const handleCardClick = (subjectName) => {
    navigate(`/curriculum?subject=${subjectName}`);
  };

  return (
    <section className="subject-selector-container">
      <h2 className="section-title">Choose Your Subject</h2>

      <div className="card-grid">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.name}
            name={subject.name}
            icon={subject.icon}
            gradientClass={subject.gradientClass}
            onClick={() => handleCardClick(subject.name)}
          />
        ))}
      </div>

    </section>
  );
};

export default SubjectSelector;