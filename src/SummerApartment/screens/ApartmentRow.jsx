import React, { useState } from "react";
import OpenCloseIcon from "../icons/openClose";
import   "./ApartmentRow.css";
const ApartmentRow = ({ apartment }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr>
        <td className='tcheckbox'><input type='checkbox' /></td>
        <td className='r'>{apartment.city}</td>
        <td className='r'>{apartment.neighbourhood}</td>
        <td className='r'>{apartment.numRooms}</td>
        <td className='r'>{apartment.squareMeter}</td>
        <td className='r'>
          <input
            type='checkbox'
            checked={apartment.porch === true || apartment.porch === "true"}
            readOnly
          />
        </td>
        <td className='r'>
          <strong style={{ textShadow: "1px 1px 0 white, -1px -1px 0 gray" }}>
            {apartment.price}
          </strong>
        </td>
        <td>
          <OpenCloseIcon onToggle={() => setIsOpen(prev => !prev)} />
        </td>
      </tr>

      {isOpen && (
        <tr>
          <td colSpan="8">
            <div className="dropdown-content">
              {/* אפשר לשים פה מה שתרצה */}
<div className="imagess-detiles">התמונות של הדירה</div>
              תוכן נוסף עבור {apartment.city}, {apartment.neighbourhood}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ApartmentRow;
