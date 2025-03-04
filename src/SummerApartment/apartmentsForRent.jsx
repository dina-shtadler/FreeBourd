
import { Outlet } from 'react-router-dom'

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
import { useLocation } from 'react-router-dom';

export const ApartmentForRent = () => {
    // pdfMake.vfs = pdfFonts.pdfMake.vfs; // שייך את הפונט המובנה
    const location = useLocation();
console.log(location)  
    const Nav = useNavigate();
    const [listApartment, setList] = useState([]);
    const [listApartment1, setList1] = useState([]);
    const [listKategories, setListK] = useState();
    const [city, setcity] = useState('');
    const [neighbourhood, setneighbourhood] = useState('');
    const [street, setstreet] = useState('');
    const [numRooms, setnumRooms] = useState(99999);
    const [minRooms,setMinRooms]=useState(0);
    const [squermeter, setsquermeter] = useState(9999999999999999999999);
    const [minsquermeter, setminsquermeter] = useState(0);
    const [price, setPrice] = useState(99999999999999999999999999999999999999);
    const [minprice, setminPrice] = useState();
    const [floor, setFloor] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // ניהול סטטוס הכניסה של המשתמש
   
    // Fetch apartments and categories
    useEffect(() => {
       
            setList(location.state.listApartment1);
            setList1(location.state.listApartment1);
        
    }, []);
    const apartmentMatchesFilters = (apartment) => {
        // בדיקת טקסט – השוואה ללא רגישות לאותיות רישיות, וכשיש ערך שהמשתמש הזין
        if (city && apartment.city.trim().toLowerCase() !== city.trim().toLowerCase()) {
          return false;
        }
        if (neighbourhood && apartment.neighbourhood.trim().toLowerCase() !== neighbourhood.trim().toLowerCase()) {
          return false;
        }
        if (street && apartment.street.trim().toLowerCase() !== street.trim().toLowerCase()) {
          return false;
        }
      
        // בדיקת מספר חדרים (מקסימום ומינימום)
        if (numRooms && Number(apartment.numRooms) > Number(numRooms)) {
          return false;
        }
        if (minRooms && Number(apartment.numRooms) < Number(minRooms)) {
          return false;
        }
      
        // בדיקת שטח (מ"ר) – גם כאן מקסימום ומינימום
        if (squermeter && Number(apartment.squareMeter) > Number(squermeter)) {
          return false;
        }
        if (minsquermeter && Number(apartment.squareMeter) < Number(minsquermeter)) {
          return false;
        }
      
        // בדיקת מחיר – מקסימום ומינימום
        if (price && Number(apartment.price) > Number(price)) {
          return false;
        }
        if (minprice && Number(apartment.price) < Number(minprice)) {
          return false;
        }
      
        // בדיקת קומה – כאן נניח שהמשתמש מספק את הקומה המקסימלית (אם לא, ניתן להתאים את הלוגיקה)
        if (floor && Number(apartment.floor) > Number(floor)) {
          return false;
        }
      
        // שדה numBuild לא נכלל בסינון, כפי שהתכוונת
        return true;
      };
      
      // שימוש ב-useEffect לעדכון הרשימה המסוננת כאשר אחד מהפילטרים משתנה
      useEffect(() => {
        if (listApartment1 && listApartment1.length > 0) {
          const filteredApartments = listApartment1.filter(apartmentMatchesFilters);
          setList(filteredApartments);
        }
      }, [
        city,
        neighbourhood,
        street,
        numRooms,
        minRooms,
        squermeter,
        minsquermeter,
        price,
        minprice,
        floor,
        listApartment1
      ]);
    // // Filter apartments by category
    // const send = () => {
    //     listKategories.forEach((x) => {
    //         if (x.nameKategory === Kategory) {
    //             setKategory1(x._id);
    //             getAllByKodKategory(x._id)
    //                 .then(x => {
    //                     setList(x.data.a.Apartment);
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 });
    //         }
    //     });
    // };
 
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
    const personalArea = () =>{
        if (!isLoggedIn) {
          Nav('/private'); // אם המשתמש לא מחובר, שלח אותו לדף ההתחברות
        } else {
         Nav('/personal-area'); // אם הוא מחובר, שלח אותו לאזור האישי
         }
      };
    return (
        <>
        
        <button className="personal-area-button" onClick={personalArea}>אזור אישי למפרסמים</button>

<div className="filters">
  
    <input 
        type="text" 
        placeholder="עיר "
        
        onBlur={(e) =>{
          console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
          setcity(e.target.value);}} 
    />
    <input 
        type="text" 
        placeholder="שכונה "
        onBlur={(e) => {
          console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
          setneighbourhood(e.target.value)}} 
    /><input 
    type="text" 
    placeholder="רחוב "
    onBlur={(e) =>{
      console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
      setstreet(e.target.value)}} 
/><input 
        type="Number" 
        placeholder="(מס' חדרים (מקסימום"
        onBlur={(e) => {
          console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
          setnumRooms(e.target.value)
        console.log(numRooms)}} 
    />
    <input 
    type="Number" 
    placeholder="מס' חדרים (מינימום)"
    onBlur={(e) => {
      console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
      setMinRooms(e.target.value)
    console.log(minRooms)}} 
/>
<input 
        type="Number" 
        placeholder="מ'ר לדירה (מקסימום)"
        onBlur={(e) => {
          console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
          setsquermeter(e.target.value)
        console.log(squermeter)}} 
    /><input 
    type="Number" 
    placeholder="מ'ר לדירה (מינימום)"
    onBlur={(e) => {
      console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
      setminsquermeter(e.target.value)
    console.log(minsquermeter)}} 
/><input 
    type="Number" 
    placeholder="מחיר (מקסימום)"
    onBlur={(e) => {
      console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
      setPrice(e.target.value)
    console.log(price)}} 
/><input 
    type="Number" 
    placeholder="מחיר (מינימום)"
    onBlur={(e) => {
      console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
      setminPrice(e.target.value)
    console.log(minprice)}} 
/>
<input 
    type="Number" 
    placeholder=" מס' קומה"
    onBlur={(e) => {
      console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
      setFloor(e.target.value)
    console.log(floor)}} 
/>
</div> 
          {/* <button>
<PDFDownloadLink document={<MyDocument />} fileName="apartments-list.pdf">
                {({ loading }) => (loading ? 'יוצרים PDF...' :
 'הורד PDF')}
            </PDFDownloadLink>

      </button> */}
<button onClick={handlePrintAll}>הדפס את הכל</button>
            {/* <div className="button-container">
                <button onClick={addApartment} className="add-button">הוספת דירה למאגר</button>
            </div>
            <div className="add-button"> <button onClick={loginS} className="button-container" >התחברות</button> <input type="text" placeholder='סיסמה' onBlur={(e)=>setPassword(e.target.value)}/><input placeholder='מייל'  onBlur={ (e)=>setEmail(e.target.value)}></input>
               :
ע"מ לערוך או למחוק דירה שפירסמת עליך להתחבר
            </div> */}
            {/* Filter components */}
            {/* <div className="filter-container">
                <h3>בחר קטגוריה</h3>
                <select required onChange={(e) => setKategory(e.target.value)} onBlur={send}>
                    <option value="" disabled selected>בחר קטגוריה</option>
                    {listKategories && listKategories.map((x) => (
                        <option key={x._id} value={x.nameKategory}>{x.nameKategory}</option>
                    ))}
                </select>
            </div>

            <div className="filter-container">
                <h3>הכנס מספר חדרים</h3>
                <input type="number" onChange={(e) => setNumBRooms(e.target.value)} />
            </div> */}

            {/* Table displaying apartments */}
            <div className="table-container">
            <div className="table-wrapper">
                {/* פס גלילה עליון */}
                <div className="scroll-inner"></div>

            {/* גלילה אופקית ואנכית לטבלה */}
            <div className="table-scroll" >
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
            <th>קומה</th>
            <th>פרטים נוספים</th>
            {/* <th>פעולות</th> */}
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
                <td><input type='checkbox' checked={x.porch === true || x.porch === "true"} readOnly /></td>
                <td>{x.porchSquareMeter}</td>
                <td>{x.price}</td>
                <td>{x.kodKategory[0]?.nameKategory}</td>
                <td>{x.kodPublisher[0]?.email}</td>
                <td>{x.kodPublisher[0]?.phone}</td>
                <td><input type='checkbox' checked={x.realEstateAgency === true || x.realEstateAgency === "true"} readOnly /></td>
                {/* <td>
                    {x.kodPublisher[0]?.email === localStorage.getItem('userEmail') && (
                        <div>
                            <button onClick={() => Delete(x)}><FaTrashAlt /></button>
                            <button onClick={() => update(x)}><FaPen /></button>
                        </div>
                    )}
                </td> */}
                <td>{x.floor}</td>
                <td>{x.describe}</td>
                <td>
                    <button onClick={() => handlePrint(x)}>
                        <FaShareSquare /> <FaPrint />
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table></div>   {/* פס גלילה עליון */}
             {/* פס גלילה תחתון */}
                <div className="scroll-inner"></div>
</div>{/* פס גלילה תחתון */}
   
</div>
        </>
    );
};