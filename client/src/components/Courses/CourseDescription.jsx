import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './CourseDescription.css';
import { useAddToCartMutation } from "../../features/Cart/cartApiSlice";
import reactStringReplace from "react-string-replace";
import LearningPoints from "./LearningPoints";
// import CourseContent from "./CourseContent";
import CourseOtherDetails from "./CourseOtherDetails";
import Description from "./Description";
// import CourseSection from "./CourseSection";
import InstructorCard from "./InstructorCard";
import DescriptionCourseCard from "./DescriptionCourseCard";

import CourseContent from "./CourseContent";
import CourseNotes from "./CourseNotes";

const CourseDescription = ({ courseDetails }) => {

  const [discount, setDiscount] = useState(0);
  // const [len, setLen] = useState(0);

  const [formattedCourseIntro, setFormattedCourseIntro] = useState("");
  const [formattedCourseIntro2, setFormattedCourseIntro2] = useState("");
  const [formattedAboutCourse, setFormattedAboutCourse] = useState([]);
  const [formattedWhyCourse, setFormattedWhyCourse] = useState([]);

  const [addToCart] = useAddToCartMutation();
  // state for fetching all course contents
  const [courseContents, setcourseContents] = useState([]);

  // const [ip, setIp] = useState("");
  // const [city, setCity] = useState("");
  // const [error, setError] = useState("");

  //Unnassasaary code:-
  useEffect(() => {
    const fetchVisitorData = async () => {
      const visitorDataFetched = sessionStorage.getItem("visitorDataFetched");

      if (!visitorDataFetched) {
        try {
          const response = await fetch("http://ip-api.com/json/");
          const data = await response.json();
          if (data?.status === "success") {
            // setIp(data?.query); // IP address
            // setCity(data?.city); // City
            await saveVisitorData(data?.query, data?.city);
            sessionStorage.setItem("visitorDataFetched", "true");
          } 
          // else {
          //   setError("Unable to fetch location data");
          // }
        } catch (err) {
          // setError("Error fetching data");
          console.error(err);
        }
      }
    };

    const saveVisitorData = async (ip, city) => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/visitors`,
          { ip, city },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (err) {
        console.error("Error saving visitor data:", err);
      }
    };

    //Unnassasaary code:-

    fetchVisitorData();
  }, []);

  // fetching all course contents
  useEffect(() => {
    const fetchCourseContents = async () => {
      setcourseContents(courseDetails?.courseContent);
    };
    fetchCourseContents();
  }, [courseDetails?.courseContent]);


  useEffect(() => {
    const calculateDiscount = () => {
      const p = courseDetails?.price;
      const dp = courseDetails?.discount_price;
      setDiscount(Number(((p - dp) / p) * 100));
    };

    // const calculateLength = () => {
    //   const length = courseDetails?.learnings?.length;
    //   // let halfLen = Math.ceil(length / 2);
    //   // setLen(halfLen);
    // };

    if (courseDetails) {
      calculateDiscount();
      // calculateLength();
    }
  }, [courseDetails]);

  useEffect(() => {
    const formatText = (text) => {
      const formattedText = reactStringReplace(
        text,
        /\*\*(.*?)\*\*/g,
        (match, i) => (
          <span key={i} className="bold">
            {match}
          </span>
        )
      );
      return formattedText;
    };

    if (courseDetails) {
      setFormattedCourseIntro(formatText(courseDetails?.aboutCourse?.intro));
      setFormattedCourseIntro2(formatText(courseDetails?.whythisCourse?.intro));
      setFormattedAboutCourse(
        courseDetails?.aboutCourse?.details?.map((detail) => formatText(detail))
      );
      setFormattedWhyCourse(
        courseDetails?.whythisCourse?.details?.map((detail) =>
          formatText(detail)
        )
      );
    }
  }, [courseDetails]);


  const handleAddToCart = async () => {
    try {

      if(!courseDetails) {
        toast.error("Course details not available.");
        return;
      }

      const ans = await addToCart({
        courseId: courseDetails._id,
      }).unwrap();

      toast.info(ans?.message);

    } catch (error) {
      toast.error(error?.data?.message || "Failed to add course to cart");
    }
  };

  // console.log("thsi ss coure Details", courseDetails);
  return (
    <div style={{padding: '100px'}}>
      <DescriptionCourseCard
        courseDetails={courseDetails}
        discount={discount}
        handleAddToCart={handleAddToCart}
      />

      {/* What you will Learn */}
      <LearningPoints
        title="What you will learn?"
        points={courseDetails?.learnings}
      />

      {/* Course Content */}
      {courseContents?.length > 0 && (
        <CourseContent content={courseContents} />
      )}

      {/* Course Notes */}
      <CourseNotes />

      {/* Course Requirements */}
      <CourseOtherDetails
        title="Prerequisite"
        requirements={courseDetails?.requirements}
      />

      {/* Course Description */}
      <Description
        courseIntro={formattedCourseIntro}
        aboutCourse={formattedAboutCourse}
        whyCourseTitle={courseDetails?.whythisCourse?.title}
        whyCourseIntro={formattedCourseIntro2}
        whyCourseDetails={formattedWhyCourse}
      />

      {/* Who this course is for */}
      <CourseOtherDetails
        title="Who this course is for"
        requirements={courseDetails?.whoitsfor}
      />

      {/* Display mentor image */}
      <InstructorCard mentorImage={courseDetails} />

      {/* Ending section */}
      {/* <CourseSection title={formattedCourseOutro} /> */}
    </div>
  );
};

export default CourseDescription;
