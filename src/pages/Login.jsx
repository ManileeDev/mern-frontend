import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"




const Login = () => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError]=useState(null)
  const {dispatch} = useAuthContext()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await fetch("https://workoutsserver.onrender.com/api/users/login",{
        method : "POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({mail,password})
      })

      const json = await response.json()
      console.log(json)

      if(!response.ok){
           setError(json.error)
      }

      if(response.ok){
        dispatch({type: 'LOGIN', payload: json})
        localStorage.setItem('user', JSON.stringify(json))
      }

      

    }
    catch(err){
      console.log(err.message)
    }
    navigate("/")
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setMail(e.target.value)} 
        value={mail} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login