import React from "react";
import { useMessages } from "react-chatbotify";
import "./OptionMessage.css"; // נוסיף קובץ CSS

const OptionMessage = () => {
  const { injectMessage } = useMessages();

  const handleClick = (text, link) => {
    injectMessage("רגע, מיד נעביר אותך לעמוד המבוקש...");
    setTimeout(() => {
      window.location.href = link;
    }, 2000); // מעביר אחרי 2 שניות
  };

  const options = [
    { label: "פרסום דירה", link: "/publish" },
    { label: "צפייה בדירות", link: "/#/apartmentForRent" },
    { label: "צור קשר", link: "/contact" },
  ];

  return (
    <div className="options-container">
    <p>בחר אחת מהאפשרויות:</p>
    <div className="buttons-wrapper">
      {options.map((opt, index) => (
        <button key={index} onClick={() => handleClick(opt.label, opt.link)} className="option-button">
          {opt.label}
        </button>
      ))}
    </div>
  </div>
  );
};

export default OptionMessage;
