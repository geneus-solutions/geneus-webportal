import React from "react";
import "./Footer.css"; // Import the CSS for styling
import {
  FaInstagram,
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section company-info">
          <h2>Geneus Solutions</h2>
          <p>Provides the best contents for learning in an affordable price.</p>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/geneus.solutions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon facebook" />
            </a>
            <a
              href="https://www.instagram.com/geneus.solutions"
              target="_blank"
              rel="noopener noreferrer"
            >

            <FaInstagram className="social-icon instagram" />
            </a>
            <a
              href="https://www.linkedin.com/company/geneus-solutions"
              target="_blank"
              rel="noopener noreferrer"
            >

            <FaLinkedin className="social-icon whatsapp" />
            </a>
          </div>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Link</h3>
          <ul>
            <li className="footer-links">
              <Link to="/about" className="footer-links">
                About
              </Link>
            </li>
            <li className="footer-links">
              <Link to="/courses" className="footer-links">
                Courses
              </Link>
            </li>
            <li className="footer-links">
              <Link to="/nutri-app" className="footer-links">
                Nutri App
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact us</h3>
          <ul>
            {/* <li><FaMapMarkerAlt /> Bengaluru </li> */}
            <li className="footer-links">
              <FaEnvelope />{" "}
              <a
                href="mailto:support@geneussolutions.in"
                style={{ color: "white" }}
              >
                support@geneussolutions.in
              </a>{" "}
            </li>
            <li className="footer-links">
              <MdOutlinePrivacyTip />
              <Link to="/privacy" className="footer-links">
                {" "}
                Privacy policy
              </Link>
            </li>
            {/* <li><FaPhoneAlt /> +91 9148950239 </li> */}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
