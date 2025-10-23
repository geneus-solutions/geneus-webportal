import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../../../styles/AdminDashboardLayout.css"; // Import the CSS
import AdminSideBar from "../../../components/admin/AdminSideBar";

const AdminDashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="layout">
      {/* Sidebar */}
      <AdminSideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <div className={`main-content ${isCollapsed ? "expanded" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
