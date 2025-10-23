// ChatBot.js
import React, { useEffect, useRef, useState } from "react";
import "../../styles/ChatBot.css";

// data.js
const qaData = [
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
const ChatBot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: `Hi! Please select a the query below:` },
  ]);

  const handleQuestionClick = (question, answer) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text: question },
      { type: "bot", text: answer },
    ]);
  };

  const [userInput, setUserInput] = useState("");

  const handleUserSubmit = () => {
    if (!userInput.trim()) return;

    const newMessages = [
      ...messages,
      { type: "user", text: userInput },
      {
        type: "bot",
        text: (
          <span>
            I'm not sure about that. Please{" "}
            <a
              href="/contact"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              contact us
            </a>{" "}
            for more help.
          </span>
        ),
      },
    ];

    setMessages(newMessages);
    setUserInput(""); // Clear input
  };

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.type === "bot" ? "bot" : "user"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="question-list">
        {qaData.map((item, index) => (
          <button
            key={index}
            className="question-button"
            onClick={() => handleQuestionClick(item.question, item.answer)}
          >
            {item.question}
          </button>
        ))}
      </div>
      <div className="user-input">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            handleUserSubmit(); // Your existing function to send the message
          }}
          className="user-input"
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
