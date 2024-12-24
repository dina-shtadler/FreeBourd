import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { registerP, registerc } from "./api"
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from "react"

// import { addUser1 } from "./api"
import './Style.css'
import swal from "sweetalert"
export const RegisterC = () => {
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
  
      const Client =  {
      
              email: event.target[0].value,
           password: event.target[1].value
      }
      registerc(Client) 
      .then(x => {
        console.log(x.data);
       setList(x)
       if (register.data.message=='welcome to our application!'){
        setlogin(Client)
       swal( `🤭🤭🤭 success`);
  //  
  }
      else if(register.data.message==`email has been exists already!`)
      swal( `🤭🤭🤭 email has been exists already!`);
    })
    .catch(err => {
        console.log(err);
    })}
  
    return <>
      <h2>Register Client</h2>

   <form className='form'  onSubmit={(e) => send(e)} >
    {/*  */}
  
  <div class="input-container">
    <i class="fa fa-envelope icon"></i>
    <input class="input-field" type="email" placeholder="Email" name="email" required></input>
  </div>

  <div class="input-container">
    <i class="fa fa-key icon"></i>
    <input class="input-field" type="password" placeholder="Password" name="psw" required></input>
  </div>

  <button type="submit" class="btn" >Register</button>
  
</form >
   
    </>
}

