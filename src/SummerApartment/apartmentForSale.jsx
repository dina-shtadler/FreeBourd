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
    const [listApartment1, setList1] = useState();
    const [listKategories, setListK] = useState();
    const [city, setcity] = useState('');
    const [neighbourhood, setneighbourhood] = useState('');
    const [street, setstreet] = useState('');
    const [numRooms, setnumRooms] = useState();
    const [squermeter, setsquermeter] = useState();
    const [price, setPrice] = useState();
    const [numFloor, setnumFloor] = useState('');

    // Fetch apartments and categories
    useEffect(() => {
        getAllApartment()
            .then(x => {
                const filteredApartments = x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'למכירה');

                setList(filteredApartments);
                setList1(filteredApartments);
                console.log("listApartment",x.data.apartmens);
            })
            .catch(err => {
                console.log(err);
            });
           
    }, []);
//     useEffect(() => {
//       if (listApartment && listApartment.length > 0) {
//         if(city){
//         const f1 = listApartment.filter(item =>{    
//           const isCityMatch = city!='' ? item.city === city :
//  true;
//           return isCityMatch;
//         } );
//         setList(f1); // עדכון הרשימה המסוננת
//       }
//       else{
//         const f1 = listApartment1.filter(item =>{    
//           const isMatch =  (numRooms!=''&& neighbourhood!=''&& street!=''?item.street===street && item.city ===numRooms&& item.neighbourhood===neighbourhood:
// neighbourhood!=''&& street!=''?item.street===street &&  item.neighbourhood===neighbourhood:
// neighbourhood!=''&& numRooms!=''?item.numRooms ===numRooms&& item.neighbourhood===neighbourhood:
// numRooms!=''&& street!=''?item.street===street && item.numRooms ===numRooms:
// neighbourhood!=''?item.neighbourhood ===neighbourhood:
// street!=''?item.street ===street:
// numRooms!=''?item.numRooms ===numRooms:
// true)
//           console.log(numRooms,item.numRooms)
//           return isMatch;
//         } );
//         setList(f1);} 

//     }
//   }, [city]);
//   useEffect(() => {
//     if (listApartment1 && listApartment1.length > 0) {
//       const f1 = listApartment1.filter(item =>{    
//         const isnumFloorMatch = numFloor!='' ? parseInt(item.numFloor) === parseInt(numFloor):
// true;
//         return isnumFloorMatch;
//       } );
//       setList(f1); // עדכון הרשימה המסוננת
//   }
// }, [numFloor]);
useEffect(() => {
  if (listApartment1 && listApartment1.length > 0) {
    console.log(numRooms,"num")
  debugger
    const f1 = listApartment1.filter(item =>{    
      const isnumRoomsMatch =
      price&&squermeter&&numRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
      squermeter&&numRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
      price&&numRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
      numRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.numRooms) <=parseInt(numRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
     price&&squermeter&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
      squermeter&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
      price&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
      city!=''&& neighbourhood!=''&& street!=''?item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
price&&squermeter&&neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street===street &&  item.neighbourhood===neighbourhood:
squermeter&&neighbourhood!=''&& street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street===street &&  item.neighbourhood===neighbourhood:
price&&neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&item.street===street &&  item.neighbourhood===neighbourhood:
neighbourhood!=''&& street!=''?item.street===street &&  item.neighbourhood===neighbourhood:
price&&squermeter&&numRooms&&neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&  item.neighbourhood===neighbourhood:
squermeter&&numRooms&&neighbourhood!=''&& street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&  item.neighbourhood===neighbourhood:
price&&numRooms&&neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&  item.neighbourhood===neighbourhood:
numRooms&&neighbourhood!=''&& street!=''?item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&  item.neighbourhood===neighbourhood:
price&&squermeter&&numRooms&&neighbourhood!=''&& city!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
squermeter&&numRooms&&neighbourhood!=''&& city!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
price&&numRooms&&neighbourhood!=''&& city!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
numRooms&&neighbourhood!=''&& city!=''?parseInt(item.numRooms) <=parseInt(numRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
price&&squermeter&&neighbourhood!=''&& city!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.city ===city&& item.neighbourhood===neighbourhood:
squermeter&&neighbourhood!=''&& city!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.city ===city&& item.neighbourhood===neighbourhood:
price&&neighbourhood!=''&& city!=''?parseInt(item.price) <=parseInt(price)&&item.city ===city&& item.neighbourhood===neighbourhood:
neighbourhood!=''&& city!=''?item.city ===city&& item.neighbourhood===neighbourhood:
price&&squermeter&&numRooms&&city!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.street===street && item.city ===city:
squermeter&&numRooms&&city!=''&& street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.street===street && item.city ===city:
price&&numRooms&&city!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.street===street && item.city ===city:
numRooms&&city!=''&& street!=''?parseInt(item.numRooms) <=parseInt(numRooms)&&item.street===street && item.city ===city:
price&&squermeter&&city!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street===street && item.city ===city:
squermeter&&city!=''&& street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street===street && item.city ===city:
price&&city!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&item.street===street && item.city ===city:
city!=''&& street!=''?item.street===street && item.city ===city:
price&&squermeter&&neighbourhood!=''&&numRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms):
squermeter&&neighbourhood!=''&&numRooms?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms):
price&&neighbourhood!=''&&numRooms?parseInt(item.price) <=parseInt(price)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms):
neighbourhood!=''&&numRooms?item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms):
price&&squermeter&&neighbourhood!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.neighbourhood ===neighbourhood:
squermeter&&neighbourhood!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.neighbourhood ===neighbourhood:
price&&neighbourhood!=''?parseInt(item.price) <=parseInt(price)&&item.neighbourhood ===neighbourhood:
neighbourhood!=''?item.neighbourhood ===neighbourhood:
price&&squermeter&&street!=''&&numRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms):
squermeter&&street!=''&&numRooms?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms):
price&&street!=''&&numRooms?parseInt(item.price) <=parseInt(price)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms):
street!=''&&numRooms?item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms):
price&&squermeter&&street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street ===street:
squermeter&&street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.street ===street:
price&&street!=''?parseInt(item.price) <=parseInt(price)&&item.street ===street:
street!=''?item.street ===street:
price&&squermeter&&numRooms&&city!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.city ===city:
squermeter&&numRooms&&city!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.city ===city:
price&&numRooms&&city!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.numRooms) <=parseInt(numRooms)&&item.city ===city:
numRooms&&city!=''?parseInt(item.numRooms) <=parseInt(numRooms)&&item.city ===city:
price&&squermeter&&city!=''?parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&item.city ===city:
squermeter&&city!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&item.city ===city:
price&&city!=''?parseInt(item.price) <=parseInt(price)&&item.city ===city:
city!=''?item.city ===city:
price&&squermeter&&numRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms):
squermeter&&numRooms?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.numRooms) <=parseInt(numRooms):
price&&numRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.numRooms) <=parseInt(numRooms):
numRooms?parseInt(item.numRooms) <=parseInt(numRooms):
price&&squermeter?parseInt(item.price) <=parseInt(price)&&parseInt(item.squareMeter) <=parseInt(squermeter):
squermeter?parseInt(item.squareMeter) <=parseInt(squermeter):
price?parseInt(item.price) <=parseInt(price):false;
      console.log(numRooms,item.numRooms,isnumRoomsMatch)
      return isnumRoomsMatch;
    } );
    setList(f1);} // עדכון הרשימה המסוננת
}, [numRooms,street,neighbourhood,city,squermeter,price]);
// useEffect(() => {
//   if (listApartment && listApartment.length > 0) {
//     if(street!=''){
//     const f1 = listApartment.filter(item =>{    
//       const isstreetMatch = street!='' ? item.street === street :
//  true;
//       return isstreetMatch;
//     } );
//     setList(f1); // עדכון הרשימה המסוננת
//   } else{
//     const f1 = listApartment1.filter(item =>{    
//       const isMatch =  (city!=''&& neighbourhood!=''&& numRooms!=''?item.numRooms===numRooms && item.city ===city&& item.neighbourhood===neighbourhood:

// neighbourhood!=''&& numRooms!=''?item.numRooms===numRooms &&  item.neighbourhood===neighbourhood:

// neighbourhood!=''&& city!=''?item.city ===city&& item.neighbourhood===neighbourhood:
// city!=''&& numRooms!=''?item.numRooms===numRooms && item.city ===city:
// neighbourhood!=''?item.neighbourhood ===neighbourhood:
// numRooms!=''?item.numRooms ===numRooms:
// city!=''?item.city ===city:
// true)
//       return isMatch;
//     } );
//     setList(f1);} 
  
// }
// }, [street]);
// useEffect(() => {
//   if (listApartment && listApartment.length > 0) {
//     if(neighbourhood!=''){
//     const f1 = listApartment.filter(item =>{    
//       const isneighbourhoodMatch = neighbourhood!='' ? item.neighbourhood === neighbourhood :
//  true;
//       return isneighbourhoodMatch;
//     } );
//     setList(f1); // עדכון הרשימה המסוננת
//   }
//   else{
//     const f1 = listApartment1.filter(item =>{    
//       const isMatch =  (city!=''&& numRooms!=''&& street!=''?item.street===street && item.city ===city&& item.numRooms===numRooms:
// numRooms!=''&& street!=''?item.street===street &&  item.numRooms===numRooms:
// numRooms!=''&& city!=''?item.city ===city&& item.numRooms===numRooms:
// city!=''&& street!=''?item.street===street && item.city ===city:
// numRooms!=''?item.numRooms ===numRooms:
// street!=''?item.street ===street:
// city!=''?item.city ===city:
// true)
//       return isMatch;
//     } );
//     setList(f1);} 
// }
// }, [neighbourhood]);

    
    const [selectedApartment, setSelectedApartment] = useState(null); // דירה נבחרת להדפסה
    const printRef = useRef();
   
    // פונקציה להדפסת דירה נבחרת
    const handlePrint = (apartment) => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>הדפסה</title></head><body>');
        printWindow.document.write(`<h3>פרטי דירה</h3>`);
        printWindow.document.write(`<p>עיר:${apartment.city}, שכונה:${apartment.neighbourhood}, רחוב:${apartment.street}</p>`);
        printWindow.document.write(`<p>מספר חדרים:${apartment.numRooms}</p>`);
        printWindow.document.write(`<p>שטח דירה:${apartment.squareMeter} מ"ר</p>`);
        printWindow.document.write(`<p>מחיר:${apartment.price}</p>`);
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
              width:100%;
              border-collapse:collapse;
          }
          th, td {
              border:1px solid black;
              padding:8px;
              text-align: center;
          }
          th {
              background-color: #f2f2f2;
          }
      `);
      printWindow.document.write('</style></head><body>');
      printWindow.document.write('<h3>פרטי הדירות למכירה</h3>');
      
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
                  <td>${apartment.numRooms}</td>
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
  
  
    const [login, setlogin] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginS = (event) => {
        event.preventDefault()

        const Publisher =  {
          
            email:email,
             password:password
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
        placeholder="מס' חדרים"
        onBlur={(e) => {
          console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
          setnumRooms(e.target.value)
        console.log(numRooms)}} 
    />
<input 
        type="Number" 
        placeholder="מ'ר לדירה"
        onBlur={(e) => {
          console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
          setsquermeter(e.target.value)
        console.log(squermeter)}} 
    /><input 
    type="Number" 
    placeholder="מחיר"
    onBlur={(e) => {
      console.log('blur triggered:', e.target.value); // להדפיס את הערך בלוג
      setPrice(e.target.value)
    console.log(price)}} 
/>
</div> 
{/* //קומה */}
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
                <td><input type='checkbox' checked={x.porch} readOnly /></td>
                <td>{x.porchSquareMeter}</td>
                <td>{x.price}</td>
                <td>{x.kodKategory[0]?.nameKategory}</td>
                <td>{x.kodPublisher[0]?.email}</td>
                <td>{x.kodPublisher[0]?.phone}</td>
                <td><input type='checkbox' checked={x.realEstateAgency} readOnly /></td>
                {/* <td>
                    {x.kodPublisher[0]?.email === localStorage.getItem('userEmail') && (
                        <div>
                            <button onClick={() => Delete(x)}><FaTrashAlt /></button>
                            <button onClick={() => update(x)}><FaPen /></button>
                        </div>
                    )}
                </td> */}
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
