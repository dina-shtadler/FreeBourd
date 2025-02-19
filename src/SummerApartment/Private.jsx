import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginp } from './api'
import './Private.css';

export const Private =() =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Nav = useNavigate();


  // פונקציה של התחברות
  const login = async () => {
 
    loginp(email,password) 
    .then(x => {
      console.log("א",x.data);
     if (x.data.message=='Login successful!'){
        localStorage.setItem(`user`,x.data.publisher._id)
        localStorage.setItem(`userEmail`,x.data.publisher.email)
                    localStorage.setItem(`token`,x.data.token)

     
      // אם התחברות הצליחה, נעבור לדף האזור האישי
      Nav('/personal-area');
    } else {
      // אם התחברות לא הצליחה, הצג הודעת שגיאה
      setError('פרטי ההתחברות לא נכונים');
    }
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
      <button type="submit" className="login-button">התחבר</button>
    </form>
  </div>
);}