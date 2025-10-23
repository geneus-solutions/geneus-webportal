import React from "react";
import "./WhyAttend.css";

const WhyAttend = ({course}) => {

  return (
    <>
      <div className="whyattend-container">
        <div className="heading">
          <h1>WHY ATTEND THIS COURSE?</h1>
        </div>
        <div className="whyattend-item">
          {course?.aboutCourse?.intro && (
            <div className="whyattend">
              <p className="do-AI-driven-market">
                {course?.aboutCourse?.intro}
              </p>
              </div>
          )}
          {course?.whythisCourse?.intro && (
            <div className="whyattend">
              <p className="do-AI-driven-market">
                {course?.whythisCourse?.intro}
              </p>
        </div>
          )}
          {course?.whythisCourse?.outro && (
            <div className="whyattend">
              <p className="do-AI-driven-market">
                {course?.whythisCourse?.outro}
              </p>
      </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WhyAttend;
