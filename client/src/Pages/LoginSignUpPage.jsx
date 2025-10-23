import React, { useState, useEffect } from "react";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import "./LoginSignUpPage.css";

const LoginSignUpPage = ({
  isLoginDialogOpen,
  setIsLoginDialogOpen,
  course,
}) => {
  const [showLogin, setShowLogin] = useState(!isLoginDialogOpen);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isLoginDialogOpen) {
      document.body.classList.add("no-scroll-auth-modal");
    } else {
      document.body.classList.remove("no-scroll-auth-modal");
    }
    return () => {
      document.body.classList.remove("no-scroll-auth-modal");
    };
  }, [isLoginDialogOpen]);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className={"auth-modal-overlay"}>
      <div className="auth-modal-container">
        {isLoginDialogOpen && (
          <button
            className="auth-modal-close-btn"
            onClick={() => setIsLoginDialogOpen(!isLoginDialogOpen)}
            aria-label="Close login/signup dialog"
          >
            &times;
          </button>
        )}
        <div className="auth-modal-form-wrapper">
          {showLogin ? (
            <Login
              toggleComponent={toggleComponent}
              isLoginDialogOpen={isLoginDialogOpen}
              setIsLoginDialogOpen={setIsLoginDialogOpen}
              course={course}
            />
          ) : (
            <Signup
              toggleComponent={toggleComponent}
              isLoginDialogOpen={isLoginDialogOpen}
              setIsLoginDialogOpen={setIsLoginDialogOpen}
              course={course}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUpPage;
