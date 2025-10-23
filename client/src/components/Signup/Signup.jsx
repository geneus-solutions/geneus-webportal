import { useState } from "react";
import "./Signup.css";

import { useLoginMutation, useSignupMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import VerifyAccount from "../../Pages/verifyAccount";
import { useSendOTPMutation } from "../../features/verifyAccount/verifyAccountApiSlice";

function Signup({ toggleComponent, isLoginDialogOpen, setIsLoginDialogOpen, course }) {
  const [openVerifyPage, setOpenVerifyPage] = useState(false);
  const [sendOTP,{isLoading:isSendOtpLoading}] = useSendOTPMutation();
  const [signup, {isLoading: signUpIsLoading}] = useSignupMutation();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname ||  "/";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleVerifyNav = async() => {
    try {
      const userData = await login({ email:formData?.email, password:formData?.password }).unwrap();
      if (userData?.user?.id) { 
        toast.success("Signed up successfully");
        dispatch(setCredentials({ ...userData }));
        navigate("/course-details", { state: { courses:[course] } } );
        setIsLoginDialogOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {user} = await signup(formData).unwrap();
      if (isLoginDialogOpen) { 
        const optResponse = await sendOTP({ email:formData?.email }).unwrap();
        if (optResponse?.success === true) {
          setOpenVerifyPage(true);
        }
        return;
      } if(!isLoginDialogOpen) { 
        navigate(from, { replace: true })}
        return;
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  return (
    <div className="login-form-wrapper">
      {!openVerifyPage && (
        <div className="login-form-inner">
          <h2 className="form-title">Sign Up</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Name"
                name="name"
                value={formData?.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                id="mobile"
                placeholder="Mobile"
                name="mobile"
                value={formData?.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={formData?.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-button">
              {signUpIsLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="login-link">
              Already have an account?{' '}
              <span className="login-link-text" onClick={toggleComponent} tabIndex={0} role="button" style={{cursor: 'pointer'}}>
                Login
              </span>
            </div>
          </form>
        </div>
      )}
      {openVerifyPage && (
        <VerifyAccount email={formData?.email} handleVerifyNav={handleVerifyNav} />
      )}
    </div>
  );
}

export default Signup;


