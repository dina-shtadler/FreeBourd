import { Outlet } from 'react-router-dom'
import './apartment.css'
import { useEffect, useState ,useRef} from "react";
import { getAllApartment, getAllKategorys, removeApartment, getAllByKodKategory, loginp } from "./api";
import { jsPDF } from "jspdf";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // פונט מובנה של pdfmake
import { PDFDocument } from 'pdf-lib';
import * as fontkit from 'fontkit';  // שינוי כאן, יבוא כל הפונקציות מ-fontkit
import swal from 'sweetalert'
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaPrint, FaShareSquare } from 'react-icons/fa';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Document, Page, Text, View, StyleSheet, Font, PDFDownloadLink } from '@react-pdf/renderer';
import Private from './Private';
import PersonalArea from './PersonalArea'; // דף האזור האישי


export const ApartmentForsale = () => {

    const Nav = useNavigate();
    const [Kategory, setKategory] = useState();
    const [Kategory1, setKategory1] = useState();
    const [room, setNumBRooms] = useState();
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
        getAllApartment()
            .then(x => {
                const filteredApartments = x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'למכירה'&&  (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0)) // אם אין datend או אם datend קטן או שווה להיום

               );

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
// פונקציה שעוברת על דירה ובודקת אם היא עומדת בכל התנאים שסופקו
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
  
// useEffect(() => {
//   if (listApartment1 && listApartment1.length > 0) {
//     console.log(numRooms,"num")
//   debugger
//     const f1 = listApartment1.filter(item =>{    
//       const isnumRoomsMatch =
//     floor&&price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
//       price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
// floor&&      squermeter&&numRooms&&minRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
//       squermeter&&numRooms&&minRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
// floor&&      price&&minprice&&numRooms&&minRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
//       price&&minprice&&numRooms&&minRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
// floor&&      numRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
//       numRooms&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
// floor&&      price&&minprice&&squermeter&&minsquermeter&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
//       price&&minprice&&squermeter&&minsquermeter&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
// floor&&      squermeter&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
//       squermeter&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
// floor&&      price&&minprice&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
//       price&&minprice&&city!=''&& neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
// floor&&      city!=''&& neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
//       city!=''&& neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.minRooms)>=parseInt(minRooms)&&item.street===street && item.city ===city&& item.neighbourhood===neighbourhood:
//  floor&&     price&&minprice&&squermeter&&minsquermeter&&neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street &&  item.neighbourhood===neighbourhood:
//       price&&minprice&&squermeter&&minsquermeter&&neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street &&  item.neighbourhood===neighbourhood:
//       floor&&squermeter&&minsquermeter&&neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street &&  item.neighbourhood===neighbourhood:
//       squermeter&&neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street &&  item.neighbourhood===neighbourhood:
//       floor&&price&&minprice&&neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street===street &&  item.neighbourhood===neighbourhood:
//       price&&minprice&&neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street===street &&  item.neighbourhood===neighbourhood:
//       floor&&neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&item.street===street &&  item.neighbourhood===neighbourhood:
//       neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&item.street===street &&  item.neighbourhood===neighbourhood:
//       floor&&price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&neighbourhood!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&  item.neighbourhood===neighbourhood:
//       price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&  item.neighbourhood===neighbourhood:
//       floor&&squermeter&&minsquermeter&&numRooms&&minRooms&&neighbourhood!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&  item.neighbourhood===neighbourhood:
//       squermeter&&numRooms&&minRooms&&neighbourhood!=''&& street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&  item.neighbourhood===neighbourhood:
//       floor&&price&&minprice&&numRooms&&minRooms&&neighbourhood!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&  item.neighbourhood===neighbourhood:
//       price&&minprice&&numRooms&&minRooms&&neighbourhood!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&  item.neighbourhood===neighbourhood:
//       floor&&numRooms&&minRooms&&neighbourhood!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&  item.neighbourhood===neighbourhood:
//       numRooms&&neighbourhood!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&item.street===street &&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&  item.neighbourhood===neighbourhood:
//       floor&&price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&neighbourhood!=''&& city!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&neighbourhood!=''&& city!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       floor&&squermeter&&minsquermeter&&numRooms&&minRooms&&neighbourhood!=''&& city!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       squermeter&&numRooms&&minRooms&&neighbourhood!=''&& city!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       floor&&price&&minprice&&numRooms&&minRooms&&neighbourhood!=''&& city!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       price&&minprice&&numRooms&&minRooms&&neighbourhood!=''&& city!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       floor&&numRooms&&minRooms&&neighbourhood!=''&& city!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       numRooms&&neighbourhood!=''&& city!=''?parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       floor&&price&&minprice&&squermeter&&minsquermeter&&neighbourhood!=''&& city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       price&&minprice&&squermeter&&minsquermeter&&neighbourhood!=''&& city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       floor&&squermeter&&minsquermeter&&neighbourhood!=''&& city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       squermeter&&neighbourhood!=''&& city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       floor&&price&&minprice&&neighbourhood!=''&& city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       price&&minprice&&neighbourhood!=''&& city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       floor&&neighbourhood!=''&& city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       neighbourhood!=''&& city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&item.city ===city&& item.neighbourhood===neighbourhood:
//       floor&&price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&city!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city:
//       price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&city!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city:
//       floor&&squermeter&&minsquermeter&&numRooms&&minRooms&&city!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city:
//       squermeter&&numRooms&&minRooms&&city!=''&& street!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city:
//       floor&&price&&minprice&&numRooms&&minRooms&&city!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city:
//       price&&minprice&&numRooms&&minRooms&&city!=''&& street!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city:
//       floor&&numRooms&&minRooms&&city!=''&& street!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city:
//       numRooms&&city!=''&& street!=''?parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.street===street && item.city ===city:
//       floor&&price&&minprice&&squermeter&&minsquermeter&&city!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street && item.city ===city:
//       price&&minprice&&squermeter&&minsquermeter&&city!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street && item.city ===city:
//       floor&&squermeter&&minsquermeter&&city!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street && item.city ===city:
//       squermeter&&city!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street===street && item.city ===city:
//       floor&&price&&minprice&&city!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street===street && item.city ===city:
//       price&&minprice&&city!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street===street && item.city ===city:
//       floor&&city!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&item.street===street && item.city ===city:
//       city!=''&& street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&item.street===street && item.city ===city:
//       floor&&price&&minprice&&squermeter&&minsquermeter&&neighbourhood!=''&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       price&&minprice&&squermeter&&minsquermeter&&neighbourhood!=''&&numRooms&&minRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&squermeter&&minsquermeter&&neighbourhood!=''&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       squermeter&&neighbourhood!=''&&numRooms&&minRooms?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&price&&minprice&&neighbourhood!=''&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       price&&minprice&&neighbourhood!=''&&numRooms&&minRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&neighbourhood!=''&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       neighbourhood!=''&&numRooms&&minRooms?item.neighbourhood ===neighbourhood&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&price&&minprice&&squermeter&&minsquermeter&&neighbourhood!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.neighbourhood ===neighbourhood:
//       price&&minprice&&squermeter&&minsquermeter&&neighbourhood!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.neighbourhood ===neighbourhood:
//       floor&&squermeter&&minsquermeter&&neighbourhood!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.neighbourhood ===neighbourhood:
//       squermeter&&neighbourhood!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.neighbourhood ===neighbourhood:
//       floor&&price&&minprice&&neighbourhood!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.neighbourhood ===neighbourhood:
//       price&&minprice&&neighbourhood!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.neighbourhood ===neighbourhood:
//       floor&&neighbourhood!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&item.neighbourhood ===neighbourhood:
//       neighbourhood!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&item.neighbourhood ===neighbourhood:
//       floor&&price&&minprice&&squermeter&&minsquermeter&&street!=''&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       price&&minprice&&squermeter&&minsquermeter&&street!=''&&numRooms&&minRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&squermeter&&minsquermeter&&street!=''&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       squermeter&&street!=''&&numRooms&&minRooms?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&price&&minprice&&street!=''&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       price&&minprice&&street!=''&&numRooms&&minRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&street!=''&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       street!=''&&numRooms&&minRooms?item.street ===street&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&price&&minprice&&squermeter&&minsquermeter&&street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street ===street:
//       price&&minprice&&squermeter&&minsquermeter&&street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street ===street:
//       floor&&squermeter&&minsquermeter&&street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street ===street:
//       squermeter&&street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.street ===street:
//       floor&&price&&minprice&&street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street ===street:
//       price&&minprice&&street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.street ===street:
//       floor&&street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&item.street ===street:
//       street!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&item.street ===street:
//       floor&&price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&city!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city:
//       price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms&&city!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city:
//       floor&&squermeter&&minsquermeter&&numRooms&&minRooms&&city!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city:
//       squermeter&&numRooms&&minRooms&&city!=''?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city:
//       floor&&price&&minprice&&numRooms&&minRooms&&city!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city:
//       price&&minprice&&numRooms&&minRooms&&city!=''?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city:
//       floor&&numRooms&&minRooms&&city!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city:
//       numRooms&&city!=''?parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&item.city ===city:
//       floor&&price&&minprice&&squermeter&&minsquermeter&&city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.city ===city:
//       price&&minprice&&squermeter&&minsquermeter&&city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.city ===city:
//       floor&&squermeter&&minsquermeter&&city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.city ===city:
//       squermeter&&city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&item.city ===city:
//       floor&&price&&minprice&&city!=''?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.city ===city:
//       price&&minprice&&city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&item.city ===city:
//       floor&&city!=''?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&item.city ===city:
//       city!=''?item.city ===city&&parseInt(item.minRooms)>=parseInt(minRooms):
//       floor&&price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       price&&minprice&&squermeter&&minsquermeter&&numRooms&&minRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&squermeter&&minsquermeter&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       squermeter&&numRooms&&minRooms?parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&price&&minprice&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       price&&minprice&&numRooms&&minRooms?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&numRooms&&minRooms?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       numRooms?parseInt(item.numRooms) <=parseInt(numRooms)&&parseInt(item.numRooms) >=parseInt(minRooms):
//       floor&&price&&minprice&&squermeter&&minsquermeter?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter):
//       price&&minprice&&squermeter&&minsquermeter?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter):
//       floor&&squermeter&&minsquermeter?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter):
//       squermeter?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.squareMeter) <=parseInt(squermeter)&&parseInt(item.squareMeter) >=parseInt(minsquermeter):
//       floor&&price?parseInt(item.minRooms)>=parseInt(minRooms)&&parseInt(item.floor) <=parseInt(floor)&&parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice):
//       price?parseInt(item.price) <=parseInt(price)&&parseInt(item.price)>=parseInt(minprice)&&parseInt(item.minRooms)>=parseInt(minRooms):
//       floor?parseInt(item.floor) <=parseInt(floor)&&parseInt(item.minRooms)>=parseInt(minRooms):
//       minRooms?parseInt(item.minRooms)>=parseInt(minRooms)
// :true;
//       console.log(numRooms,item.numRooms,isnumRoomsMatch)
//       return isnumRoomsMatch;
//     } );
//     setList(f1);} // עדכון הרשימה המסוננת
// }, [numRooms,street,neighbourhood,city,squermeter,minsquermeter,price,minprice,minRooms,floor]);
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
