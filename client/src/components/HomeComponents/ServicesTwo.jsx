import React, { useState } from "react";
import "./ServicesTwo.css";
import Course from "../../assets/Home_Course1.png";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    image: Course,
    title: "Web Development",
    link: "/courses",
    description:
      "Step into the world of web development with our dynamic, expert-guided courses! Whether you're a complete beginner or looking to take your skills to the next level, we’ve got you covered. Learn the cutting-edge technologies that power the web and gain hands-on experience creating high-performing websites and apps. Ready to turn your web development passion into a thriving career? Let’s bring your ideas to life—join our courses and start coding your future today!",
  },
];

const OurServices = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleDescription = (id) => {
    if (expanded === id) {
      setExpanded(null); // Close if already expanded
    } else {
      setExpanded(id); // Open the clicked service
    }
  };

  return (
    <section className="our-services">
      <div className="services-header">
        <h2 className="our-services-heading">Our Services</h2>
        <p className="intro">
          At <b>Geneus Solutions</b>, we’re all about helping you level up in
          the digital age. Whether you’re ready to dive into the world of web
          development, we\'ve
          got the perfect tools to get you there. Our expert-led web development
          courses equip you with the skills to build dynamic, real-world
          applications. With us, you\'re not just learning; you\'re
          unlocking the skills and knowledge to thrive, innovate, and feel your
          best. Let’s build your future, one course at a time!
        </p>
      </div>

      <div className="our-services-grid">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-card ${expanded === service.id ? "expanded-card" : ""}`}
          >
            <Link to={service.link} className="service-title">
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
              <h3 className="service-title">{service.title}</h3>
            </Link>
            <p className="service-description">
              {service.description}
              {/* {expanded === service.id
                ? service.description
                : `${service.description.substring(0, 250)}...`} */}
            </p>

            <button
              className="learn-more"
              onClick={() => toggleDescription(service.id)}
            >
              Explore 
              {/* {expanded === service.id ? "Read Less" : "Learn More"} */}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
