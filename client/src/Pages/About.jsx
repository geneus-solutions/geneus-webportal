import React from "react";
// import img1 from "../assets/banner.jpeg";
// import nutriImage from '../assets/nutriImage.jpg';
// import courseImage from '../assets/courses.jpg';
// import img2 from "../assets/why choose us.png";
import "./About.css";
import AboutUs from "../components/HomeComponents/AboutUs";
// import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
// import SettingsIcon from "@mui/icons-material/Settings";
import { FaBalanceScale, FaBullseye, FaEye } from "react-icons/fa";
import CircleCard from "../components/About/CircleCard";
import AboutUsFirst from "../components/About/AboutUsFirst";
import OurServices from "./OurServices2";
import WhyChooseUs from "../components/HomeComponents/WhyChooseUs";
import Testimonials from "../components/HomeComponents/Testimonials";
import StartJourney from "../components/HomeComponents/StartJourney";
const About = () => {
  const cards = [
    {
      icon: <FaBullseye />,
      title: "Mission",
      description:
        " Our mission is to empower individuals worldwide by delivering exceptional E-learning experiences in full-stack development. We strive to bridge the gap between aspiring developers and industry demands, fostering a culture of continuous learning, collaboration, and excellence.",
      gradient: "linear-gradient(to right, #ff00ff, #ff80ff)",
    },
    {
      icon: <FaBalanceScale />,
      title: "Value",
      description:
        "We value integrity, innovation, and inclusivity. Our commitment is to deliver high-quality, accessible E-learning experiences that empower learners to build confidence and competence in full-stack development. We prioritize collaboration, adaptability, and a growth mindset to meet evolving industry needs.",
      gradient: "linear-gradient(to right, #00ff00, #80ff80)",
    },

    {
      icon: <FaEye />,
      title: "Vision",
      description:
        "To be a global leader in providing accessible and high-quality E-learning courses in full-stack development fostering a community of skilled and innovative developers.",
      gradient: "linear-gradient(to right, #ff8000, #ffb380)",
    },
  ];

  // const ServiceCard = styled(Box)(({ theme }) => ({
  //   position: "relative",
  //   width: "300px",
  //   height: "250px",
  //   overflow: "hidden",
  //   borderRadius: theme.shape.borderRadius,
  //   cursor: "pointer",
  //   "&:hover .overlay": {
  //     opacity: 1,
  //   },
  //   "&:hover img": {
  //     transform: "scale(1.1)",
  //   },
  // }));

  // const ServiceImage = styled("img")({
  //   width: "100%",
  //   height: "100%",
  //   objectFit: "cover",
  //   transition: "transform 0.3s ease-in-out",
  // });

  // const Overlay = styled(Box)({
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   backgroundColor: "rgba(0, 0,0 , 0.85)",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   opacity: 0,
  //   transition: "opacity 0.3s ease-in-out",
  //   className: "overlay",
  // });

  // const ServicesContainer = styled(Box)(({ theme }) => ({
  //   display: "flex",
  //   gap: theme.spacing(4),
  //   marginTop: theme.spacing(4),
  //   justifyContent: "center", // Center the service cards
  //   [theme.breakpoints.down("md")]: {
  //     flexDirection: "column",
  //     alignItems: "center",
  //   },
  // }));

  return (
    <>
    {/* <Testimonials/> */}
    <div >
    <AboutUsFirst/>
    
    <AboutUs />
    <OurServices/>
    <WhyChooseUs/>
    <Testimonials/>

      <div className="mission-vision-value">
        <Box sx={{ py: 6, px: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 6,
            }}
            >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              >
              <Typography variant="h4" sx={{ mx: 2, fontWeight: "bold" }}>
                Our Core Values
              </Typography>
            </Box>
          </Box>

          <div
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
            >
            {cards.map((card, index) => (
              <CircleCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              gradient={card.gradient}
              />
            ))}
          </div>

         
        </Box>
      </div>
    <StartJourney/>

    </div>
      </>
  );
}

export default About;
