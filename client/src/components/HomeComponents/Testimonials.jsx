import { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

import "../../styles/TestimonialsCustom.css";
import TestimonialCard from "./TestimonialCard";

/* .testimonial-slider */

const testimonialCardData = [
  {
    id: 1,
    description: "A fantastic resource for beginners—starting with the basics and building up to advanced concepts. Clear explanations and practical examples make learning both easy and effective.",
    name: "Ayush Raj",
    role: "Fresher",
  },
  {
    id: 2,
    description: "This course has been a game-changer with its clear explanations and hands-on projects that make concepts easy to understand and apply.",
    name: "Sumeet Bafana",
    role: "Student",
  },
  {
    id: 3,
    description: "I started as a complete beginner, and now I’m working confidently on real-world projects. This platform is excellent for anyone who wants to become web developer.",
    name: "Rahul Gupta",
    role: "Web Developer",
  },
  {
    id: 4,
    description: "Turned my learning into real-world skills. From zero to deploying my first web app Geneus Solutions made it possible. The hands-on approach and structured learning really helped me as a student developer.",
    name: "Deepesh",
    role: "Student",
  },
]

const Testimonials = () => {
  
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 360;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }

  };

  return (
    <div className="testimonial-slider-container-custom">
      {/* Left Content Section */}
      <div className="testimonial-slider-content-section-custom">
        <h4 className="testimonial-slider-small-title-custom">----Testimonials from who used this</h4>
        <h1 className="testimonial-slider-main-title-custom">See what our lovely students say about this!</h1>
        <p className="testimonial-slider-description-custom">
          Find a tutor is like finding a piece of missing heart, so find it carefully and invest your time wisely!
        </p>
      </div>
      <div className="testimonial-slide-buttons-custom">
        <button className="testimonial-slide-button-custom" onClick={() => scroll("left")}> 
          <FaArrowLeftLong size={20}/>
        </button>
        <button className="testimonial-slide-button-custom" onClick={() => scroll("right")}> 
          <FaArrowRightLong size={20}/>
        </button>
      </div>

      {/* Testimonial Cards Section */}
      <div className="testimonial-slider-testimonial-cards-custom" ref={sliderRef}>
        {testimonialCardData.map((testimonial) => (
          <div key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {/* Slider Buttons */}
    </div>
  );
};

export default Testimonials;