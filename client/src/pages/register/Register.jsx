import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../../images/login.svg";
import "./register.css"

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
    return (
      <div className="lr-container">
      <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" size="40" placeholder="Enter your username..." 
         onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input className="registerInput" type="text" size="40" placeholder="Enter your email..."
        onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input className="registerInput" type="password" size="40" placeholder="Enter your password..."
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">Register</button>
      </form>
      <span className="loginRegister">Already have an account?
        <Link className="link" to="/login">
        {/* <button className="loginRegisterButton"> */}
         <u className="loginRegisterColor"> Login here </u>
        {/* </button> */}
        </Link>
        </span>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
       </div>

      <div>
      <img src={login} className="login-img"></img>
    </div>
    </div>
    )
}