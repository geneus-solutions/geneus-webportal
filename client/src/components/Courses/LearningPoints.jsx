// LearningPoints.js
import React from 'react';
import './LearningPoints.css';

const LearningPoints = ({ title, points }) => {
  return (
    <div className="learning-points-container">
      <div className="title">{title}</div>
      <ul className="points-list">
        {points?.map((point, index) => (
          <li key={index} className="point-item">
            <span className="checkmark">👉</span>
            <span className="point-text">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearningPoints;
