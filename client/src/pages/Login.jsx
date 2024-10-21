import { useState,useEffect } from "react"
import styles from './Login.module.css'
import LoginForm from '../Form/LoginForm'
import ValidateLogin from "../Validate/ValidateLogin"
import { useNavigate } from "react-router-dom"
import { login } from "../services/services"

export default function Login() {
  const navigate=useNavigate()

  const token = localStorage.getItem("token");
  if (token) {
      navigate("/");
  }
  
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[error,setError]=useState()

  

  const submitHandle=async(e)=>{
  e.preventDefault()
  const{valid,invalid}= ValidateLogin(email,password)
  if(!valid){
setError({...invalid})
return
  }

  setError(null)

  const data = {
    email: email,
    password: password
};

  try{
    const res=await login(data)
    if(res.status===200){
      console.log('Logged in successfully:', res.data);
      alert("Logged in successfully")
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate('/')

    }
    else{
      alert("Something went wrong");
    }

  }
  catch(e){
     if (e.response.status === 400) {
                    alert("Invalid email or password");
                }

  }

  }


  

  return (
    <div className={styles.container}>
      <div className={styles.left}>

      </div>

      <div className={styles.right}>
     <LoginForm
   
     email={email}
     setEmail={setEmail}
     password={password}
     setPassword={setPassword}
     error={error}
     setError={setError}
     submitHandle={submitHandle}
     />
      </div>

      
    </div>
  )
}

