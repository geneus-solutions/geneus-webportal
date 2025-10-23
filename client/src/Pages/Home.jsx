import React from "react";
import AboutUs from "../components/HomeComponents/AboutUs";
import DigitalLearning from "../components/HomeComponents/DigitalLearning";
import PopularCourses from "../components/HomeComponents/PopularCourse/PopularCourses";
import MentorCourse from "../components/HomeComponents/MentorCourse";
import OurServices from "./OurServices2";
import CoreOffering from "../components/HomeComponents/CoreOffering";
import Testimonials from "../components/HomeComponents/Testimonials";
import StartJourney from "../components/HomeComponents/StartJourney";
const Home = () => {

  return (
    <div>

      {/* New component */}
      <DigitalLearning/>

      <AboutUs />


      {/* <PopularCourse /> */}
      <PopularCourses/>
      <MentorCourse/>
      <CoreOffering/>
      <OurServices/>

      <Testimonials/>
      <StartJourney/>
      {/* <Heilight /> */}
    </div>
  );
};

export default Home;
