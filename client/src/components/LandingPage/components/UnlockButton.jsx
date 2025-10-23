import React, { useState } from "react";
// import "./UnlockButton.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import LoginSignUpPage from "../../../Pages/LoginSignUpPage";
import { useNavigate } from "react-router-dom";

const UnlockButton = ({ course }) => {
  const user = useSelector(selectCurrentUser);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
      navigate("/course-details", {
        state: { 
          courses: [course]
      }});
    } else {
      setIsLoginDialogOpen(true);
    }
  };

  return (
    <>
       <div className="price-section">
            <span className="original-price">{course?.price}</span>
            <span className="discounted-price">Rs.{course?.discount_price}/- only</span>
          </div>
          <button className="enroll-btn" onClick={handleButtonClick}>🚀 Enroll Now - {course?.discount_price}</button>
          <p className="no-exp">No prior experience needed</p>
      {isLoginDialogOpen && (
        <LoginSignUpPage
          isLoginDialogOpen={isLoginDialogOpen}
          setIsLoginDialogOpen={setIsLoginDialogOpen}
          course={course}
        />
      )}
    </>
  );
};

export default UnlockButton;
