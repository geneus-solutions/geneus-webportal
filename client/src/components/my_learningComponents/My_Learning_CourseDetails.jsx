import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGetQuizzesQuery } from "../../features/quiz/quizApiSlice";

import "../../styles/MyLearningCourseDetails.css";

const MyLearningCourseDetails = ({ data }) => {

  const [courseData, setCourseData] = useState({});
  const [selectedTab, setSelectedTab] = useState("Overview");

  
  const location = useLocation();
  const courseId = location.state?.courseId;
  const currentContent = location.state?.content;
  
  const { data: quizzesData } = useGetQuizzesQuery({
    courseId: courseData?._id,
    title: currentContent?.contentTitle,
  },{
    skip: !courseData?._id && !currentContent?.contentTitle, // Skip if courseData is not set
  });

  useEffect(() => {
    if (data?.courses) {
      const course = data?.courses?.find((course) => course?._id === courseId);
      setCourseData(course);
    }
  }, [courseId, data]);

  // console.log("this is course data", currentContent);
  return (
    <div className="course-details">
      <div className="course-content">
        <h5 className="course-title">{courseData?.title}</h5>
        <p className="content-title">
          <b>{currentContent?.contentTitle}</b>
        </p>
        <div className="my-learning-video-container">
          <iframe
            title={currentContent?.contentTitle}
            src={currentContent?.url && `${currentContent?.url}?rel=0`}
            width="100%"
            height="400px"
            className="video-frame"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="tabs">
          {["Notes", "Overview", "Requirements", "Learnings" , "Quizzes"].map(
            (tab) => (
              <button
                key={tab}
                className={selectedTab === tab ? "active" : ""}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="tab-content">
          {selectedTab === "Notes" && (
            <div className="about-course">
              {/* {currentContent?.notes ? (
                <>
                  <h2>Notes</h2>
                  {currentContent?.notes?.map((val, index) => (
                    <p>
                      <p>Real Time Project:</p>
                      <Link to={val} target="_blank" rel="noopener noreferrer">
                        {" "}
                        Click here
                      </Link>
                    </p>
                  ))}
                </>
              ) : (
                courseData.notes && (
                  <>
                    <h2>Notes</h2>
                    <Link to={courseData?.notes?.notesUrl}
                    target="_blank" rel="noopener noreferrer">
                      {courseData?.notes?.notesTitle}
                    </Link>
                  </>
                )
              )} */}
              {courseData?._id === "64e0c36eec5d32490e9f22d7" && (
                <>
                  <h2>Notes</h2>
                  <div>
                    <Link
                      to="https://docs.google.com/document/d/1G5dmTyJbnC759eAcUd3Uw8ArXF0l44bBOacE2NsAAME/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React Js
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="https://docs.google.com/document/d/1w6gmuAjjOUfF-9obstPa3Cf7EeNYT3zq/edit?usp=sharing&ouid=107792749908186382897&rtpof=true&sd=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Real Time Project
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
          {selectedTab === "Overview" && (
            <div className="about-course">
              <h2>About Course</h2>
              <p>{courseData?.aboutCourse?.intro}</p>
            </div>
          )}
          {selectedTab === "Requirements" && (
            <div className="faq-section">
              <h2>Requirements</h2>
              {courseData?.requirements?.map((val, index) => (
                <p key={index}>{val}</p>
              ))}
            </div>
          )}
          {selectedTab === "Learnings" && (
            <div className="announcements-section">
              <h2>Learnings</h2>
              {courseData?.learnings?.map((val, index) => (
                <p key={index}>{val}</p>
              ))}
            </div>
          )}
          {selectedTab === "Quizzes" && (
            <div className="reviews-section">
              <h2>Play Quizze</h2>
              {quizzesData?.length > 0 ? (
                quizzesData?.map((quiz, index) => (
                  <div key={index} className="quiz-item">
                    <h3>{quiz.title}</h3>
                    <p>{quiz.description}</p>
                    <Link
                      to={`/quiz/${quiz._id}`}
                      className="start-quiz-button"
                    >
                      Start Quiz
                    </Link>
                  </div>
                ))
              ) : (
                <p>No quizzes available for this course.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearningCourseDetails;
