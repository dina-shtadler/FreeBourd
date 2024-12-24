import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import { useDispatch } from 'react-redux'
import './Style.css'
import { Login } from './Login'
import { loginp } from './api'
import { useEffect, useState } from "react"

// import { addUser1 } from "./api"
export const Publisher = () => {
    const [login, setlogin] = useState()

    const Nav=useNavigate()
    const send = (event) => {
        event.preventDefault()

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

         swal( `🤭🤭🤭 success`);
    //  
    }
   
        else if(x.data.message==`email has been exists already!`)
        swal( `🤭🤭🤭 email has been exists already!`);
        // alert(x)
      })
      .catch(err => {
          console.log(err);
      })
    
//   const dispatch = useDispatch()
//   const list = useSelector(x => x.users)
//   const manager = useSelector(x => x.manager)
//   const Nav=useNavigate()
// //  קומפוננתת התחברות (אם נימצא במאגר ) ואם זה מנהל מזהה בתור מנהל ואז התנאי בניתובים מתקיים ומוסיף את הקישורים הנוספים
// // אם לא קיים במאגר מעביר להתחברות 
// // אחרת מכניס אותו למשתמש הנוכחי בסטור
//   const send = (event) => {
//     var x='0'
//     event.preventDefault()
//     const user =  {
//           email: event.target[0].value,
//        password: event.target[1].value,
//   }
//   if(user.email==manager.email&&user.password==manager.password){
//     dispatch(addUser1(manager))
//     swal(`שלום ${manager.FirstName}!`, "ברוך הבא👍👍👍")
//     Nav('/Home')
//   }
//   else{
//     for (let index = 0; index < list.length; index++) {
//       if( list[index].password==user.password&&list[index].email==user.email){
//         dispatch(addUser1(list[index]))
// swal(`שלום ${list[index].FirstName}!`, "ברוך הבא👍👍👍", "success")
// Nav('/Home')
// x='1'}
//   }
//   if(x!='1'){
// Nav('/Register')}
// }
}
const register=()=>{
    Nav('/Register')}


    return <>
      <h2>login Publisher</h2> 

             <button className='ToRegister' onClick={()=>register()}>להרשמה</button>

    <form action="./Home" className='form'  onSubmit={(e) => send(e)}>

        {/* */}
  
  <div class="input-container">
    <i class="fa fa-envelope icon"></i>
    <input class="input-field" type="email" placeholder="Email" name="email" required></input>
  </div>

  <div class="input-container">
    <i class="fa fa-key icon"></i>
    <input class="input-field" type="password" placeholder="Password" name="psw" required></input>
  </div>

  <button type="submit" className="btn">login</button>
</form>
   
    </>
}