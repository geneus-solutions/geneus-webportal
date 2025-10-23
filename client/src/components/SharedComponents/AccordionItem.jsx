import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
// import "./accordion.css";
import acordionStyles from "../../styles/AccordionItem.module.css"; // Adjust the path as necessary

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={acordionStyles["accordion-item"]}>
      <div className={acordionStyles["accordion-header"]} onClick={() => setIsOpen(!isOpen)}>
        <h4 className={acordionStyles["accordion-title"]}>{title}</h4>
        <div className={acordionStyles["accordion-icon"]}>
          {isOpen ? <FaMinus /> : <FaPlus />}
        </div>
      </div>
      {isOpen && <div className={acordionStyles["accordion-content"]}>{content}</div>}
    </div>
  );
};

export default AccordionItem;
