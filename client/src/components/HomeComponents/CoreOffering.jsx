import React from "react";
import "./CoreOffering.css";

const courses =[
  {
    icon: "🧭",
    title: "Beginner-Friendly",
    description:
      "Step-by-step courses designed for absolute beginners to kickstart their coding journey.",
  },
  {
    icon: "📚",
    title: "Advanced Concepts",
    description:
      "Deep dive into advanced topics and frameworks to level up your skills.",
  },
  {
    icon: "💻",
    title: "Real-World Projects",
    description:
      "Learn by building real-world projects and gain hands-on experience.",
  },
  {
    icon: "💲",
    title: "Affordable Pricing",
    description:
      "Access premium courses at prices tailored for students and professionals.",
  },
 
  {
    icon: "💬",
    title: "WhatsApp Support",
    description:
      "Get direct assistance and resolve your doubts via WhatsApp support, available round-the-clock.",
  },
  {
    icon: "📜",
    title: "Certification",
    description:
      "Earn certificates upon course completion to showcase your skills to employers and peers.",
  },
  {
  icon: "📝",
  title: "Providing Notes",
  description:
    "Access comprehensive study notes and resources for all courses module anytime to enhance your learning experience.",
}
]




const CoreOffering = () => {
  return (
    <>
      <section className="courses-section">
        {/* <h2>Courses</h2> */}
        <h1>Master Coding with Our Core Offerings</h1>
        <div className="courses-grid">
          {courses.map((course, index) => (
            <div className="core-course-card" key={index}>
              <div className="icon-circle">{course.icon}</div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      </section>

     
    </>
  );
};

export default CoreOffering;
