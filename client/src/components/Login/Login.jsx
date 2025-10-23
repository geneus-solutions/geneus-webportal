import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import "./Login.css";
import { toast } from "react-toastify";
import VerifyAccount from "../../Pages/verifyAccount";
import { useSendOTPMutation } from "../../features/verifyAccount/verifyAccountApiSlice";

function Login({isLoginDialogOpen, setIsLoginDialogOpen, toggleComponent, course }) {
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname ||  "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isAccountNotVerified, setIsAccountNotVerified] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const [sendOTP/*,{isLoading:isSendOtpLoading}*/] = useSendOTPMutation();

  useEffect(() => {

    setErrMsg("");

  }, [email, password]);

  const handleVerifyNav = async() => {
    try {

      if (!email || !password) {
        setErrMsg("all fields are required");
        return;
      }

      const userData = await login({ email, password }).unwrap();

      if (userData?.user?.id) { 
        console.log('All things are good')
        dispatch(setCredentials({ ...userData }));
        navigate("/course-details", { state: { courses:[course] } } );
      }

    } catch (error) {
      toast.error(error?.data?.error);
    }
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        setErrMsg("all fields are required");
        return;
      }

      const userData = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...userData }));
      setEmail("");
      setPassword("");
      if (isLoginDialogOpen) { 
        setIsLoginDialogOpen(false); 
        navigate("/course-details", { state: { courses:[course] } } );
      }else { 
        navigate(from, { replace: true }); 
      }
    } catch (error) {
      if(error?.status === 401 && error?.data?.error === "Please verify your account"){
        setIsAccountNotVerified(true);
        await sendOTP({email:email}).unwrap();
      }else{
        toast.error(error?.data?.error);
      }
    }
  };

  return (
    <div className="login-form-wrapper">
      {(!isAccountNotVerified) && (
        <div className="login-form-inner">
          <h2 className="form-title">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            {errMsg && <p className="err-msg">{errMsg}</p>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-link" style={{ marginBottom: "10px" }}>
              <Link to="/forgot-password">Forgot Password ?</Link>
            </div>
            <button type="submit" className="login-button">
              {(isLoading) ? "Please Wait" : "Login"}
            </button>
            <div className="login-link">
              Don't have an account?{' '}
              <span className="login-link-text" onClick={toggleComponent} tabIndex={0} role="button" style={{cursor: 'pointer'}}>
                Signup
              </span>
            </div>
          </form>
        </div>
      )}
      {(isAccountNotVerified && email) && <VerifyAccount email={email} handleVerifyNav={handleVerifyNav} />}
    </div>
  );
}

export default Login;
