import React, { useState } from "react";
import {
  FaUsers,
  FaBookOpen,
  FaPlusSquare,
  // FaCartPlus,
  FaUser,
  // FaCog,
  FaSignOutAlt,
  FaAppleAlt,
  FaUserFriends,
} from "react-icons/fa";
import { SiGooglebigquery } from "react-icons/si";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi"; // Unique Icons
import logo from "../../assets/logo.png"; // Import your image
import "../../styles/SidebarDemo.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { apiSlice } from "../../app/api/apiSlice";
import { AiOutlineStock } from "react-icons/ai";

const AdminSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation(); // Get current route
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      dispatch(apiSlice.util.resetApiState());
      navigate("/");
    } catch (error) {
      console.log("Logout Error", error);
    }
  };

  return (
    <div className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button
        className="toggle-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? <BiChevronsRight /> : <BiChevronsLeft />}
      </button>

      {/* Top Menu Items */}
      <ul className="admin-sidebar-menu">
        <li className="admin-sidebar-home">
          <Link to="/">
            <img src={logo} alt="Home" className="admin-sidebar-logo" />
          </Link>
        </li>
        <Link
          to="visitor-data"
          className={`admin-sidebar-link ${
            location.pathname === "/admin-dashboard/visitor-data"
              ? "active"
              : ""
          }`}
        >
          <li className="admin-sidebar-item">
            <FaUsers />
            {!isCollapsed && <span>All Visitors</span>}
          </li>
        </Link>
        <Link
          to="all-users"
          className={`admin-sidebar-link ${
            location.pathname === "/admin-dashboard/all-users"
              ? "active"
              : ""
          }`}
        >
          <li className="admin-sidebar-item">
            <FaUserFriends />
            {!isCollapsed && <span>All Users</span>}
          </li>
        </Link>
        <Link
          to="all-courses"
          className={`admin-sidebar-link ${
            location.pathname === "/admin-dashboard/all-courses" ? "active" : ""
          }`}
        >
          <li className="admin-sidebar-item">
            <FaBookOpen />
            {!isCollapsed && <span>All Courses</span>}
          </li>
        </Link>
        <Link
          to="add-course"
          className={`admin-sidebar-link ${
            location.pathname === "/admin-dashboard/add-course" ? "active" : ""
          }`}
        >
          <li className="admin-sidebar-item">
            <FaPlusSquare />
            {!isCollapsed && <span>Add Course</span>}
          </li>
        </Link>
        <Link
          to="add-product"
          className={`admin-sidebar-link ${
            location.pathname === "/admin-dashboard/add-product" ? "active" : ""
          }`}
        >
          <li className="admin-sidebar-item">
            <FaAppleAlt />
            {!isCollapsed && <span>Add Product</span>}
          </li>
        </Link>
        <Link
          to="all-enquiry"
          className={`admin-sidebar-link ${
            location.pathname === "/admin-dashboard/all-enquiry" ? "active" : ""
          }`}
        >
          <li className="admin-sidebar-item">
            <SiGooglebigquery />
            {!isCollapsed && <span>Enquiry's</span>}
          </li>
        </Link>
         <Link
          to="finance-porfolio"
          className={`admin-sidebar-link ${
            location.pathname === "/admin-dashboard/finance-porfolio" ? "active" : ""
          }`}
        >
          <li className="admin-sidebar-item">
            <AiOutlineStock />
            {!isCollapsed && <span>Stocks & Finance</span>}
          </li>
        </Link>
      </ul>

      {/* Bottom Menu Items */}
      <ul className="admin-sidebar-bottom">
        <Link to="profile" className="admin-sidebar-link">
          <li className="admin-sidebar-item">
            <FaUser />
            {!isCollapsed && <span>Profile</span>}
          </li>
        </Link>
        <li className="admin-sidebar-item" onClick={handleLogout}>
          <FaSignOutAlt />
          {!isCollapsed && <span>Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
