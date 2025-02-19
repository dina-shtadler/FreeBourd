import React from 'react';
import './apartment.css'
import { useEffect, useState } from "react";
import { getAllApartment, getAllKategorys, removeApartment, loginp,getAllByKodKategory } from "./api";
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

  return (
      <>

<button onClick={handlePrintAll}>הדפס את הכל</button>

          <table className="apartments-table">
  <thead>
      <tr>
          <th>עיר</th>
          <th>שכונה</th>
          <th>רחוב</th>
          <th>מס' בניין</th>
          <th>מספר חדרים</th>
          <th>שטח דירה (מ"ר)</th>
          <th>מרפסת</th>
          <th>שטח מרפסת (מ"ר)</th>
          <th>מחיר</th>
          <th>קטגוריה</th>
          <th>מייל</th>
          <th>טלפון</th>
          <th>תיווך</th>
          <th>עידכון ומחיקה</th>
          <th> pdfהדפסה ו</th>
      </tr>
  </thead>
  <tbody>
      {listApartment && listApartment.map((x) => (
          <tr key={x._id}>
              <td>{x.city}</td>
              <td>{x.neighbourhood}</td>
              <td>{x.street}</td>
              <td>{x.numBuild}</td>
              <td>{x.numRooms}</td>
              <td>{x.squareMeter}</td>
              <td><input type='checkbox' checked={x.porch} readOnly /></td>
              <td>{x.porchSquareMeter}</td>
              <td>{x.price}</td>
              <td>{x.kodKategory[0]?.nameKategory}</td>
              <td>{x.kodPublisher[0]?.email}</td>
              <td>{x.kodPublisher[0]?.phone}</td>
              <td><input type='checkbox' checked={x.realEstateAgency} readOnly /></td>
              <td>
                      <div>
                          <button onClick={() => Delete(x)}><FaTrashAlt /></button>
                          <button onClick={() => update(x)}><FaPen /></button>
                      </div>
                  
              </td>
              <td>
                  <button onClick={() => handlePrint(x)}>
                      <FaShareSquare /> <FaPrint />
                  </button>
              </td>
          </tr>
      ))}
  </tbody>
</table>

      </>
  );
};


