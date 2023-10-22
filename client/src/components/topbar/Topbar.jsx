import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';
import "./topbar.css";
import avatar from "../../images/avatar.svg";


export default function Topbar() {
  const { user,dispatch } = useContext(Context);
  const PF = "http://localhost:8080/images/"
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
      <Link className="link" to="/">
        <img className="topIcon" src={logo}></img>
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <div class="search">
            <i className="topSearchIcon fas fa-search"></i>
            <input type="text" class="searchTerm" placeholder="What are you looking for?"/>
            </div>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
            <div class="write-nav">
            <i className = "topWriteIcon fas fa-solid fa-pen"></i> write
            </div> 
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/profile">
            <img
              className="topImg"
              // src={PF + user.profilePic}
              src = {avatar}
              alt=""
            />
           </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem ">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
      </div>
    </div>
  );
}