import React, { useRef, useState, useEffect } from "react";
import '../../styles/OTP.css';

const OTP = ({ callFunctionHandler,sendOTP,isLoading,isVerifyLoading }) => {
  const inputs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(null); // 2 minutes (120 seconds)
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleKeyDown = (e, index) => {
    if (!/^[0-9]{1}$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
      e.preventDefault();
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      if (index > 0 && !inputs.current[index].value) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]{1}$/.test(value)) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").trim();
    if (!/^\d{4}$/.test(text)) return;

    text.split("").forEach((char, i) => {
      if (inputs.current[i]) inputs.current[i].value = char;
    });
    inputs.current[text.length - 1].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = inputs.current.map((input) => input.value).join("");
    callFunctionHandler(e, otp);
  };

  const handleResend = async() => {
    console.log('Resending OTP...');
    await sendOTP();
    setTimeLeft(120); // Reset timer to 2 minutes
    setCanResend(false);

    // Call resend OTP function here if needed
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h1>Verify Your E-mail</h1>
        <p>Enter the 6-digit verification code sent to your E-mail.</p>
        <form onSubmit={handleSubmit} className="otp-form" onPaste={handlePaste}>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            {Array(6).fill("").map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                ref={(el) => (inputs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button type="submit" disabled={isLoading || isVerifyLoading} className="otp-submit">
            {/* {'Verify'} */}
            {isLoading ? 'resending otp' : isVerifyLoading ? 'verifying otp' : 'Verify'}
          </button>
        </form>

        <p className="otp-resend">
          Didn’t receive a code?{" "}
          {canResend&&!isLoading ? (
            <button className="otp-link-resend" onClick={handleResend}>
                Resend
            </button>
            
          )
            : 
           (
             <span style={{ color: "#888" }}>
               Resend in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
             </span>
           )}
        </p>
      </div>
    </div>
  );
};

export default OTP;
