import React from 'react';
import './MentorCourse.css';
import heroImage from '../../assets/MentorImage.png'; // Replace with actual image path
import { Link } from 'react-router-dom';

const MentorCourse = () => {
  return (
    <div className="hero-container">
  <div className="mentors-image">
    <img src={heroImage} alt="Professional" />
  </div>
  <div className="hero-content">
    <h1>Courses taught by Industry Leaders</h1>
    <ul className="mentor-features">
      <li>15+ years in Software Engineering.</li>
      <li>BE from RV College of Engineering, Bangalore.</li>
      <li>Expert in Full Stack Development. ReactJs, Java.</li>
      <li>Specialized in Spring Boot, Angular, MERN stack.</li>
      <li>Trained 5000+ in tech, web desing skills.</li>
    </ul>
    <Link to="/contact" className="mentor-contact-button">Still have any questions? Contact Us</Link>
  </div>
</div>


  );
};

export default MentorCourse;
