import { useParams } from "react-router-dom";
import img1 from "../assets/banner.jpeg";
import { useCourceQuery } from "../features/cources/courceApiSlice";
import CourseDescription from "../components/Courses/CourseDescription";
import CourseBanner from "../components/Courses/CourseBanner";
import { useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import FaqSection from "../components/LandingPage/NewComponents/FaqSection";

const CourseDescriptionPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: course, isLoading } = useCourceQuery(
    { id,userId: user?.id },
    { skip: !id }
  );
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CourseBanner
            imgSrc={img1}
            title="A Course You'll Actually Finish"
            course={course}
          />
          <CourseDescription courseDetails={course} />

          <FaqSection/>
        </>
      )}
    </div>
  );
};

export default CourseDescriptionPage;
