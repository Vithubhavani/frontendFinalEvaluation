import { useState } from "react"
import styles from './RegisterPage.module.css'
import Form from "../Form/Form"
import ValidateForm from "../Validate/ValidateForm"
import { useNavigate } from "react-router-dom"
import { register } from "../services/services"

export default function RegisterPage() {
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[confirmPassword,setConfirmPassword]=useState('')
  const[error,setError]=useState()
  const navigate=useNavigate()

  const submitHandle=async(e)=>{
  e.preventDefault()
  const{valid,invalid}=ValidateForm(name,email,password,confirmPassword)
  if(!valid){
setError({...invalid})
return
  }

  setError(null)

  const data={
    name,
    email,
    password
  }

  try{
    const res=await register(data)
    if(res.status===201){
      console.log('Registration successful:', res.data);
      alert("Registration successful")
      navigate('/login')

    }

  }
  catch(error){
    console.error('Error during registration:', error);
     alert("Error during registration")

  }

  }


  

  return (
    <div className={styles.container}>
      <div className={styles.left}>

      </div>

      <div className={styles.right}>
     <Form
     name={name}
     setName={setName}
     email={email}
     setEmail={setEmail}
     password={password}
     setPassword={setPassword}
     confirmPassword={confirmPassword}
     setConfirmPassword={setConfirmPassword}
     error={error}
     setError={setError}
     submitHandle={submitHandle}
     />
      </div>

      
    </div>
  )
}
