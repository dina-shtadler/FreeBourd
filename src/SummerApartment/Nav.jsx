import './Style.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Nav = () => {
   
    return <>
    
        <div className={'nav'}>
            <NavLink to='Home' className={'link'} >Home</NavLink>
            <NavLink to='apartmentForSale' className={'link'}>למכירה</NavLink>
            <NavLink to='apartmentForRent' className={'link'}>להשכרה</NavLink>
            {/* <NavLink to='Apartments' className={'link'}>כל הדירות במאגר</NavLink> */}
      </div>
</>
}