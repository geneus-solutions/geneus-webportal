// CourseDetails.js
import React from 'react';
import './Description.css';

const Description = ({ courseIntro, aboutCourse, whyCourseTitle, 
    whyCourseIntro, whyCourseDetails
 }) => {
  return (
    <div className="course-details-description">
        <h2>Description</h2>
      <div className="course-section">
        <h5><b>What's this course about?</b></h5>
        <p>{courseIntro}</p>
        <ul>
          {aboutCourse?.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
      <div className="course-section">
        <h5><b>Why {whyCourseTitle}?</b></h5>
        <p>{whyCourseIntro}</p>
        <ul>
          {whyCourseDetails?.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Description;
