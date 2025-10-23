// Syllabus.js
import React, { useState } from "react";
import "./CourseContent.css";

const CourseContent = ({ content }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="syllabus">
      <h2 className="heading6G">Course Content</h2>
      <div className="syllabus-list">
        {content?.map((item, index) => (
          <div key={index} className="syllabus-item">
            <div
              className="syllabus-header"
              onClick={() => toggleExpand(index)}
            >
              <span>{item.contentTitle}</span>
              <span>{item.time}</span>
              <span>{expandedIndex === index ? "👆" : "👇"}</span>
            </div>
            {expandedIndex === index && (
              <div className="syllabus-content">
                {item?.url?<iframe
                  title={item.contentTitle}
                  src={item.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>:<p>Buy now to access all the content</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
