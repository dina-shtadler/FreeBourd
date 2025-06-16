import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // ייבוא של React Helmet
import "./design.css";
import { useEffect, useState } from "react";
// import { getAllApartment, } from "./api";
// import { GlobalDataContext } from '../App';
// import  { useContext } from 'react';

export const Home = () => {
        //   const globalData = useContext(GlobalDataContext);
 
    //   const [listApartment, setList] = useState([]);
    //   const [listApartment1, setList1] = useState([]);
    //   const [listApartmentH, setListH] = useState([]);

    const Nav = useNavigate();
    useEffect(() => {
    //   getAllApartment()
    //       .then(x => { 
    //          const filteredApartments1 = globalData.filter(item => item.kodKategory[0]?.nameKategory === 'להשכרה'&&  (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
    //          const filteredApartments = globalData.filter(item => item.kodKategory[0]?.nameKategory === 'למכירה' && (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
    //          const filteredApartmentsH = globalData.filter(item => item.kodKategory[0]?.nameKategory === 'נופש שבתות וחגים' && (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
    //           setList(filteredApartments);
    //           setList1(filteredApartments1)
    //           setListH(filteredApartmentsH)
    //           console.log("listApartment", filteredApartments);
    //       })
    //       .catch(err => {
    //           console.log(err);
    //       });
  }, []);
    const addApartment = () => {
        Nav('/Publisher');
    };
    const apartmentForsale = () => {
                    //  const filteredApartments = "למכירה"
        Nav('/allApartments', { state: "למכירה" });
    };
    const apartmentForRent = () => {
                    //  const filteredApartments = "להשכרה"
        Nav('/allApartments', { state: "להשכרה" });
    };
    const apartmentHoliday = () => {
                    //  const filteredApartments = "נופש שבתות וחגים"
        Nav('/allApartments', { state:  "נופש שבתות וחגים"});
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
