import "./design.css"
import { useNavigate } from 'react-router-dom';

export const Home = () => {
        const Nav = useNavigate();

    const addApartment = () => {
        // localStorage.setItem('thisApartment', JSON.stringify(a));
        Nav('/addApartments');
    };
    const apartmentForsale = () => {
        // localStorage.setItem('thisApartment', JSON.stringify(a));
        Nav('/apartmentForSale');
    };
    const apartmentForRent = () => {
        // localStorage.setItem('thisApartment', JSON.stringify(a));
        Nav('/apartmentForRent');
    };

    return<>
    
   <div className="home-container">
      <div className="left-side">
        <div   className="building-image" />
      </div>
      <div className="right-side">
        <button className="search-button" onClick={apartmentForsale}>לחיפוש דירה למכירה</button>
        <button className="search-button" onClick={apartmentForRent}>לחיפוש דירה להשכרה</button>
        <button className="add-button" onClick={addApartment}>הוספת דירה למאגר</button>
      </div>
    </div>
    
    </>
}
