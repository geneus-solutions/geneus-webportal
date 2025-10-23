import React from "react";
import "../../../styles/ReadyToGrowSection.css";

const points = [
  "Create user-friendly, beautiful, light and fast websites",
  "Learn to create responsive and interactive web pages",
  "Become an expert front end developer using ReactJs",
  "Courses prepared by 10+ years of experienced Corporate masters",
  "Whatsapp Support to resolve any technical issues",
  "Realtime projects",
  "100+ Interview Questions and Answers",
  "Certificate of Completion",
];

const ReadyToGrowSection = ({course}) => {
  return (
    <section className="wealth-section">
      <div className="wealth-content">
        <h2 className="wealth-heading">
          Ready To Grow Your Wealth On <span>100%</span> <br /> Web Development?
        </h2>
        <ul className="wealth-points">
          {course?.learnings?.map((point, index) => (
            <li key={index}><span className="tick">✔</span> {point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReadyToGrowSection;
