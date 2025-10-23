import React from "react";
import "./InstructorCard.css";

const InstructorCard = ({ mentorImage }) => {
  return (
    <div className="main-instructor-card">
      <h2 className="instructor-heading">Instructor</h2>
      <div className="instructor-card">
        {mentorImage?.mentorImage ? (
          <img src={mentorImage?.mentorImage} alt="Mentor"></img>
          // </div>
          // <div className="instructor-description">
        ) : (
            <img src="https://i.postimg.cc/fbYvRtnb/Mentor-Jagadish-HK3.jpg" alt="Instructor"/>
        // <div className="instructor-info">
        //   <div className="instructor-photo">
        //   </div>
        //   <div className="instructor-details">
        //     <p>Full Stack Developer</p>
        //     <h2>JAGDISH SAIL</h2>
        //   </div>
        // </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCard;
