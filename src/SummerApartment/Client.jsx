import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import { useDispatch } from 'react-redux'
import './Style.css'
import { loginc } from './api'
import { useEffect, useState } from "react"

// import { addUser1 } from "./api"
export const Client = () => {
    const Nav=useNavigate()

    const [login, setlogin] = useState()

    const send = (event) => {
        event.preventDefault()

        const Client =  {
          
            email: event.target[0].value,
             password: event.target[1].value
        }
        console.log(    Client)
        loginc(Client.email,Client.password) 
        .then(x => {
          console.log(x.data);
         setlogin(x)
         if (login.data.message=='login successfuly!'){
            localStorage.setItem(`client`,x.data.clients[0]._id)
                        localStorage.setItem(`token`,x.data.token)

         swal( `🤭🤭🤭 success`);
    //  
    }
        else if(login.data.message==`email has been exists already!`)
        swal( `🤭🤭🤭 email has been exists already!`);
      })
      .catch(err => {
          console.log(err);
      })}
const register=()=>{
    Nav('/RegisterC')}


    return <>
      <h2>login Client</h2> 

             <button className='ToRegister' onClick={(e)=>register(e)}>להרשמה</button>

    <form action="./Home" className='form' onSubmit={(e) => send(e)}>

        {/*  */}
  
  <div class="input-container">
    <i class="fa fa-envelope icon"></i>
    <input class="input-field" type="email" placeholder="Email" name="email" required></input>
  </div>

  <div class="input-container">
    <i class="fa fa-key icon"></i>
    <input class="input-field" type="password" placeholder="Password" name="psw" required></input>
  </div>

  <button type="submit" class="btn">login</button>
</form>
   
    </>
}