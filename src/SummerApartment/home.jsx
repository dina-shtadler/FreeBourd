import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // ייבוא של React Helmet
import "./design.css";
import { useEffect, useState } from "react";
import { getAllApartment, } from "./api";

export const Home = () => {
      const [listApartment, setList] = useState([]);
      const [listApartment1, setList1] = useState([]);
      const [listApartmentH, setListH] = useState([]);

    const Nav = useNavigate();
    useEffect(() => {
      getAllApartment()
          .then(x => { 
             const filteredApartments1 = x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'להשכרה'&&  (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
             const filteredApartments = x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'למכירה' && (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
             const filteredApartmentsH = x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'נופש שבתות וחגים' && (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
              setList(filteredApartments);
              setList1(filteredApartments1)
              setListH(filteredApartmentsH)
              console.log("listApartment", filteredApartmentsH);
          })
          .catch(err => {
              console.log(err);
          });
  }, []);
    const addApartment = () => {
        Nav('/Publisher');
    };
    const apartmentForsale = () => {
        Nav('/apartmentForSale', { state: { listApartment } });
    };
    const apartmentForRent = () => {
        Nav('/apartmentForRent', { state: { listApartment1 } });
    };
    const apartmentHoliday = () => {
        Nav('/apartmentHoliday', { state: { listApartmentH } });
    };

    return (
        <>
            <Helmet>
                <meta name="description" content=" דף הבית של האתר, שבו ניתן לחפש ולפרסם דירות למכירה ולהשכרה מיעד בעיקר לציבור החרדי השימוש באתר הוא חינמי...." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charset="UTF-8" />
                <title>דף הבית-סרסור/המתווך</title>
            </Helmet>
            
            <div className="home-container">
                <div className="left-side">
                    <div className="building-image" />
                </div>
                <div className="right-side">
                    <button className="search-button" onClick={apartmentForsale}>לחיפוש דירה למכירה</button>
                    <button className="search-button" onClick={apartmentForRent}>לחיפוש דירה להשכרה</button>
                    <button className="search-button" onClick={apartmentHoliday}>לחיפוש דירה לנופש שבתות וחגים</button>
                    <button className="add-button" onClick={addApartment}>התחברות והוספת דירה למאגר </button>
                </div>
            </div>
        </>
    );
};
