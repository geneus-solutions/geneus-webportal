// Requirements.js
import React from 'react';
import './CourseOtherDetails.css';

const CourseOtherDetails= ({ title, requirements }) => {
  return (
    <div className="requirements">
      <h2>{title}</h2>
      <ul className="requirements-list">
        {requirements?.map((requirement, index) => (
          <li key={index} className="requirements-item">
            <span className="checkmark">👉</span>
            <span className="requirement-text">{requirement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOtherDetails;
