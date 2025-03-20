import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginp } from './api'
import './Private.css';
import { useEffect } from "react";
  import { getAllApartment, } from "./api";
  import swal from 'sweetalert'
  import { FaSpinner } from 'react-icons/fa'; // דוגמה לשימוש באייקון של ספינר

export const Private =() =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false); // מצב הטעינה

  const [listApartment, setList] = useState();

  useEffect(() => {
    getAllApartment()
        .then(x => {
            const filteredApartments = x.data.apartmens.filter(item => item.kodPublisher[0]?.email === localStorage.getItem('userEmail')) 
        

        setList(filteredApartments);
                        console.log("listApartment",filteredApartments);
        })
        .catch(err => {
            console.log(err);
        });
}, []);
  // פונקציה של התחברות
  const login = async () => {
    setLoading(true); // מכניסים את הכפתור למצב טעינה

    loginp(email,password) 
    .then(x => {
      console.log("א",x.data);
    //  setlogin(x)
     if (x.data.message=='Login successful!'){
        localStorage.setItem(`user`,x.data.publisher._id)
        localStorage.setItem(`userEmail`,x.data.publisher.email)
                    localStorage.setItem(`token`,x.data.token)

     swal( `🤭🤭🤭 התחברת בהצלחה`);
     Nav('/personal-area',{ state: { listApartment } });
  
}

    else if(x.data.message==`email has been exists already!`)
    swal( `🤭🤭🤭 האמייל כבר קיים במערכת! סיסמא שגויה`);
    setLoading(false)

    // alert(x)
  })
  .catch(err => {
      console.log(err);
      swal(err.response.data.message)
   setLoading(false)
  })}

  return (
    <div className="login-container">
    <h2 className="login-title">התחברות</h2>
    <form onSubmit={login} className="login-form">
      <div className="form-group">
        <label htmlFor="email">מייל:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">סיסמה:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="form-input input-container btEn" disabled={loading}>   {loading ? <FaSpinner className="spinner" /> : 'התחבר'}</button>
    </form>
  </div>
);}