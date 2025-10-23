import "./LandingPage.css";
import { useSelector } from "react-redux";
import { useCourceQuery } from "../../features/cources/courceApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import RecomendToAttend from "../../components/LandingPage/RecomendToAttend";
import HeroSection from "../../components/LandingPage/NewComponents/HeroSection";
import WhyAttendSection from "../../components/LandingPage/NewComponents/WhyAttendSection";
import Curriculum from "../../components/LandingPage/NewComponents/Curriculum";
import MentorSection from "../../components/LandingPage/NewComponents/MentorSection";
import FaqSection from "../../components/LandingPage/NewComponents/FaqSection";
import PricingSection from "../../components/LandingPage/NewComponents/PricingSection";
import ReadyToGrowSection from "../../components/LandingPage/NewComponents/ReadyToGrowSection";
import Testimonials from "../../components/HomeComponents/Testimonials";
import StartJourney from "../../components/HomeComponents/StartJourney";

const LandingPage = () => {
  // This is constent data for template:-

  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: course } = useCourceQuery(
    { id, user_id: user?.id },
    { skip: !id }
  );
  if (!id) {
    return navigate(-1);
  }

  return (
    <>
      {course?._id ? (
        <div className="main-container">
          <HeroSection course={course}/>
          <ReadyToGrowSection course={course}/>
          <WhyAttendSection course={course}/>
          <RecomendToAttend course={course}/>
          <Curriculum course={course?.courseContent}/>
          <MentorSection/>
          <Testimonials/>
          <FaqSection course={course}/>
          <PricingSection course={course}/>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default LandingPage;
