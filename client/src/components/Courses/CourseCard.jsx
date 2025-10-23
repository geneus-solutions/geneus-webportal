import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CourseCard.css";
const CourseCard = ({ course }) => {
  // let myCourse = course?.title === 'Angular'&& course;
  // console.log(`this is my course ${course?.title}`, myCourse);
  const navigate = useNavigate();

  return (
    <div className="course-card">
      <img src={course?.img} alt={course?.title} className="coursecard-image" onClick={()=>navigate(`/course/${course?._id}`)}/>
      <div className="course-body">
        <h3 className="coursecard-title" onClick={()=>navigate(`/course/${course?._id}`)}>{course?.title}</h3>
        <div className="rating">
          <i>⭐</i>
          <i>⭐</i>
          <i>⭐</i>
          <i>⭐</i>
          <i>⭐</i>
        </div>
        <p className="course-price">
          <s>₹{course?.price}</s>{" "}
          <strong className="text-danger">₹{course?.discount_price}</strong>
        </p>
        <div className="text-center">
          <Link to={`/course/${course?._id}`}>
            <button className="view-more-btn">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
