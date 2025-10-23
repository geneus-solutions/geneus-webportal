import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import img1 from "../../assets/crousel_01.jpg";
import img2 from "../../assets/crousel_02.jpg";
import img3 from "../../assets/crousel_03.jpg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  marginBottom: -200,

}));

const SlideContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "70%",
  transition: "transform 0.5s ease-in-out",
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)", // Vertically center the button
  color: "#fff",
  width: "50px", // Set width to make it square
  height: "50px", // Set height to make it square
  borderWidth: "2px",
  borderColor: "white",
  borderStyle: "solid", // Ensure the border is solid and visible
  borderRadius: "8px", // Optional: Add rounded corners for a softer look
  display: "flex", // Center icon inside the button
  justifyContent: "center", // Align icon horizontally
  alignItems: "center", // Align icon vertically

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Hover effect
  },
}));

const Gradient = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(43, 44, 46, 0.68)",
});

 const carouselData = [
    {
      title: "Get educated online from your home",
      subtitle: "Best Online Course",
      description:
        " Provides the best contents for learning in an affordable price. ",
      image: img1,
      buttonName: "signup",
      path: "/signup",
    },
    {
      title: "Learn at your own pace",
      subtitle: "Flexible Learning",
      description:
        "Discover thousands of courses from expert instructors worldwide",
      image: img2,
      buttonName: "course",
      path: "/courses",
    },
    {
      title: "Advance your career",
      subtitle: "Professional Development",
      description:
        "Gain new skills and certifications to boost your career prospects",
      image: img3,
      buttonName: "nutri app",
      path: "/nutri-app",
    },
  ];

const Carousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const user = useSelector(selectCurrentUser);

 

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselData.length - 1 : prev - 1
    );
  };

  return (
    <CarouselContainer>
      {carouselData.map((slide, index) => (
        <SlideContainer
          key={index}
          sx={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
          }}
        >
          <Box
            component="img"
            src={slide.image}
            alt={slide.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Gradient />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: 6,
              color: "white",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "primary.light", mb: 1, fontSize: "2.25rem", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)" }}
            >
              {slide.subtitle}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 2,
                maxWidth: "800px",
                fontSize: { xs: "2.5rem", md: "3.75rem" },
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)"
              }}
            >
              {slide.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ maxWidth: "600px", mb: 4, fontSize: "1.35rem", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}
            >
              {slide.description}
            </Typography>
            {!user && (
              <Button
                variant="contained"
                color="info"
                size="large"
                onClick={() => navigate(slide.path)}
                sx={{
                  width: "fit-content",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)"
                }}
              >
                {slide.buttonName}
              </Button>
            )}
          </Box>
        </SlideContainer>
      ))}

      <NavButton
        onClick={prevSlide}
        sx={{ right: 16, top: "30%" }} // Adjust '30%' to position it vertically
        aria-label="Previous slide"
      >
        <ArrowBack />
      </NavButton>
      <NavButton
        onClick={nextSlide}
        sx={{ right: 16, top: "40%" }} // Adjust '70%' to position it vertically
        aria-label="Next slide"
      >
        <ArrowForward />
      </NavButton>
    </CarouselContainer>
  );
};

export default Carousel;
