import { Route, Routes } from 'react-router-dom'


import { AddApartments } from './addApartment'
import { Apartments } from "./apartments"
import { Home } from "./home"
import { Publisher } from "./Publisher"
import { Login } from "./Login"
import { Register } from './Register'
import { RegisterC } from './RegisterC'
import { Client } from './Client'
import { UpdateApartment } from './UpdateApartment'
import { ApartmentForsale } from './apartmentForSale'
import { ApartmentForRent } from './apartmentsForRent'
export const Routing = () => {
    return <>

        <Routes>
            {/* הצהרות הניתובים */}
           
            <Route path={'/'} element={<Home></Home>}></Route>


            <Route path={'Home'} element={<Home></Home>}></Route>
            <Route path={'Publisher'} element={<Publisher></Publisher>}></Route>
            <Route path={'Client'} element={<Client></Client>}></Route>
            <Route path={'Register'} element={<Register></Register>}></Route>
            <Route path={'RegisterC'} element={<RegisterC></RegisterC>}></Route>

            <Route path={'Apartments'} element={<Apartments></Apartments>}></Route> 
            <Route path={'addApartments'} element={<AddApartments></AddApartments>}></Route>
            <Route path={'UpdateApartment'} element={<UpdateApartment></UpdateApartment>}></Route>
            <Route path={'apartmentForsale'} element={<ApartmentForsale></ApartmentForsale>}></Route>
            <Route path={'apartmentForRent'} element={<ApartmentForRent></ApartmentForRent>}></Route>

            <Route path={'Login'} element={<Login></Login>}></Route>
            </Routes>
          
   
    </>
}

