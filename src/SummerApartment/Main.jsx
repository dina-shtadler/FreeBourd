import { Apartments } from "./apartments"
import { Home } from "./home"
import { BrowserRouter } from "react-router-dom";
import { Nav } from "./Nav";
 import { Routing } from "./Routing";
export const Main = () => {
    return <>

    <BrowserRouter >
{/* nav טוענת את ה */}
<Nav >
</Nav>
{/* <Home></Home> */}
{/* טוענת את כל הצהרות הניתובים */}
<Routing  ></Routing>
</BrowserRouter>
        {/* <Apartments></Apartments> */}
    </>
}