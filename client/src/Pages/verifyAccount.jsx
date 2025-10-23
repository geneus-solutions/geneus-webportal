import { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import OTP from "../components/OTP/OTP";
import { useSendOTPMutation } from "../features/verifyAccount/verifyAccountApiSlice";
import { useVerifyAccountMutation } from "../features/auth/authApiSlice";

import { toast } from "react-toastify";

const VerifyAccount = ({email,handleVerifyNav = null}) => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname ||  "/";

    const [sendOTP,{isLoading}] = useSendOTPMutation();
    const [verifyAccount,{isLoading:isVerifyLoading}] = useVerifyAccountMutation();

    console.log('from : ',from)
    console.log('location.state : ',location.state)

    useEffect(() => {
        if (!location?.state?.email && !email) {
            console.log('no email found')
            navigate(-1); // Go back to the previous path
        }
    }, [location,navigate,email])

    // console.log('sendOTP : ',sendOTP)
    

    const handleSendOTP = async() => {
        // console.log('email : ',location?.state?.email || email)
        try {
            // console.log('send otp to : ',location?.state?.email || email)
            const data = await sendOTP({
                email:location?.state?.email ? location.state.email : email
            }).unwrap();
            if(data.success){
                toast.success('OTP sent successfully')
            }
            
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error(error?.data?.error)
        }
    }

    const handleVerifyAccount = async(e,otp) => {
        try {

            e.preventDefault();
            
            // console.log('vrify otp : ',otp)
            const data = await verifyAccount({
                email:location?.state?.email ? location.state.email : email,
                otp
            }).unwrap(); 
            // console.log('data : ',data)
            if(data?.success){
                toast.success('Your account have been verified successfully')
                // console.log('from success : ',from)
                handleVerifyNav ? handleVerifyNav() : navigate(from,{ replace: true , state: {from:{pathname:'/login',prevPathName:location.state?.from?.prevPathName} } })
            }
            
        } catch (error) {
            console.log('error : ',error)
            toast.error(error?.data?.message)
        }
    }

    return(
        <div className="verify-account-modal">
            <OTP callFunctionHandler={handleVerifyAccount} sendOTP={handleSendOTP} isVerifyLoading={isVerifyLoading} isLoading={isLoading} />
        </div>
    )
}

export default VerifyAccount;