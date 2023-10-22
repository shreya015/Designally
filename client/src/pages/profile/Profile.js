import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import avatar from "../../images/avatar.svg";
import { useHistory } from 'react-router-dom';


export default function Profile() {
  const { user, dispatch } = useContext(Context);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [Message, setMessage] = useState('');
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      if (selectedFile) {
        formData.append("profilePic", selectedFile);
      }
  
      if (newPassword) {
        formData.append("password", newPassword);
      }
  
      await axios.put(`/api/users/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Profile and/or password updated successfully.");
      setMessage('Your profile has been updated successfully!');
    } catch (error) {
      console.error("Error updating profile and/or password:", error);
      setMessage('There is some issue updating your account. Try again!');
    }
  };
  

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/users/${user._id}`, {
        password,
        newPassword,
      });
      setMessage('Your account has been updated successfully!');
      // Handle the response, e.g., show a success message
    } catch (err) {
      // Handle errors, e.g., show an error message
      setMessage('There is some issue updating your account. Try again!');
    }
  };

  const handleAccountDeletion = async () => {
    try {
      const res = await axios.delete(`/api/users/${user._id}`);
      // Handle the response, e.g., redirect the user to the login page
      setMessage('Your account has been deleted successfully!');
      history.push('/login');
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      // Handle errors, e.g., show an error message
      setMessage('There is some issue deleting your account. Try again!');
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <div className="settingsTitleUpdate"><b>Profile Settings</b></div>
          <div className="settingsTitleDelete" onClick={handleAccountDeletion}><i className="deleteAccount far fa-trash-alt"></i>Delete Account</div>
        </div>
        <form className="settingsForm" onSubmit={handleUpdate}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={selectedFile ? URL.createObjectURL(selectedFile) : user.profilePic === '' ? avatar : user.profilePic} alt="" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fas fa-solid fa-pen"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={handleFileChange}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" readOnly/>
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" readOnly/>
          <label>Password</label>
          <input type="password" placeholder="********" name="password" value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      {Message && <p>{Message}</p>}
      {/* <Sidebar /> */}
    </div>
  );
}