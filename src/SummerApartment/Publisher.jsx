import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import { useDispatch } from 'react-redux'
import './Style.css'
import { loginp } from './api'
import { useEffect, useState } from "react"
import { FaSpinner } from 'react-icons/fa'; // דוגמה לשימוש באייקון של ספינר
import { Helmet } from 'react-helmet'; // ייבוא של React Helmet

// import { addUser1 } from "./api"
export const Publisher = () => {
    const [login, setlogin] = useState()
 const [email, setEmail] = useState('');
 const [loading, setLoading] = useState(false); // מצב הטעינה

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const Nav=useNavigate()
    const send = (event) => {
        event.preventDefault()
        setLoading(true); // מכניסים את הכפתור למצב טעינה

        const Publisher =  {
          
            email: event.target[0].value,
             password: event.target[1].value
        }
        console.log(    Publisher)
        loginp(Publisher.email,Publisher.password) 
        .then(x => {
          console.log("א",x.data);
         setlogin(x)
         if (x.data.message=='Login successful!'){
            localStorage.setItem(`user`,x.data.publisher._id)
            localStorage.setItem(`userEmail`,x.data.publisher.email)
                        localStorage.setItem(`token`,x.data.token)

         swal( `🤭🤭🤭 התחברת בהצלחה`);
         Nav('/addApartments')
    //  
    }
   
        else if(x.data.message==`email has been exists already!`)
        swal( `🤭🤭🤭 האמייל כבר קיים במערכת!`);
        // alert(x)
      })
      .catch(err => {
          console.log(err);
          swal(err.response.data.message)
          if(err.response.data.message=='Email not found!')
            Nav('/Register')

      })
  
}
const register=()=>{
    Nav('/Register')}


    return <>
       <Helmet>
                <meta name="description" content=" דף הבית של האתר, שבו ניתן לחפש ולפרסם דירות למכירה ולהשכרה מיעד בעיקר לציבור החרדי השימוש באתר הוא חינמי...." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charset="UTF-8" />
                <title>התחברות להוספת דירה-סרסור/המתווך</title>
            </Helmet>
      <h2>התחברות למפרסמים</h2> 


             <div className="login-container">
                 <button className='ToRegister' onClick={()=>register()}>להרשמה</button>
<h2 className="login-title">התחברות</h2>
    <form onSubmit={send} className="login-form">
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

    </>
}