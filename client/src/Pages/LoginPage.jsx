import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

import LoginForm from "../components/Login/LoginForm";

import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useSendOTPMutation } from "../features/verifyAccount/verifyAccountApiSlice";
import { setCredentials } from "../features/auth/authSlice";

import { toast } from "react-toastify";

import "./LoginSignUpPage.css";

const LoginPage = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const from = location.state?.from?.pathname ||  "/";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isAccountVerified, setIsAccountVerified] = useState(false);


    const [login, { isLoading }] = useLoginMutation();
    const [sendOTP,{isLoading:isSendOtpLoading}] = useSendOTPMutation();

    const handleSendOTP = async() => {
        try {
        const data = await sendOTP({email:formData?.email}).unwrap();
        
        if(data.success){
            navigate('/verify-account', {state: { email:formData?.email,from:{pathname:'/login',prevPathName:from} } });
        }
        } catch (error) {

            toast.error(error?.data?.message);
        }
    }

    const handleLogin = async(formData) => {
        try {

            const userData = await login(formData).unwrap();
            if (userData?.user?.id) { 
                dispatch(setCredentials({ ...userData }));
                navigate(from === '/login' ? location.state?.from?.prevPathName : from, { replace: true }); 
            }
            
        } catch (error) {
            if(error?.status === 401 && error?.data?.error === "Please verify your account"){
                setIsAccountVerified(true);
            }else{
                toast.error(error?.data?.error);
            }
        }
    }

    return (
        <div className="login-page-signup-container">
            <div>
                <LoginForm 
                    formData={formData}
                    setFormData={setFormData}
                    handleLogin={handleLogin} 
                    isLoading={isLoading}
                />

                <div className="login-link">
                    Don't have an ACCOUNT?{" "}
                    <span className="login-link-text" onClick={()=>{navigate('/signup')}} tabIndex={0} role="button" style={{cursor: 'pointer'}}>
                        Signup
                    </span>
                </div>
                {isAccountVerified && (
                    <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <p>
                        Account not verified?{" "}
                        </p>
                        <button
                            type="button"
                            style={{color:'#1f678ba5',background:'none',border:'1px solid #1f678ba5',cursor:'pointer'}}
                            onClick={ handleSendOTP }
                            disabled={isSendOtpLoading}
                        >
                            {isSendOtpLoading ? 'please wait...' :'Verify Account'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage;