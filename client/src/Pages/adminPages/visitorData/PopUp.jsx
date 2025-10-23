import React from "react";
import "./PopUp.css";

const PopUp = ({title, handleYesClick, handleNoClick}) => {
  return (
    <div className="popup-modal">
      <p className="popup-message">{title}</p>
      <div className="popup-options">
        <button className="popup-btn-yes" onClick={()=>handleYesClick()}>Yes</button>
        <button className="popup-btn-no" onClick={()=>handleNoClick()}>No</button>
      </div>
    </div>
  );
};

export default PopUp;
