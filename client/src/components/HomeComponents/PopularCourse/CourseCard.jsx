import React from "react";
import "./PopularCourses.css";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="course-cards">
      <div className="image-container">
        <img src={course.image} alt={course.title} />
      </div>
      <div className="card-content">
        <Link to={course.url} className="popular-course-card-title"><h4>{course.title}</h4></Link>
        <p>{course.description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
