import React from "react";
import "./PopularCourses.css";
import CourseCard from "./CourseCard";
import img1 from "../../../assets/popularCourse_01.png";
import img2 from "../../../assets/popularCourse_02.jpg";
import { Link } from "react-router-dom";

const courses = [
  {
    title: "HTML/ CSS/ JavaScript",
    description:
      "Master HTML, CSS, and JavaScript to build visually appealing and responsive web pages.",
    image: img1,
    url: "/course/64e0c36eec5d32490e9f22d6",
  },
  {
    title: "React Js",
    description:
      "Learn React Js to create modern and interactive web applications with confidence",
    image: img2,
    url: "/course/64e0c36eec5d32490e9f22d7",
  },
 
];

const PopularCourses = () => {
  return (
    <section className="popular-courses">
      <div className="left">
        <h2>Discover Our <br /> Popular Courses</h2>
        <p>
          Explore the top trending courses designed to help you learn and grow.
        </p>
       <Link to="/courses" className="btn">See More Courses</Link>
      </div>
      <div className="right">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;
