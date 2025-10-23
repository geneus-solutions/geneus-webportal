import React from "react";
import img1 from "../../assets/popularCourse_01.png";
import img2 from "../../assets/popularCourse_02.jpg";
import "./PopularCourse.css";
import { Link } from "react-router-dom";

const PopularCourse = () => {
  const courses = [
    {
      title: "HTML/ CSS/ JavaScript",
      image: img1,
      url: "/course/64e0c36eec5d32490e9f22d6",
      description:
        "Master HTML, CSS, and JavaScript to build visually appealing and responsive web pages.",
    },
    {
      title: "React Js",
      image: img2,
      url: "/course/64e0c36eec5d32490e9f22d7",
      description:
        "Learn React Js to create modern and interactive web applications with confidence.",
    },
  ];

  return (
    // <div className="popular-course-container">
    //   {/* Title Section */}
    //   <div className="popular-course-title-section">
    //     <h2>Popular Courses</h2>
    //     <div className="popular-course-lines-container">
    //       <div className="popular-course-line line-long"></div>
    //       <div className="popular-course-line line-short"></div>
    //     </div>
    //   </div>

    //   {/* Course Cards */}
    //   <div className="course-cards">
    //     {courses.map((course, index) => (
    //       <CourseCard
    //         key={index}
    //         title={course.title}
    //         image={course.image}
    //         url={course.url}
    //         duration={course.duration}
    //         description={course.description}
    //       />
    //     ))}
    //   </div>
    // </div>
     <section className="popular-courses">
     <h2 className="popular-courses-heading">Popular Courses</h2>
     <div className="popular-courses-grid">
       {courses.map((course) => (
         <div key={course.title} className="popular-course-card">
           <img
             src={course.image}
             alt={course.title}
             className="popular-course-image"
           />
           <h3 className="popular-course-title">{course.title}</h3>
           <p className="popular-course-description">
             {course.description.length > 150
               ? `${course.description.substring(0, 150)}...`
               : course.description}
           </p>
           <Link to={course.url} className="popular-course-learn-more-btn">
             Read More
           </Link>
         </div>
       ))}
     </div>
   </section>
  );
};

export default PopularCourse;
