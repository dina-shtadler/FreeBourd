import { Outlet } from 'react-router-dom'
import './apartment.css'
import { useEffect, useState ,useRef} from "react";
import { getAllApartment, getAllKategorys, removeApartment, getAllByKodKategory, loginp } from "./api";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // פונט מובנה של pdfmake
import { PDFDocument } from 'pdf-lib';
import * as fontkit from 'fontkit';  // שינוי כאן, יבוא כל הפונקציות מ-fontkit
import swal from 'sweetalert'
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaPrint, FaShareSquare } from 'react-icons/fa';
import { FaTrashAlt, FaPen } from 'react-icons/fa';

import { Document, Page, Text, View, StyleSheet, Font, PDFDownloadLink } from '@react-pdf/renderer';


export const ApartmentForsale = () => {

    const Nav = useNavigate();
    const [Kategory, setKategory] = useState();
    const [Kategory1, setKategory1] = useState();
    const [room, setNumBRooms] = useState();
    const [listApartment, setList] = useState();
    const [listKategories, setListK] = useState();

    // Fetch apartments and categories
    useEffect(() => {
        getAllApartment()
            .then(x => {
                const filteredApartments = x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'למכירה');

                setList(filteredApartments);
                console.log("listApartment",filteredApartments);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

 
    const [selectedApartment, setSelectedApartment] = useState(null); // דירה נבחרת להדפסה
    const printRef = useRef();
   // נרשם את הפונט המותאם אישית
    // Font.register({
    //   family: 'NotoSansHebrew1',
    //   src: '/NotoSansHebrew-Regular.ttf', // נתיב הפונט שלך
    // });
    
  
  // נתיב הפונט מ-Google Fonts
const notoSansHebrewSrc = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@100..900&display=swap" rel="stylesheet';

// רישום הפונט המשתנה
Font.register({
  family: 'Noto Sans Hebrew',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: `${notoSansHebrewSrc}/nq6v_y6B5yo8OeHjP1K3vTk8X63f0OsYJhFqfEqyM2RfBLSXZcKg.ttf`, // גרסה רגילה 400
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: `${notoSansHebrewSrc}/nq6v_y6B5yo8OeHjP1K3vTk8X63f0OsYJhFqfEqyM2RfBLSXZcKg.ttf`, // גרסה נטויה 400 (לבדוק אם קיימת גרסה כזו)
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: `${notoSansHebrewSrc}/nq6v_y6B5yo8OeHjP1K3vTk8X63f0OsYJhFqfEqyM2RfBLSXZcKg.ttf`, // גרסה רגילה 700
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: `${notoSansHebrewSrc}/nq6v_y6B5yo8OeHjP1K3vTk8X63f0OsYJhFqfEqyM2RfBLSXZcKg.ttf`, // גרסה נטויה 700 (אם קיימת)
    },
  ],
});

// יצירת סטיילים ב-PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f0f0f0',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Noto Sans Hebrew',
    fontSize: 12,
    color: '#333',
    fontVariationSettings: '"wdth" 100',  // שימוש בהגדרה של font-variation-settings
  },
  header: {
    fontFamily: 'Noto Sans Hebrew',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontVariationSettings: '"wdth" 100',  // גם כאן
  },
});

  // // סטיילים לקובץ ה-PDF
    // const styles = StyleSheet.create({
    //   page: {
    //     backgroundColor: '#f0f0f0',
    //     padding: 30,
    //   },
    //   section: {
    //     marginBottom: 10,
    //   },
    //   text: {
    //     fontFamily: 'NotoSansHebrew1',
    //     fontSize: 12,
    //     color: '#333',
    //   },
    //   header: {
    //     fontFamily: 'NotoSansHebrew1',
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: '#333',
    //     marginBottom: 20,
    //   },
    // });
    // // הרכיב שמייצר את ה-PDF
    const MyDocument = () => (
      <Document>        

        <Page style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>ברוכים הבאים לדירה למכירה</Text>
            <Text style={styles.text}>תיאור הדירה: דירה מדהימה עם נוף יפה ושפע של אור טבעי. ממוקמת באזור מרכזי בעיר.</Text>
            <Text style={styles.text}>כתובת: רחוב הדירה, תל אביב</Text>
            <Text style={styles.text}>מחיר: 2,500,000 ש"ח</Text>
          </View>
        </Page>
      </Document>
    );

    const downloadPDF = () => {
      debugger
        // הפעלת ההורדה באמצעות לחיצה על הקישור האוטומטי
        downloadLinkRef.current?.click();
      };
    // פונקציה להדפסת דירה נבחרת
    const handlePrint = (apartment) => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>הדפסה</title></head><body>');
        printWindow.document.write(`<h3>פרטי דירה</h3>`);
        printWindow.document.write(`<p>עיר: ${apartment.kodCity[0]?.namecity}, שכונה: ${apartment.neighbourhood}, רחוב: ${apartment.street}</p>`);
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
        printWindow.document.write('<html><head><title>הדפסה</title></head><body>');
        printWindow.document.write('<h3>פרטי הדירות למכירה</h3>');
        
        listApartment.forEach((apartment) => {
            printWindow.document.write(`<p><b>עיר:</b> ${apartment.kodCity[0]?.namecity}, <b>שכונה:</b> ${apartment.neighbourhood}, <b>רחוב:</b> ${apartment.street}</p>`);
            printWindow.document.write(`<p><b>מספר חדרים:</b> ${apartment.numRooms}</p>`);
            printWindow.document.write(`<p><b>שטח דירה:</b> ${apartment.squareMeter} מ"ר</p>`);
            printWindow.document.write(`<p><b>מחיר:</b> ${apartment.price}</p><hr/>`);
        });

        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };
 
    const [minRooms, setMinRooms] = useState('');
    const [login, setlogin] = useState('')

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
// רכיב שמייצר את כפתור ההורדה
    const downloadLinkRef = useRef();
  
    // פונקציה להורדת ה-PDF
    
    return (
        <>
<div className="filters">
  
    <input 
        type="text" 
        placeholder="עיר "
        onChange={(e) => setMinRooms(e.target.value)} 
    />

</div> 
          {/* <button>
<PDFDownloadLink document={<MyDocument />} fileName="apartments-list.pdf">
                {({ loading }) => (loading ? 'יוצרים PDF...' : 'הורד PDF')}
            </PDFDownloadLink>

      </button> */}
<button onClick={handlePrintAll}>הדפס את הכל</button>
            <div className="button-container">
                <button onClick={addApartment} className="add-button">הוספת דירה למאגר</button>
            </div>
            <div className="add-button"> <button onClick={loginS} className="button-container" >התחברות</button> <input type="text" placeholder='סיסמה' onBlur={(e)=>setPassword(e.target.value)}/><input placeholder='מייל'  onBlur={ (e)=>setEmail(e.target.value)}></input>
               :ע"מ לערוך או למחוק דירה שפירסמת עליך להתחבר
            </div>
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
            <table className="apartments-table">
                <thead>
                    <tr>
                        {/* <th>שם הדירה</th> */}
                        <th>כתובת</th>
                        {/* <th>תיאור</th> */}
                        <th>מספר חדרים</th>
                        <th>שטח דירה (מ"ר)</th>
                        <th>מרפסת</th>
                        <th>שטח מרפסת (מ"ר)</th>
                        <th>מחיר</th>
                        <th>קטגוריה</th>
                        <th>מייל</th>
                        <th>טלפון</th>
                        <th>סוכן נדל"ן</th>
                    </tr>
                </thead>
                <tbody>
                    {listApartment && listApartment.map((x) => (
                        <tr key={x._id}>
                            {/* <td>{x.nameApartment}</td> */}
                            <td>{`עיר:${x.city},שכונה: ${x.neighbourhood}, רחוב:${x.street}, מס בניין:${x.numBuild}`}</td>
                            {/* <td>{x.describe}</td> */}
                            <td>{x.numRooms}</td>
                            <td>{x.squareMeter}</td>
                            <td>{x.porch ? x.porch : 'אין'}</td>
                            <td>{x.porchSquareMeter}</td>
                            <td>{x.price}</td>
                            <td>{x.kodKategory[0]?.nameKategory}</td>
                            <td>{x.kodPublisher[0]?.email}</td>
                            <td>{x.kodPublisher[0]?.phone}</td>
                            <td><input type='checkbox' checked={x.realEstateAgency}></input></td>
                            <td>
                                {x.kodPublisher[0]?.email === localStorage.getItem('userEmail') && (
                                    <div>
                                        <button onClick={() => Delete(x)} 
                                        // className="delete-button"
                                        >                        <FaTrashAlt /> {/* אייקון מחיקה */}
                                       
                                        </button>
                                        <button onClick={() => update(x)} 
                                        // className="update-button"
                                        >                         <FaPen /> {/* אייקון עדכון */}
                                       
                                        </button>
                                    </div>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handlePrint(x)}>           <FaShareSquare /> {/* אייקון ייצוא */}
                                <FaPrint /> {/* אייקון הדפסה */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
