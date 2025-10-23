import React from "react";
import "./OurServices2.css";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Web Development Course",
    icon: "💻",
    description:
      "Master the skills of modern web development with our comprehensive course, designed for beginners and professionals alike.",
    points: [
      "Full-Stack Curriculum",
      "Project-Based Learning",
      "Mentor Support",
      "24/7 Support",
      "Certificate after Completion",
    ],
    path: '/courses'
  },
  {
    title: "Nutrition App",
    icon: "🥗",
    description:
      "Track your diet and stay healthy with our smart nutrition app, offering meal plans and personalized insights.",
    points: [
      "Custom Diet Plans",
      "Nutrient Tracking",
      "Healthy Recipe Library",
    ],
    path: '/nutri-app'
  },
];

const OurServices = () => {
  return (
    <div className="services-container">
      <h1>Your Satisfaction Our Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <>
            <div
              key={index}
              className={`service-card ${
                service.title === "Web Development Course" || "Nutrition App"
                  ? "highlight"
                  : ""
              }`}
            >
              <div>
                <div className="icon">{service.icon}</div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>

                <ul>
                  {service.points.map((point, idx) => (
                    <li key={idx}>✅ {point}</li>
                  ))}
                </ul>
              </div>
              <div className="service-point">
                <Link to={service.path}>
                <button className="learn-more">Learn More</button>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
