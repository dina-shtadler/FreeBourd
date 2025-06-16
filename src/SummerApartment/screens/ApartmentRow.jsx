import React, { useState } from "react";
import OpenCloseIcon from "../icons/openClose";
import   "./ApartmentRow.css";
import Reconditioned from "../icons/reconditioned";
import Sukcaporch from "../icons/Sukcaporch";
import Elevator from "../icons/Elevator";
import View from "../icons/view";
import Warehouse from "../icons/warehouse";
import Park from "../icons/park";
import AirConditioning from "../icons/airConditioning";
import Where from "../icons/Were";
import Phone from "../icons/Phone";
import EmailIcon from "../icons/Email";
import Email from "../icons/Nemail";
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
<div className="picture">
  {apartment.images && apartment.images.map((imgUrl, index) => (
  <img className="picture"
    key={index}
    src={`http://localhost:3001${imgUrl}`}
    alt={`Apartment image ${index}`}
    style={{ width: '322px',height: '211px', margin: '10px' }}
  />
))}

</div>
<div className="allFeatures">
              <div className="floor1">קומה {apartment.floor} </div>
              {(apartment.Sukcaporch === true || apartment.Sukcaporch === "true")&&<div className="Sukcaporch"><Sukcaporch></Sukcaporch> מרפסת סוכה </div>}
              {(apartment.elevator === true || apartment.elevator === "true")&&<div className="elevator"><Elevator></Elevator>  מעלית</div>}
              {(apartment.view === true || apartment.view === "true")&&<div className="view"><View></View> נוף</div>}

              {(apartment.reconditioned === true || apartment.reconditioned === "true")&&<div className="reconditioned"> <Reconditioned></Reconditioned>משופצת</div>}
              {(apartment.warehouse === true || apartment.warehouse === "true")&&<div className="warehouse"><Warehouse></Warehouse> מחסן</div>}
              {(apartment.park === true || apartment.park === "true")&&<div className="park"><Park></Park> חניה</div>}
              {(apartment.airConditioning === true || apartment.airConditioning === "true")&&<div className="airConditioning"><AirConditioning></AirConditioning> מיזוג אוויר</div>}

</div><div className="contact"><div className="contacTitle">יצירת קשר</div><div className="contact1">
<div className="contacTitle2"><Where></Where>מיקום:{apartment.street} {apartment.numBuild},{apartment.city}</div>
<div className="contacTitle3"><Phone></Phone>טלפון:{apartment.phone}</div>
<div className="contacTitle4"><Email></Email>אמייל:{apartment.email}</div></div>
</div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ApartmentRow;
