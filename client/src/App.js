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
import CourseDetails from "./Pages/CourseCheckOutDetails";
import AddProduct from "./Pages/adminPages/addProduct/AddProduct";
import AddCourse from "./Pages/adminPages/addCourse/AddCourse";

import CourseDescriptionPage from "./Pages/CourseDescritptionPage";
// import LoginSignUpPage from "./Pages/LoginSignUpPage";
import PageNotFound from "./Pages/PageNotFound";

// import Mylearning from "./components/MyLearning/MyLearning";
import MyLearning from "./Pages/MyLearning";
import ForgotPasswordPage from "./components/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "./components/ResetPassword/ResetPassword";
import { logOut } from "./features/auth/authSlice";

import LandingPage from "./Pages/landingPage/LandingPage";
import VisitorData from "./Pages/adminPages/visitorData/VisitorData";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import AllCourses from "./Pages/adminPages/AllCourses";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import AdminDashboardLayout from "./Pages/adminPages/admin-dashboard/AdminDashboardLayout";
import UserProfile from "./components/UserProfile/UserProfile";
import CourseCart from "./Pages/CourseCart";
import UsersData from "./Pages/adminPages/userData/UsersData";
import LoginPage from "./Pages/LoginPage";
import VerifyAccount from "./Pages/verifyAccount";
import SignupPage from "./Pages/SignupPage";
import useVisitorTracker from "./hooks/useVisitorTracker";
import ContactUs from "./Pages/ContactUs";
import UserProfileLayout from "./Pages/UserProfile/UserProfileLayout";
import PaymentHistory from "./Pages/UserProfile/PaymentHistory";
import SupportAndQuery from "./Pages/UserProfile/SupportAndQuery";
import UserEnquiry from "./Pages/adminPages/userEnquiry/UserEnquiry";
import StockTable from "./Pages/Finance_Portfolio/FinancePortfolio";
import StockData from "./Pages/Finance_Portfolio/StockData";

import QuizPage from "./Pages/quiz-page";
import AddQuizPage from "./Pages/adminPages/AddQuiz/AddQuizPage";

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
            <Route path="/course-details" element={<CourseDetails />} />
            <Route path="/cart" element={<CourseCart />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/profile" element={<UserProfileLayout />}>
              <Route index element={<UserProfile />} /> {/* Default route */}
              <Route path="payment-history" element={<PaymentHistory />} />
              <Route path="support-query" element={<SupportAndQuery />} />
            </Route>
          
          </Route>

          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDescriptionPage />} />
        </Route>

          {/* Admin-specific routes */}
          <Route element={<RequireAuth allowedRole={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboardLayout/>}>

              {/* Add here your admin specific route */}
              <Route path="visitor-data" element={<VisitorData/>}/>
              <Route path="add-course" element={<AddCourse />} />
              <Route path="add-quiz" element={<AddQuizPage />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="all-courses" element={<AllCourses/>}/>
              <Route path="all-users" element={<UsersData />} />
              <Route path="all-enquiry" element={<UserEnquiry />}/>
              <Route path="finance-porfolio" element={<StockTable />}/>
              <Route path="finance-porfolio/:stockname" element={<StockData />}/>
              <Route path="profile" element={<UserProfileLayout />}>
                <Route index element={<UserProfile />} /> 
                <Route path="payment-history" element={<PaymentHistory />} />
                <Route path="support-query" element={<SupportAndQuery />} />
            </Route>
            </Route>
          </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
