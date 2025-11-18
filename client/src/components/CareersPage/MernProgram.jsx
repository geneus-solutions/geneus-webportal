import React from "react";
import { useNavigate } from "react-router-dom";

export default function MernProgram() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/mern-program");
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      
      <img
        src={require("../../assets/training poster.png")}
        alt="MERN Program Promo"
        className="w-full max-w-xl rounded-xl shadow-md"
      />

      <button
        onClick={handleRegisterClick}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all"
      >
        Register Now
      </button>
    </div>
  );
}
