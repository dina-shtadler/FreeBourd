import { useEffect, useState } from "react"
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { loginp, registerP } from "./api"
import { NavLink } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'; // דוגמה לשימוש באייקון של ספינר
import { Helmet } from 'react-helmet'; // ייבוא של React Helmet

// import { addUser1 } from "./api"
import './Style.css'
import swal from "sweetalert"
import { Nav } from "./Nav"
export const Register = () => {
  debugger
  // התחברות
  //   const dispatch = useDispatch()
  // const list = registerP()
  // const Nav=useNavigate()
  //  var x='0'
   const [register, setList] = useState()
   const [login, setlogin] = useState()
   const [loading, setLoading] = useState(false); // מצב הטעינה

  const send = (event) => {
    event.preventDefault()
    setLoading(true); // מכניסים את הכפתור למצב טעינה

    const Publisher =  {
      phone: event.target[0].value,
      secondPhone: event.target[1].value,
            email: event.target[2].value,
         password: event.target[3].value
    }
    registerP(Publisher) 
    .then(x => {
     console.log(x.data);
     setList(x)
     if (x.data.message=='Welcome to our application!'){
      setlogin(Publisher)
     swal( `🤭🤭🤭 נרשמת בהצלחה!, ברוך הבא`);
     Nav('/addApartments')
//  
}
    else if(x.response.data.message==`Email already exists!`)
    swal( `🤭🤭🤭 האמייל כבר קיים במערכת!`);
  })
  .catch(err => {
      console.log(err);
      swal(err.response.data.message)
  })

 
}

    return <>
       <Helmet>
                <meta name="description" content=" דף הרשמה למפרסמים של האתר סרסור= המתווך, שבו ניתן לחפש ולפרסם דירות למכירה ולהשכרה מיעד בעיקר לציבור החרדי השימוש באתר הוא חינמי...." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charset="UTF-8" />
                <title>הרשמה למפרסמים-סרסור/המתווך</title>
            </Helmet>
                 <div className="login-container">

      <h2 className="login-title">הרשמה לפירסום דירות</h2>

   <form className="login-form"  onSubmit={(e) => send(e)} >
  <div class="input-container">
    <input           className="form-input"
 type="text" placeholder="טלפון" name="usrfone" required></input>
  </div>
  <div class="input-container">
    <input           className="form-input"
 type="text" placeholder="טלפון נוסף" name="usrEnotherFone" required></input>
  </div>
  <div class="input-container">
    <input           className="form-input"
 type="email" placeholder="כתובת מייל" name="email" required></input>
  </div>

  <div class="input-container">
    <input           className="form-input"
 type="password" placeholder="סיסמא" name="psw" required></input>
  </div>

      <button type="submit" className="form-input input-container btEn" disabled={loading}>   {loading ? <FaSpinner className="spinner" /> : 'הרשמה'}</button>
  
</form >
 </div>  
    </>
  }

