// src/components/ContactOptions.jsx

import React from 'react';

const SocialLinkOption = ({contacts}) => {
  return (
    <div className="contact-options">
      {contacts.map((item, index) => (
        <div key={index} className="contact-card">
          <div className="icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p className="description">{item.description}</p>
          <a
            href={item.buttonLink}
            className={`contact-button`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.buttonText}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialLinkOption;
