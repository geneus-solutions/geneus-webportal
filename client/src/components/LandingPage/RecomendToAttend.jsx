import React from "react";
import "./RecomendToAttend.css";

const RecomendToAttend = ({ course }) => {
  return (
    <section className="recommend-wrapper">
      <div className="recommend-heading">
        <h1>5,500+ PAST ATTENDEES...</h1>
        <h3>
          Recommend You To Attend This Course, If You Fit Any Of The Following ⬇️
        </h3>
      </div>

      <div className="recommend-grid">
        {course?.whoitsfor?.map((item, index) => (
          <div className="recommend-card" key={index}>
            <span className="check-icon">✔️</span>
            <span className="card-text">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecomendToAttend;
