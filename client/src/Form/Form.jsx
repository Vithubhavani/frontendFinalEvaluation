

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
    <div>
      <input type="text"
      value={name}
      placeholder="Name" 
      onChange={(e) => setName(e.target.value)}/>

      {error?.name&&<p>Name is required</p>}

      <input type="email"
      value={email}
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}/>
      {error?.email && <p>Enter valid email address</p>}

      <input type="text"
      value={password}
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)} />
      {error?.password.lengths && <p>Password must be atleast 8 characters long </p>}
      {error?.password.specialChar && <p>Password must contain atleast one special character</p>}
      {error?.password. Upppercases && <p>Password must contain atleast one uppercase character</p>}

      <input type="text"
      value={confirmPassword}
      placeholder="Confirm Password"
      onChange={(e) => setConfirmPassword(e.target.value)} />
      {error?.confirmPassword &&<p>Password do not match</p>}



      <button onClick={submitHandle}>Register</button>
    </div>
  )
}
