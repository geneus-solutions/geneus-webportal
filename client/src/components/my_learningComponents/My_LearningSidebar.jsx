import React, { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "../../styles/My_LearningSidebar.css";

const MyLearningSidebar = ({data}) => {

  // console.log('this is data from MyLearningSidebar', data);
  const navigate = useNavigate();

  const location = useLocation();
  const courseId = location.state?.courseId;

  useEffect(() => {
    if(!courseId && data?.courses?.length>=0){
      navigate('/my-learning/', { state: { courseId: data?.courses[0]?._id } });
    }
  }, [courseId,data?.courses,navigate]);

  const handleActiveCourse = (courseId) => {
    navigate('/my-learning/', { state: { courseId } });
  }

  return (
    <>
      <h2 className="logo">My Courses</h2>
      <ul className="menu">
        {data?.courses?.map(course => {
          return (
            <li className={course?._id === courseId && "active"} key={course?._id} onClick={()=>handleActiveCourse(course?._id)} >{course?.whythisCourse?.title}</li>
          )
        })}
      </ul>
      {/* <div className="settings">
        <p>Settings</p>
        <p>Support</p>
      </div> */}
    </>
  );
};

export default MyLearningSidebar;
