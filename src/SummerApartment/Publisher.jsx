import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import { useDispatch } from 'react-redux'
import './Style.css'
import { Login } from './Login'
import { loginp } from './api'
import { useEffect, useState } from "react"
import { FaSpinner } from 'react-icons/fa'; // דוגמה לשימוש באייקון של ספינר

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