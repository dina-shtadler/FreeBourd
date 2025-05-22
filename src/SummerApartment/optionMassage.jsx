import React, { useState } from "react";
import { useMessages } from "react-chatbotify";
import "./OptionMessage.css";

const OptionMessage = () => {
  const { injectMessage } = useMessages();
  const [showSubOptions, setShowSubOptions] = useState(false);

  const handleLinkClick = (text, link) => {
    injectMessage("רגע, מיד נעביר אותך לעמוד המבוקש...");
    setTimeout(() => {
      window.location.href = link;
    }, 2000);
  };

  const handleSubOptionClick = (label) => {
    injectMessage(`בחרת: ${label}`);
  };

  const mainOptions = [
    { label: "פרסום דירה", link: "/publish" },
    { label: "צפייה בדירות", link: "/apartmentForRent" },
    { label: "צור קשר", isDetails: true },
    { label: "בחר איזור", isSubOption: true },
  ];

  const subOptions = [
    "צפון הארץ",
    "מרכז הארץ",
    "דרום הארץ",
  ];

  return (
    <div className="options-container">
      <p>בחר אחת מהאפשרויות:</p>
      <div className="buttons-wrapper">
        {mainOptions.map((opt, index) =>
          opt.isSubOption ? (
            <button key={index} className="option-button" onClick={() => setShowSubOptions(true)}>
              {opt.label}
            </button>
          ) 
        //   :opt.isDetails?(
        //   <div onClick={() => setShowSubOptions(true)}>ניתן לייצור קשר בכתובת:freeboardapartment@gmail.com</div>
        //   ) 
          :(
            <button key={index} className="option-button" onClick={() => handleLinkClick(opt.label, opt.link)}>
              {opt.label}
            </button>
          )
        )}
      </div>

      {showSubOptions && (
        <div className="sub-options">
          <p>בחר איזור:</p>
          <div className="buttons-wrapper">
            {subOptions.map((sub, idx) => (
              <button key={idx} className="option-button" onClick={() => handleSubOptionClick(sub)}>
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionMessage;
