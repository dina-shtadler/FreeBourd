import { Outlet } from 'react-router-dom';
import './apartment.css';
import { useEffect, useState } from "react";
import { getAllApartment, getAllKategorys, removeApartment, getAllByKodKategory, loginp } from "./api";
import swal from 'sweetalert';
import { FaPrint, FaShareSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
    const [minRooms, setMinRooms] = useState(0);
    const [squermeter, setsquermeter] = useState(9999999999999999999999);
    const [minsquermeter, setminsquermeter] = useState(0);
    const [price, setPrice] = useState(99999999999999999999999999999999999999);
    const [minprice, setminPrice] = useState();
    const [floor, setFloor] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // ניהול סטטוס הכניסה של המשתמש

    const [currentPage, setCurrentPage] = useState(1); // דף נוכחי
    const [itemsPerPage] = useState(10); // מספר הדירות שמופיעות לכל דף

    // Fetch apartments and categories
    useEffect(() => {
        getAllApartment()
            .then(x => {
                const filteredApartments = x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'למכירה' && (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
                setList(filteredApartments);
                setList1(filteredApartments);
                console.log("listApartment", x.data.apartmens);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const apartmentMatchesFilters = (apartment) => {
        if (city && apartment.city.trim().toLowerCase() !== city.trim().toLowerCase()) {
            return false;
        }
        if (neighbourhood && apartment.neighbourhood.trim().toLowerCase() !== neighbourhood.trim().toLowerCase()) {
            return false;
        }
        if (street && apartment.street.trim().toLowerCase() !== street.trim().toLowerCase()) {
            return false;
        }

        if (numRooms && Number(apartment.numRooms) > Number(numRooms)) {
            return false;
        }
        if (minRooms && Number(apartment.numRooms) < Number(minRooms)) {
            return false;
        }

        if (squermeter && Number(apartment.squareMeter) > Number(squermeter)) {
            return false;
        }
        if (minsquermeter && Number(apartment.squareMeter) < Number(minsquermeter)) {
            return false;
        }

        if (price && Number(apartment.price) > Number(price)) {
            return false;
        }
        if (minprice && Number(apartment.price) < Number(minprice)) {
            return false;
        }

        if (floor && Number(apartment.floor) > Number(floor)) {
            return false;
        }

        return true;
    };

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

    const personalArea = () => {
        if (!isLoggedIn) {
            Nav('/private'); // אם המשתמש לא מחובר, שלח אותו לדף ההתחברות
        } else {
            Nav('/personal-area'); // אם הוא מחובר, שלח אותו לאזור האישי
        }
    };

    // חישוב הדירות להציג לפי הדף הנוכחי
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listApartment.slice(indexOfFirstItem, indexOfLastItem);

    // שינוי דף
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <button className="personal-area-button" onClick={personalArea}>אזור אישי למפרסמים</button>

            <div className="filters">
                <input type="text" placeholder="עיר " onBlur={(e) => setcity(e.target.value)} />
                <input type="text" placeholder="שכונה " onBlur={(e) => setneighbourhood(e.target.value)} />
                <input type="text" placeholder="רחוב " onBlur={(e) => setstreet(e.target.value)} />
                <input type="Number" placeholder="(מס' חדרים (מקסימום" onBlur={(e) => setnumRooms(e.target.value)} />
                <input type="Number" placeholder="מס' חדרים (מינימום)" onBlur={(e) => setMinRooms(e.target.value)} />
                <input type="Number" placeholder="מ'ר לדירה (מקסימום)" onBlur={(e) => setsquermeter(e.target.value)} />
                <input type="Number" placeholder="מ'ר לדירה (מינימום)" onBlur={(e) => setminsquermeter(e.target.value)} />
                <input type="Number" placeholder="מחיר (מקסימום)" onBlur={(e) => setPrice(e.target.value)} />
                <input type="Number" placeholder="מחיר (מינימום)" onBlur={(e) => setminPrice(e.target.value)} />
                <input type="Number" placeholder=" מס' קומה" onBlur={(e) => setFloor(e.target.value)} />
            </div>

            <button onClick={handlePrintAll}>הדפס את הכל</button>

            <div className="table-container">
                <div className="table-wrapper">
                    <div className="scroll-inner"></div>
                    {/* <div className="table-scroll"> */}
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
                                    <th>pdfהדפסה ו</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((x) => (
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
                        </table>
                    {/* </div> */}
                </div>
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(listApartment.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};
