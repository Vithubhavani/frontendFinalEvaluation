import styles from './Form.module.css'
import emIm from '../assets/icon.png'
import lock from '../assets/lock.png'
import person from '../assets/person.png'
import { Link } from 'react-router-dom'

export default function Form({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  submitHandle
}) 
{
  return (
    <div className={styles.container}>
      <p className={styles.head}>Register</p>
      <div className={styles.in1Container}>
        <div>
      <input type="text"
      value={name}
      placeholder="Name" 
      className={styles.name}
      onChange={(e) => setName(e.target.value)}/>
      <img src={person} alt="" className={styles.icon}/>
      </div>
      <div className={styles.error}>
      {error?.name&&<p style={{fontSize:'15px',color:"red"}}>Name is required</p>}
      </div>
      </div>
    <div className={styles.inputContainer}>
      <div>
      <input type="email"
      value={email}
      placeholder="Email"
      className={styles.email}
      onChange={(e) => setEmail(e.target.value)}/>
      <img src={emIm} alt="" className={styles.icon}/>
      </div>
      <div className={styles.error}>
      {error?.email && <p style={{fontSize:'15px',color:"red"}}>Enter valid email address</p>}
      </div>
      </div>
      <div className={styles.in2Container}>
        <div>
      <input type="text"
      value={password}
      placeholder="Password"
      className={styles.pass}
      onChange={(e) => setPassword(e.target.value)} />
       <img src={lock} alt="" className={styles.icon}/>
       </div>

       <div className={styles.error}>
      {error?.password.lengths && <p style={{fontSize:'15px',color:"red"}}>Password must be atleast 8 characters long </p>}
      {error?.password.specialChar && <p style={{fontSize:'15px',color:"red"}}>Password must contain atleast one special character</p>}
      {error?.password. Upppercases && <p style={{fontSize:'15px',color:"red"}}>Password must contain atleast one uppercase character</p>}
     </div>
     </div>
     <div className={styles.in3Container}>
      <div>
      <input type="text"
      value={confirmPassword}
      placeholder="Confirm Password"
      className={styles.conpass}
      onChange={(e) => setConfirmPassword(e.target.value)} />
       <img src={lock} alt="" className={styles.icon}/>
       </div>
       <div className={styles.error}>
      {error?.confirmPassword &&<p style={{fontSize:'15px',color:"red"}}>Password do not match</p>}
      </div>
      </div>

      <button onClick={submitHandle} className={styles.register}>Register</button>
      <p className={styles.q}>Have an account?</p>
      <Link to={'/'} className={styles.log}>Login</Link>
    </div>
  )
}
