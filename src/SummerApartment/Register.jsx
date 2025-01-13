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

  // loginp(Publisher.email,Publisher.password)
  //     .then()
  //   .catch(err => {
  //     console.log(err);
  // })
}
//     for (let index = 0; index < list.length; index++) {
//       if( list[index].password==Publisher.password&&list[index].email==Publisher.email)
//     {swal( `🤭🤭🤭 כבר קיים במאגר`);
//     x='1'
//      Nav('/Home')
//     break
//     }}
//      if(x!='1'){
    
//     dispatch(registerP(user))
//     // dispatch(addUser1(user))
//     // AddUser(user)
//     //     .then(x => {
//     //         //x.data - יכיל את מה שחזר מהשרת

//     //     })
//     swal(`שלום ${user.FirstName}!`, "😉😃😜נרשמת בהצלחה למערכת", "success")
     
     
//     Nav('/Home')
// }   }
    return <>
      <h2>Register Publisher</h2>

   <form className='form'  onSubmit={(e) => send(e)} >
  <div class="input-container">
    <i class="fa fa-user icon"></i>
    <input class="input-field" type="text" placeholder="UserFone" name="usrfone" required></input>
  </div>
  <div class="input-container">
    <i class="fa fa-user icon"></i>
    <input class="input-field" type="text" placeholder="UserEnotherFone" name="usrEnotherFone" required></input>
  </div>
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

