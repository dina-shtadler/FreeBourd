import React from 'react';
import './personalarea.css'
import { useEffect, useState } from "react";
import { getAllApartment,updateApartment, getAllKategorys, removeApartment, loginp,getAllByKodKategory } from "./api";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View, Font } from '@react-pdf/renderer';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // פונט מובנה של pdfmake
import { PDFDocument } from 'pdf-lib';
import * as fontkit from 'fontkit';  // שינוי כאן, יבוא כל הפונקציות מ-fontkit
import swal from 'sweetalert'
import { FaPrint, FaShareSquare } from 'react-icons/fa';
import { FaTrashAlt, FaPen } from 'react-icons/fa';

export const PersonalArea =() =>{
 
  const Nav = useNavigate();
  const [Kategory, setKategory] = useState();
  const [Kategory1, setKategory1] = useState();
  const [room, setNumBRooms] = useState();
  const [listApartment, setList] = useState();
  const [listApartment1, setList1] = useState();
  const [listKategories, setListK] = useState();
  const [city, setcity] = useState('');
  const [neighbourhood, setneighbourhood] = useState('');
  const [street, setstreet] = useState('');
  const [numRooms, setnumRooms] = useState();
  const [squermeter, setsquermeter] = useState();
  const [price, setPrice] = useState();
  const [floor, setFloor] = useState('');
  // Fetch apartments and categories
  useEffect(() => {
      getAllApartment()
          .then(x => {
              const filteredApartments = x.data.apartmens.filter(item => item.kodPublisher[0]?.email === localStorage.getItem('userEmail')) 
          

          setList(filteredApartments);
          setList1(filteredApartments);
                          console.log("listApartment",filteredApartments);
          })
          .catch(err => {
              console.log(err);
          });
  }, []);

  
  const [login, setlogin] = useState()

 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginS = (event) => {
      event.preventDefault()

      const Publisher =  {
        
          email:email,
           password: password
      }
      console.log(    Publisher)
      loginp(Publisher.email,Publisher.password) 
      .then(x => {
        console.log("א",x.data);
       setlogin(x)
       if (x.data.message=='Login successful!'){
          localStorage.setItem(`user`,x.data.publisher._id)
          localStorage.setItem(`userEmail`,x.data.publisher.email)
                      localStorage.setItem(`token`,x.data.token)

       swal( `🤭🤭🤭 success`);
  //  
  }
 
 
    })
    .catch(err => {
        console.log(err);
        swal(err.response.data.message)
     

    })}
    const handlePrint = (apartment) => {
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><head><title>הדפסה</title></head><body>');
      printWindow.document.write(`<h3>פרטי דירה</h3>`);
      printWindow.document.write(`<p>עיר: ${apartment.city}, שכונה: ${apartment.neighbourhood}, רחוב: ${apartment.street}</p>`);
      printWindow.document.write(`<p>מספר חדרים: ${apartment.numRooms}</p>`);
      printWindow.document.write(`<p>שטח דירה: ${apartment.squareMeter} מ"ר</p>`);
      printWindow.document.write(`<p>מחיר: ${apartment.price}</p>`);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
  };

  // פונקציה להדפסת כל הדירות
  const handlePrintAll = () => {
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><head><title>ייצוא</title><style>');
      printWindow.document.write(`
          table {
              width: 100%;
              border-collapse: collapse;
          }
          th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: center;
          }
          th {
              background-color: #f2f2f2;
          }
      `);
      printWindow.document.write('</style></head><body>');
      printWindow.document.write('<h3>פרטי הדירות להשכרה</h3>');
      
      // יצירת הטבלה
      printWindow.document.write('<table>');
      printWindow.document.write('<thead><tr><th>עיר</th><th>שכונה</th><th>רחוב</th><th>מס\' בניין</th><th>מספר חדרים</th><th>שטח דירה (מ"ר)</th><th>מרפסת</th><th>שטח מרפסת (מ"ר)</th><th>מחיר</th><th>קטגוריה</th><th>מייל</th><th>טלפון</th><th>תיווך</th><th>ייצוא</th></tr></thead>');
      printWindow.document.write('<tbody>');
      
      listApartment.forEach((apartment) => {
          printWindow.document.write(`
              <tr>
                  <td>${apartment.city}</td>
                  <td>${apartment.neighbourhood}</td>
                  <td>${apartment.street}</td>
                  <td>${apartment.numBuild}</td>
                  <td>${apartment.numRooms}</td>
                  <td>${apartment.squareMeter}</td>
                  <td><input type='checkbox' checked=${apartment.porch} readOnly /></td>
                  <td>${apartment.porchSquareMeter}</td>
                  <td>${apartment.price}</td>
                  <td>${apartment.kodKategory[0]?.nameKategory}</td>
                  <td>${apartment.kodPublisher[0]?.email}</td>
                  <td>${apartment.kodPublisher[0]?.phone}</td>
                  <td><input type='checkbox' checked=${apartment.realEstateAgency} readOnly /></td>
                  <td><button>ייצוא</button></td>
              </tr>
          `);
      });
  
      printWindow.document.write('</tbody></table>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
  };
  

  // Delete apartment
  const Delete = (a) => {
      removeApartment(a._id, localStorage.getItem('user'), a)
          .then(() => {
              alert('Apartment deleted');
              setList(prevList => prevList.filter(apartment => apartment._id !== a._id));

          })
          .catch(err => {
              console.log(err);
              alert(err.response.data)
          });
  };

  // Update apartment
  const update = (a) => {
      localStorage.setItem('thisApartment', JSON.stringify(a));
      Nav('/UpdateApartment');
  };

  // Navigate to add apartment page
  const addApartment = () => {
      Nav('/addApartments');
  };
//פופאפ
  // State to manage popup visibility and selected date
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Get today's date and 30 days from today
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const max = new Date(today);
    max.setDate(today.getDate() + 30); // 30 days from today

    const formattedToday = today.toISOString().split("T")[0];
    const formattedMax = max.toISOString().split("T")[0];

    setMinDate(formattedToday);
    setMaxDate(formattedMax);
  }, []);

  // Function to handle opening the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to handle closing the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Function to handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Function to save the selected date
  const saveDate = (a) => {
    const Apartment = {
      _id: a._id,
      kodPublisher: localStorage.getItem(`user`),
    datend:selectedDate
  };

    if (selectedDate) {
      alert(`התאריך שנבחר: ${selectedDate}`);
      updateApartment(localStorage.getItem(`user`), Apartment)
      .then(x => {
          console.log(x.data);
          swal(`🤭🤭🤭 success`);
      })
      .catch(err => {
          console.log(err);
      });

      closePopup();
    } else {
      alert("נא לבחור תאריך.");
    }
  };
  return (
      <>
      <h1>הדירות שלי</h1>
      <div className="apartments-wrapper">
      <button onClick={handlePrintAll}>הדפס את הכל</button>

      <div className="apartments-list">
        {listApartment &&
          listApartment.map((x) => (
            <div
              key={x._id}
              className={`card ${
                new Date(x.datend).getTime() <
                new Date().setHours(0, 0, 0, 0)
                  ? "card-expired"
                  : ""
              }`}
            >
              <div className="card-header">
                <h3>{x.city}</h3>
              </div>

              <div className="card-body">
                <p>
                  <strong>שכונה:</strong> {x.neighbourhood}
                </p>
                <p>
                  <strong>רחוב:</strong> {x.street}
                </p>
                <p>
                  <strong>מס' בניין:</strong> {x.numBuild}
                </p>
                <p>
                  <strong>מס' חדרים:</strong> {x.numRooms}
                </p>
                <p>
                  <strong>שטח דירה (מ"ר):</strong> {x.squareMeter}
                </p>
                <p>
                  <strong>מרפסת:</strong> {x.porch ? "כן" : "לא"}
                </p>
                <p>
                  <strong>שטח מרפסת (מ"ר):</strong> {x.porchSquareMeter}
                </p>
                <p>
                  <strong>מחיר:</strong> {x.price}
                </p>
                <p>
                  <strong>קטגוריה:</strong> {x.kodKategory[0]?.nameKategory}
                </p>
              </div>

              <div className="card-footer">
               
  {/* אם הפג תוקף, יש אייקון ופעולה להוספת זמן */}
  {new Date(x.datend).getTime() < new Date().setHours(0, 0, 0, 0) && (
                  <div className="expired-container">
                                      <div className="expired-text">פג תוקף פירסומת</div>

                    <div className="update-button-container">
                      <button onClick={openPopup} className="popup-button">
                        הוסף זמן לפירסום
                      </button>
                      {isPopupOpen && (
                        <div className="popup">
                          <div className="popup-content">
                            <span className="close" onClick={closePopup}>
                              &times;
                            </span>
                            <h2>בחר תאריך</h2>
                            <input
                              type="date"
                              value={selectedDate}
                              min={minDate}
                              max={maxDate}
                              onChange={handleDateChange}
                            />
                            <button onClick={() => saveDate(x)}>שמור תאריך</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              

                <div className="expired-icons">
                      <button onClick={() => Delete(x)}>
                        <FaTrashAlt /> מחק
                      </button>
                      <button onClick={() => update(x)}>
                        <FaPen /> עדכן
                      </button>
                      <button onClick={() => handlePrint(x)}>
                        <FaShareSquare /> <FaPrint />
                      </button>
                    </div>
              
              </div>
            </div>
          ))}
      </div>
    </div>
  </>
  );
};
