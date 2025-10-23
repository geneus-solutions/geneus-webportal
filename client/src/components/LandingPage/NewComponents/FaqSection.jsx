import React, { useState } from "react";
import "../../../styles/FaqSection.css";

const faqData = [
  {
    question: "How long do I have access to the course?",
    answer:
      "You’ll have 2 years of unlimited access to the course from the date of enrollment. This means you can learn at your own pace without any rush.",
  },
  {
    question: "Are the courses live or recorded?",
    answer:
      "All our courses are pre-recorded, so you can watch them anytime, anywhere, and revisit lessons whenever needed.",
  },
  {
    question: "Can I get a refund if I’m not satisfied with the course?",
    answer:
      "Unfortunately, we do not offer refunds. We recommend checking the course details, previewing available content, and ensuring it fits your needs before purchasing.",
  },
  {
    question: "Will I receive a certificate after completing the course?",
    answer:
      "Yes! Once you complete all the required lessons and assessments, you’ll receive a certificate of completion.",
  },
  {
    question: "Do I need any prior knowledge to take the course?",
    answer:
      "No worries! Each course comes with its own prerequisites, which you’ll find in the course description. Some courses are perfect for beginners, while others may need a little background knowledge—but don’t worry, we’ll guide you every step of the way!	",
  },
];

const FaqSection = ({ course }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-heading">FAQ's</h2>
      <p className="faq-subheading">Got questions? We've got answers.</p>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleAnswer(index)}
            >
              <span>{item.question}</span>
              <span className={`arrow ${openIndex === index ? "open" : ""}`}>
                ▾
              </span>
            </button>
            {openIndex === index && <p className="faq-answer">{item.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
