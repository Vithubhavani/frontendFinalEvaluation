
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
      <div>
     
  
        <input type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}/>
        {error?.email && <p>Email Required</p>}
  
        <input type="text"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />
        {error?.password && <p>Password required </p>}
    
  
   
  
  
  
        <button onClick={submitHandle}>Login</button>
      </div>
    )
  }
  