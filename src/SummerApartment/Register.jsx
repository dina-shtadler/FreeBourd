import { useEffect, useState } from "react"
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { loginp, registerP } from "./api"
import { NavLink } from 'react-router-dom'

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

  const send = (event) => {
    event.preventDefault()

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
     swal( `🤭🤭🤭 success`);
     Nav('/addApartments')
//  
}
    else if(x.response.data.message==`Email already exists!`)
    swal( `🤭🤭🤭 email has been exists already!`);
  })
  .catch(err => {
      console.log(err);
      swal(err.response.data.message)
  })

 
}

    return <>
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

  <button type="submit"  className="login-button" >הרשמה</button>
  
</form >
 </div>  
    </>
  }

