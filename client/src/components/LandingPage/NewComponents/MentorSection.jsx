import "../../../styles/MentorSection.css";
import mentorImage from "../../../assets/MentorImage.png";

const MentorSection = () => {
  return (
    <section className="mentor-section">
      <h2 className="mentor-heading">MEET YOUR MENTOR</h2>
      {/* <p className="mentor-subheading">Learn from someone who's been where you want to go.</p> */}
      <div className="mentor-card">
        <div className="mentor-image" style={{
    backgroundImage: `url(${mentorImage})`,
  }}>
        </div>
         <div className="mentor-info">
          <h3 className="about-title">Jagadish Sail</h3>
          <p className="about-desc">
            <ul className="mentor-points">
              <li>12+ years in IT, Technical Leader at World's largest bank</li>
              <li>BE from RV College of Engineering, Bangalore</li>
              <li>Expert in Full Stack Development, ReactJS, Java</li>
              <li>Specialized in Spring Boot, Angular, MERN stack</li>
              <li>Trained 5000+ in tech, web design skills</li>
            </ul>
          </p>

          <blockquote className="mentor-quote">
            <span className="quote-bar"></span>
            <em>
              "I'll guide you not just to learn coding tools, but to think like a developer. From fundamentals to real-world skills,
              I’ll support you at every step of your journey into tech."
            </em>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
