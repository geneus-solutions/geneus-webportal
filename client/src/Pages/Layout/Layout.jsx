import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./Layout.css"; // Import CSS
import ChatBot from "../../components/ChatBot/ChatBot";

function Layout() {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <Outlet />
      </div>
      <button className="chat-toggle-button" onClick={() => setShowChat(!showChat)}>
        {showChat ? "×" : "💬"}
      </button>

      {/* Conditional ChatBot */}
      {showChat && (<div className="chatbot-overlay">
          <ChatBot />
        </div>)}
      <div className="layout-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
