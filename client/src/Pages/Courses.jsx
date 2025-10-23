import React, { useState } from "react";
// import img1 from "../assets/banner.jpeg";
import "./Courses.css";
import { useCourcesQuery } from "../features/cources/courceApiSlice";
import CourseCard from "../components/Courses/CourseCard";
// import CourseBanner from "../components/Courses/CourseBanner";
import { IoMdArrowDropdown } from "react-icons/io";
import Loading from "../components/loading/Loading";

const Courses = ({ searchResults }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: courses, isLoading } = useCourcesQuery();

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCourses = courses?.filter((course) => {
    if (selectedOption.toUpperCase() === "BEGINNER") {
      return course.level.toUpperCase() === "BEGINNER";
    } else if (selectedOption.toUpperCase() === "INTERMEDIATE") {
      return course.level.toUpperCase() === "INTERMEDIATE";
    } else if (selectedOption.toUpperCase() === "ADVANCED") {
      return course.level.toUpperCase() === "ADVANCED";
    }
    return true;
  });

  const searchedCourses = filteredCourses?.filter((course) =>
    course.title.toLowerCase().includes(searchTerm)
  );

  const beginnerCourses = searchedCourses?.filter(
    (course) =>
      course.level.toUpperCase() === "BEGINNER" && course.enabled === true
  );
  const intermediateCourses = searchedCourses?.filter(
    (course) =>
      course.level.toUpperCase() === "INTERMEDIATE" && course.enabled === true
  );
  const advancedCourses = searchedCourses?.filter(
    (course) =>
      course.level.toUpperCase() === "ADVANCED" && course.enabled === true
  );

  const displayedCourses =
    searchResults?.length > 0
      ? searchResults
      : selectedOption === "BEGINNER"
      ? beginnerCourses
      : selectedOption === "INTERMEDIATE"
      ? intermediateCourses
      : selectedOption === "ADVANCED"
      ? advancedCourses
      : searchedCourses?.filter((course) => course?.enabled === true);

  // const course = {
  //   title: "Course",
  //   description:
  //     "There are many courses listed here, select the course of your choice.",
  // };

  return (
    <div>
      {/* <CourseBanner imgSrc={img1} course={course} /> */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* course drop down and search box */}
          <div className="search-dropdown-container">
            <div className="dropdown">
              <button className="dropbtn">
                {selectedOption || "All Courses"}
                <IoMdArrowDropdown className="arrow-down" />
              </button>
              <div className="dropdown-content">
                <span onClick={() => handleDropdownChange("BEGINNER")}>
                  BEGINNER
                </span>
                <span onClick={() => handleDropdownChange("INTERMEDIATE")}>
                  INTERMEDIATE
                </span>
                <span onClick={() => handleDropdownChange("ADVANCED")}>
                  ADVANCED
                </span>
              </div>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              {/* <IoMdSearch className="search-icon" /> */}
            </div>
          </div>

          <div className="courses-container">
            {displayedCourses?.map((course) => (
              <CourseCard key={course?.id} course={course} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
