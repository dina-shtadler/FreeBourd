import "./design.css"
import React from 'react';

import { useNavigate } from 'react-router-dom';

export const Home = () => {
        const Nav = useNavigate();

          const addApartment = () => {
            Nav('/Publisher');
        };
        const apartmentForsale = () => {
            Nav('/apartmentForSale');
        };
        const apartmentForRent = () => {
            Nav('/apartmentForRent');
        };
     
    return<>
    
   <div className="home-container">
      <div className="left-side">
        <div   className="building-image" />
      </div>
      <div className="right-side">
        <button className="search-button" onClick={apartmentForsale}>לחיפוש דירה למכירה</button>
        <button className="search-button" onClick={apartmentForRent}>לחיפוש דירה להשכרה</button>
        <button className="add-button" onClick={addApartment}>התחברות והוספת דירה למאגר </button>
      </div>
    </div>
    
    </>
}
