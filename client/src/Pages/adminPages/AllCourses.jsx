import React, { useState } from "react";
import { useCourcesQuery } from "../../features/cources/courceApiSlice";
import { IoMdArrowDropdown} from "react-icons/io";
import Loading from "../../components/loading/Loading";
import "../../styles/AllCourses.css";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteCourseMutation } from "../../features/Course/CourseApiSlice";
import PopUp from "../../Pages/adminPages/visitorData/PopUp";

const AllCourses = ({ searchResults }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const { data: courses, isLoading } = useCourcesQuery();
  const [deleteCourse] = useDeleteCourseMutation();

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

  const displayedCourses =
    searchResults?.length > 0
      ? searchResults
      : searchedCourses?.filter((course) => course);

  const handleUpdateCourse = (course) => {
    navigate("/admin-dashboard/add-course", { state: {course} });
  };

  const handleDeleteCourse = async (courseId) => {
    try{
      const response = await deleteCourse(courseId).unwrap();
      console.log(response);
      alert(response.message);
      setShowPopUp(!showPopUp);
    }catch(error){
      console.log(error);
    }
  }

  const handleNoClick = () =>{
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="admin-course-container">
        {isLoading ? (
        <Loading />
      ) : (
        <>
      <div className="admin-course-controls">
        <div className="admin-course-dropdown">
          <button className="admin-course-dropdown-button">
            {selectedOption || "All Courses"}
            <IoMdArrowDropdown className="admin-course-dropdown-icon" />
          </button>
          <div className="admin-course-dropdown-menu">
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

        <div className="admin-course-search-box">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="admin-course-search-input"
          />
        </div>
      </div>

    
        <div className="admin-course-table-container">


        <table className="course-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Level</th>
              <th>Status</th>
              {/* <th>Created Date</th> */}
              <th>Update Course</th>
              <th>Delete Course</th>
            </tr>
          </thead>
          <tbody>
            {displayedCourses?.map((course) => (
              <tr key={course?.id}>
                <td>{course._id.slice(-4)}</td>
                <td className="admin-course-title">
                  <Link
                    to={`/course/${course?._id}`}
                    className="course-title-link"
                  >
                    {course.title}
                  </Link>
                </td>
                <td>{course.level}</td>
                <td>{course.enabled ? "Active" : "Inactive"}</td>
                {/* <td>{course.duration}</td> */}
                <td>
                  <button className="admin-course-update-button" onClick={()=>handleUpdateCourse(course)}>Update</button>
                </td>
                <td>
                  <button className="admin-course-delete-button" onClick={()=>handleDeleteCourse(setShowPopUp(!showPopUp))}>
                    Delete
                    </button>
                </td>
                {showPopUp && <PopUp title="Are you sure to delete the course?" handleYesClick={()=>handleDeleteCourse(course._id)} handleNoClick={handleNoClick}/>}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </>

      )}
    </div>
  );
};

export default AllCourses;
