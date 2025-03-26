import './Style.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { getAllApartment, } from "./api";

export const Nav = () => {
    const [listApartment, setList] = useState([]);
    const [listApartment1, setList1] = useState([]);
    const [listApartmentH, setList2] = useState([]);

  useEffect(() => {
    getAllApartment()
        .then(x => { 
           const filteredApartments1 = x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'להשכרה'&&  (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
           const filteredApartments = x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'למכירה' && (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
           const filteredApartments2 =  x.data.apartmens.filter(item => item.kodKategory[0]?.nameKategory === 'נופש שבתות וחגים' && (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
            setList(filteredApartments);
            setList1(filteredApartments1)
            setList2(filteredApartments2)
            console.log("listApartment", filteredApartments1);
        })
        .catch(err => {
            console.log(err);
        });
}, []);
    return <>
    
        <div className={'nav'}>
            <NavLink to='Home' className={'link'} >עמוד-הבית</NavLink>
            <NavLink to='apartmentForSale' className={'link'}  state={{ listApartment}}>למכירה</NavLink>
            <NavLink to='apartmentForRent' className={'link'}  state={{ listApartment1 }}>להשכרה</NavLink>
            <NavLink to='apartmentHoliday' className={'link'}  state={{ listApartmentH}}>נופש שבתות וחגים</NavLink>
            {/* <NavLink to='Apartments' className={'link'}>כל הדירות במאגר</NavLink> */}
      </div>
</>
}