import React from "react";
import Slider from "react-slick";
import "./DigitalLearning.css";
import hero1 from "../../assets/homeimage.png";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const slides = [
  {
    title: "Get Educated Online From Your Home",
    description:
      "Provides the best contents for learning in an affordable price.",
    image: hero1,
    path: "/courses",
    contactPath: "/contact",
    buttonName: "Enroll Course",
    background: 'background: linear-gradient(to right, #74ebd5, #acb6e5);'
  },
  
  {
    title: "Get Educated Online From Your Home",
    description:
      "Provides the best contents for learning in an affordable price.",
    image: hero1,
    path: "/courses",
    contactPath: "/contact",
    buttonName: "Enroll Course",
    background: 'background: linear-gradient(to right, #74ebd5, #acb6e5);'
  },
  
];

const DigitalLearning = () => {
  const navigate = useNavigate();
  const settings = {
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>    
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slides">
            <div className="content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <div className="buttons">
                <button
                  className="btn primary"
                  onClick={() => navigate(slide.path)}
                >
                  {slide.buttonName}
                </button>
                <button
                  className="btn secondary"
                  onClick={() => navigate(slide.contactPath)}
                >
                  Contact Us
                </button>
              </div>
              <div className="socials">
                <a
                  href="https://www.facebook.com/geneus.solutions"
                  className="facebook-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={30} />
                </a>
                <a
                  href="https://www.instagram.com/geneus.solutions"
                  className="instagram-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={30} />
                </a>
                <a
                  href="https://www.linkedin.com/company/geneus-solutions"
                  className="linkedin-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
            <div className="image-section">
              <img
                src={slide.image}
                alt="Slide Visual"
                className="main-image"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DigitalLearning;
