// WhyChooseUs.jsx
import "./WhyChooseUs.css";
import { FaHeadset, FaChalkboardTeacher, FaGraduationCap, FaTools, FaPuzzlePiece } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div className="section-header">
        <span className="section-tag">Why Choose Us</span>
        <h2>Where Experience Meets Compassion</h2>
      </div>
      <div className="features-grid">
        <div className="feature-box">
          <FaGraduationCap className="feature-icon" />
          <h3>Comprehensive Curriculum</h3>
          <p>Our courses are carefully crafted to provide a comprehensive understanding of each technology, ensuring you cover all the essential concepts and advanced techniques.</p>
        </div>
        <div className="feature-box">
          <FaTools className="feature-icon" />
          <h3>Hands-on Projects</h3>
          <p>Put your skills into practice with real-world projects that simulate industry scenarios. Gain practical experience and build a portfolio that showcases your abilities.</p>
        </div>
        <div className="center-icon">
           <FaPuzzlePiece className="main-icon" />
          <h4>All-In-One Learning Experience</h4>
        </div>
        <div className="feature-box">
          <FaHeadset className="feature-icon" />
          <h3>Interactive Learning</h3>
          <p>Engage in interactive learning experiences, including coding exercises, quizzes, and discussions. Collaborate with fellow learners, exchange ideas, and get valuable feedback.</p>
        </div>
        <div className="feature-box">
          <FaChalkboardTeacher className="feature-icon" />
          <h3>Expert Instructors</h3>
          <p>Learn from experienced instructors who are passionate about full stack development and dedicated to helping you succeed. Benefit from their insights, industry knowledge, and best practices.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;