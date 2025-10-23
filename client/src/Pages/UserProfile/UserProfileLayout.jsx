import React from "react";
import "../../styles/UserProfile.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const UserProfileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamically get the profile base path
  const match = location.pathname.match(/(\/admin-dashboard)?\/profile/);
  const basePath = match ? match[0] : "/profile";

  const isActive = (path) => location.pathname === path;

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <p
          className={isActive(basePath) ? "active-tab" : ""}
          onClick={() => navigate(basePath)}
        >
          My Account
        </p>
        <p
          className={isActive(`${basePath}/payment-history`) ? "active-tab" : ""}
          onClick={() => navigate(`${basePath}/payment-history`)}
        >
          Payment History
        </p>
        <p
          className={isActive(`${basePath}/support-query`) ? "active-tab" : ""}
          onClick={() => navigate(`${basePath}/support-query`)}
        >
          Support and Query
        </p>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default UserProfileLayout;
