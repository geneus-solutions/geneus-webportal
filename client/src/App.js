import React,{useCallback,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "./features/auth/authApiSlice";

import RequireAuth from "./RequireAuth/RequireAuth";

//Pages
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Courses from "./Pages/Courses";

import CourseDescriptionPage from "./Pages/CourseDescritptionPage";
// import LoginSignUpPage from "./Pages/LoginSignUpPage";
import PageNotFound from "./Pages/PageNotFound";

// import Mylearning from "./components/MyLearning/MyLearning";
import ForgotPasswordPage from "./components/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "./components/ResetPassword/ResetPassword";
import { logOut } from "./features/auth/authSlice";

import LandingPage from "./Pages/landingPage/LandingPage";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import UserProfile from "./components/UserProfile/UserProfile";
import LoginPage from "./Pages/LoginPage";
import VerifyAccount from "./Pages/verifyAccount";
import SignupPage from "./Pages/SignupPage";
import useVisitorTracker from "./hooks/useVisitorTracker";
import ContactUs from "./Pages/ContactUs";
import UserProfileLayout from "./Pages/UserProfile/UserProfileLayout";

import QuizPage from "./Pages/quiz-page";

const INACTIVITY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function App() {
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {

      if (!user?.id) return;
      await logout().unwrap();

      dispatch(logOut());
      
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }, [user?.id, dispatch, logout]);

  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      if (!user?.id) return;
      clearTimeout(timeout);
      timeout = setTimeout(handleLogout, INACTIVITY_TIME);
    };

    const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    if (user?.id) {
      resetTimer();
    }

    return () => {
      clearTimeout(timeout);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [handleLogout, user?.id]);

  useVisitorTracker();
  return (
    <Router>
      <div>
        <ScrollToTop/>
      <PrivacyPolicy/>

      <Routes>
        {/* <Route path="/login" element={<LoginSignUpPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="verify-account" element={<VerifyAccount />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
          <Route path="/landing/:id" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage/>}/>
          <Route element={<RequireAuth allowedRole={["user", "admin"]} />}>
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/profile" element={<UserProfileLayout />}>
              <Route index element={<UserProfile />} /> {/* Default route */}
            </Route>
          
          </Route>

          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDescriptionPage />} />
        </Route>


        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
