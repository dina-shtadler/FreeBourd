import React, { useState, useEffect } from "react";
import "./openCloseIcon.css";

const OpenCloseIcon = ({ onToggle }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    const next = !open;
    setOpen(next);
    onToggle(next); // מודיע החוצה על שינוי
  };

  return (
    <button
      className={`icon-circle ${open ? "rotated" : ""}`}
      onClick={handleClick}
    >
      <svg 
        width="6" 
        height="10.27"
        viewBox="0 0 11 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.13669 4.70977L9.08644 0.652953C9.66938 0.263438 10.0779 0.740785 10.0779 0.740785C10.0779 0.740785 10.4814 1.17389 10.1053 1.71075C10.1053 1.71075 6.04467 5.87558 5.65477 6.28429C5.42597 6.5 5.13668 6.5 5.13668 6.5C5.13668 6.5 4.84452 6.5 4.61555 6.28429C4.40628 6.05317 0.37049 1.92283 0.149923 1.68509C-0.125058 1.30986 0.0243019 0.898239 0.230129 0.702569C0.435957 0.506898 0.814446 0.410456 1.17534 0.645286C1.85133 1.32127 5.13669 4.70977 5.13669 4.70977Z"
          fill="#0068F5"
        />
      </svg>
    </button>
  );
};

export default OpenCloseIcon;
