
import React, { useState } from "react";
import "./AboutUs.css";
import { useLocation, useNavigate } from "react-router-dom";

const AboutUs = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <section className="about-us">
        <div className="about-content">
          <h2 className="heading">About Us</h2>
          <p className="aboutus-description">
            Welcome to Geneus Solutions, your premier destination for
            cutting-edge E-learning courses in full-stack development. Based in
            Bangalore, India, we are passionate about empowering individuals to
            become proficient and versatile developers in the ever-evolving
            field of technology.
          </p>

          {expanded && (
            <p className="more-content">
              At Geneus Solutions, we offer comprehensive courses covering
              HTML/CSS/Javascript, ReactJS and the complete MERN stack. Our
              dynamic and hands-on approach ensures that students not only grasp
              the theoretical foundations but also gain practical skills that
              are essential in the real-world scenario.
            </p>
          )}

          <button className="btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Read Less" : "Read More"}
          </button>
          {expanded && location?.pathname !== "/about" && (
            <button
              className="btn"
              onClick={() => {
                if (expanded) {
                  navigate("/about");
                }
              }}
            >
              {expanded ? "Know More" : ""}
            </button>
          )}
        </div>

        <div className="video-container">
          <iframe
            className="about-video"
            width="600"
            height="337"
            src="https://www.youtube.com/embed/2eTIgVyBnNg?rel=0&controls=0&showinfo=0&modestbranding=1"
            title="about us"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
