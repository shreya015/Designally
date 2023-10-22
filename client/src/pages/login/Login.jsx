import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import login from "../../images/login.svg";
import "./login.css";

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="lr-container">
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit = {handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" size = "40" placeholder="Enter your username..." 
         ref={userRef}
         />
        <label>Password</label>
        <input className="loginInput" type="password" size = "40" placeholder="Enter your password..."
        ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
      
      <span className="loginRegister">Don't have an account?
        <Link className="link" to="/register">
        {/* <button className="loginRegisterButton"> */}
         <u className="loginRegisterColor"> Register here </u>
        {/* </button> */}
        </Link>
        </span>
      
    </div>
    <div >
      <img src={login} className="login-img"></img>
    </div>
    </div>
  );
}