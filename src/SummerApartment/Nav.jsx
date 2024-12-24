import './Style.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Nav = () => {
   
    return <>
    
        <div className={'nav'}>
            <NavLink to='Home' className={'link'} >Home</NavLink>
            <NavLink to='Client' className={'link'}>Client</NavLink>
            <NavLink to='Publisher' className={'link'}>Publisher</NavLink>
            <NavLink to='Apartments' className={'link'}>Apartments</NavLink>
      </div>
</>
}