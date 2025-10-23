// import React, { useState } from "react";
import "../../styles/ProgressStepper.css"; // CSS below

const Stepper = ({ steps,currentStep }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={index} className="step-wrapper">
          <div
            className={`step-circle ${
              index < currentStep
                ? "completed"
                : index === currentStep
                ? "active"
                : ""
            }`}
          >
            {index < currentStep ? "✓" : ""}
          </div>
          <div className="step-label">{step}</div>
          {index !== steps.length - 1 && (
            <div
                className={`step-line ${index < currentStep ? 'line-completed' : ''}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
