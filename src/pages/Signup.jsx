import { useState } from "react";
// import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(null);
  const { dispatch } = useAuthContext()

  // const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await signup({ mail, password });

    try{
      const response = await fetch("http://localhost:4000/api/users/signup",{
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
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

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

      <button>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
