import React, { useEffect, useState } from "react";

import { useMyLearningQuery } from "../features/MyLearning/LearningApiSlice";

import MyLearningSidebar from "../components/my_learningComponents/My_LearningSidebar";
import MyLearningCourseDetails from "../components/my_learningComponents/My_Learning_CourseDetails";
// import MyLearningCourseContent from "../components/my_learningComponents/My_Learning_CourseContent";
// import MyLearningAuthorInfo from "../components/my_learningComponents/My_Learning_AuthorInfo";

import "../styles/My_Learning.css";
import MyLearningCourseContent from "../components/my_learningComponents/My_Learning_CourseContent";
import { useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";

const MyLearning = () => {

  const { data: courses, isLoading } = useMyLearningQuery();

  const [courseData, setCourseData] = useState({});

  const location = useLocation();
  const courseId = location.state?.courseId;

  useEffect(() => {
    if (courses?.courses) {
      const course = courses?.courses?.find(
        (course) => course?._id === courseId
      );
      setCourseData(course);
    }
  }, [courseId, courses]);

  // console.log(courses, 'this is courses')
  return (
    <div className="dashboard">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {courses?.courses?.length > 0 ? (
            <>
              <aside className="sidebar">
                <MyLearningSidebar data={courses} />
              </aside>
              <main className="main-content">
                <MyLearningCourseDetails data={courses} />
              </main>
              <aside className="right-sidebar">
                <MyLearningCourseContent data={courseData} />
              </aside>
            </>
          ) : (
            <p className="no-courses">No Course Purchase.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyLearning;
