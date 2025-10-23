import "./AboutUsFirst.css";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const AboutUsFirst = () => {
      const navigate = useNavigate();
  return (
       <div className="about-wrapper">
      <div className="aboutus-content">
        <h1>About Us</h1>
        <p>
          We provide the best online learning experience from the comfort of your home.
          Learn at your own pace, with expert-curated courses at an affordable price.
        </p>

        <div className="aboutus-buttons">
          <button className="btn primary" onClick={() => navigate("/courses")}>
            Enroll Course
          </button>
          <button className="btn secondary" onClick={() => navigate("/contact")}>
            Contact Us
          </button>
        </div>

        <div className="aboutus-socials">
          <a
            href="https://www.facebook.com/geneus.solutions"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.instagram.com/geneus.solutions"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://www.linkedin.com/company/geneus-solutions"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutUsFirst
