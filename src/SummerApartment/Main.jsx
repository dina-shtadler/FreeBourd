import { Apartments } from "./apartments"
import { Home } from "./home"
import { HashRouter } from 'react-router-dom';

// import { BrowserRouter } from "react-router-dom";
import { Nav } from "./Nav";
 import { Routing } from "./Routing";
import { AllApartments } from "./screens/allApartments";
export const Main = () => {
    return <>

    <HashRouter >
{/* nav טוענת את ה */}
<Nav >
</Nav>
{/* <AllApartments></AllApartments> */}
{/* <Home></Home> */}
{/* טוענת את כל הצהרות הניתובים */}
<Routing  ></Routing>
</HashRouter>
    </>
}