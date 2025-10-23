import React from "react";
import "../../../styles/PricingSection.css";
import UnlockButton from "../components/UnlockButton";

const PricingSection = ({course}) => {
  return (
    <section className="pricing-section">
      <h2 className="pricing-title">Ready to Transform Your Career?</h2>
      <p className="pricing-subtitle">
        Join thousands of students who have already transformed their lives with our course.
      </p>
      <UnlockButton course={course}/>
    </section>
  );
};

export default PricingSection;
