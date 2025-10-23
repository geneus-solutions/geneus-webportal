import React from "react";
import { useNavigate } from "react-router-dom";

const TrialExpiredPopup = ({ onClose }) => {
    const navigate = useNavigate();
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button onClick={onClose} style={styles.closeButton}>×</button>
        <h2 style={styles.title}>Trial Expired</h2>
        <p style={styles.message}>
          Your 3-day free trial has expired. <br />
          Subscribe to Premium for more services.
        </p>
        <button style={styles.button} onClick={()=>navigate('/subscribe-to-NutriApp')}>
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  popup: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "30px 20px",
    borderRadius: "12px",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "30px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#888",
  },
  title: {
    marginBottom: "10px",
    fontSize: "24px",
    color: "#a435f0",
  },
  message: {
    marginBottom: "20px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#a435f0",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default TrialExpiredPopup;
