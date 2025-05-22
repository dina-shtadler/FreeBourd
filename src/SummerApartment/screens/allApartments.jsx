import './allApartment.css'
import { FaPrint, FaShareSquare } from 'react-icons/fa';
import { useEffect, useState } from "react";

import { getAllApartment, getAllKategorys, removeApartment, getAllByKodKategory } from "../api";
import EmailIcon from '../icons/Email';
import OpenCloseIcon from '../icons/openClose';
import ApartmentRow from './ApartmentRow';
import LookFor from '../icons/lookFor';
export const AllApartments = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [listApartment, setList] = useState();
    useEffect(() => {
        getAllApartment()
            .then(x => {
                setList(x.data.apartmens);
                console.log("listApartment",x.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return(<>
  

{/* איפה תרצו לחפש? */}
<div className='title2'><div className='title2text'>איפה תרצו לחפש דירה?</div><div className='filedfilter'><div className='allIfilter'><div className='f'>
    <div className='fc'>עיר</div>
    <div className='fn'>שכונה</div>
    <div className='fr'>רחוב</div>
    <div className='fnr'>מספר חדרים</div>
    <div className='fp'>מחיר</div>
    <div className='fw'>ללא תיווך</div>
</div>    <div className='lookFor'><LookFor></LookFor> חיפוש</div></div>
</div></div>
{/* <div className='filterT'>השתמשו במסננים והתחילו לסנן...</div>
 <div className='filter'>
   <button className='f4' >עיר </button> 
   <button className='f3'>שכונה</button> 
   <button className='f2'>מספר חדרים </button> 
   <button className='f1' >מחיר </button> 
  </div> */}
  {/* <filter><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.25002 9.08334C4.25002 9.40418 4.51252 9.66668 4.83335 9.66668L7.16667 9.66669C7.4875 9.66669 7.75 9.40419 7.75 9.08336C7.75 8.76252 7.4875 8.50002 7.16667 8.50002L4.83335 8.50001C4.51252 8.50001 4.25002 8.76251 4.25002 9.08334Z" fill="#0C3058"/>
<path d="M2.5 5.00001C2.5 5.32084 2.7625 5.58334 3.08333 5.58334L8.91665 5.58336C9.23748 5.58336 9.49998 5.32086 9.49998 5.00002C9.49998 4.67919 9.23748 4.41669 8.91665 4.41669L3.08333 4.41668C2.7625 4.41668 2.5 4.67918 2.5 5.00001Z" fill="#0C3058"/>
<path d="M0.75 0.916677C0.75 1.23751 1.0125 1.50001 1.33333 1.50001L10.6666 1.50002C10.9875 1.50002 11.25 1.23752 11.25 0.916689C11.25 0.595855 10.9875 0.333355 10.6666 0.333355L1.33333 0.333344C1.0125 0.333344 0.75 0.595844 0.75 0.916677Z" fill="#0C3058"/>
</svg>
</filter>
  <h>מיין לפי</h> */}
  {/* <svg className='kav' width="1170" height="1" viewBox="0 0 1170 1" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1170" height="1" fill="#B5C7E2"/>
</svg> */}
  
<input className='checkbox' type='checkbox'/>  
<div className='icons'> <FaShareSquare/>
<EmailIcon></EmailIcon>
 <FaPrint/> 
    </div> 
    

    {/* //טבלה */}
    <table dir="rtl">
      <thead>
        <tr>
          <th className='tcheckbox'><input type='checkbox' /></th>
          <th className='t'>עיר</th>
          <th className='t'>שכונה</th>
          <th className='t'>(מ"ר) דירה שטח</th>
          <th className='t'>מספר חדרים</th>
          <th className='t'>מרפסת</th>
          <th className='t'>מחיר</th>
          <th className='thempty'></th>
        </tr>
      </thead>
      <tbody>
        {listApartment && listApartment.map(apartment => (
          <ApartmentRow key={apartment._id} apartment={apartment} />
        ))}
      </tbody>
    </table>  
    </>)
}
