import { useLocation, useNavigate } from "react-router-dom";
import SignupForm from "../components/Signup/SignupForm";
import { toast } from "react-toastify";
import "./LoginSignUpPage.css";
import { useSignupMutation } from "../features/auth/authApiSlice";
import { useSendOTPMutation } from "../features/verifyAccount/verifyAccountApiSlice";

// import "../components/Signup/Signup.css";

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [signup, { isLoading }] = useSignupMutation();
  const [sendOTP, { isLoading: isSendOtpLoading }] = useSendOTPMutation();

  const handleSignup = async (formData) => {
    try {
      const userData = await signup(formData).unwrap();
      if (userData?.user?.id) {
        const data = await sendOTP({ email: formData?.email }).unwrap();
        if (data.success) {
          navigate("/verify-account", {
            state: {
              email: formData?.email,
              from: { pathname: "/login", prevPathName: from },
            },
          });
        }
      }
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  return (
    <div className="signup-page-signup-container">
      <div>
        <SignupForm
          handleSignup={handleSignup}
          isLoading={isLoading || isSendOtpLoading}
        />
        <div className="login-link">
          Already have an account?{" "}
          <span className="login-link-text" onClick={() => navigate("/login") } tabIndex={0} role="button" style={{cursor: 'pointer'}}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
