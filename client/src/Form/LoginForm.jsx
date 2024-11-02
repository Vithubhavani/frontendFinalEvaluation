import styles from './LoginForm.module.css'
import emIm from '../assets/icon.png'
import lock from '../assets/lock.png'
import { Link } from 'react-router-dom'

export default function Form({
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    submitHandle
  }) 
  {
    return (
      <div className={styles.container}>
      <p className={styles.head}>Login</p>
      <div className={styles.inputContainer}>
        <div>
        <input type="email"
        value={email}
        placeholder="Email"
       className={styles.email}
        onChange={(e) => setEmail(e.target.value)}/>
         <img src={emIm} alt="" className={styles.icon}/>
         </div>
         <div>
        {error?.email && <p style={{fontSize:'15px',color:"red"}}>Email Required</p>}
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
                <div>
        {error?.password && <p style={{fontSize:'15px',color:"red"}}>Password required </p>}
        </div>
        </div>
        <button onClick={submitHandle} className={styles.log}>Login</button>
        <p className={styles.q}>Have no account yet?</p>
        <Link to={'/register'} className={styles.reg}>Register</Link>
      
      </div>
    )
  }
  