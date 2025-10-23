// CourseSection.js
import React from "react";
import "./CourseSection.css";

const CourseSection = ({ title }) => {
  return (
    <div className="course-section">
      <h5>
        <b>{title}</b>
      </h5>
      <div className="paragraph">
        <p>"Enroll Now!!"</p>
        <p>"Happy Learning!!"</p>
        <p> "Team Geneus!!"</p>
      </div>
    </div>
  );
};

export default CourseSection;
