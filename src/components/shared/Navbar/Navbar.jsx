import React, {useState} from "react";
import ChangePwd from "../../forms/changepwd/ChangePwd";

const customStyles = {
  paddingLeft: "30px",
  fontSize: "1.1rem",
  borderBottom: "1px solid #ddd"
};

const Navbar = ({ username, openModal, setOpenModal}) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={customStyles}
    > 
      <div className="collapse navbar-collapse" id="navbarNav" style={{display: "flex", justifyContent:"right"}}>
        <ul className="navbar-nav">
          <li style={{paddingRight: "20px", fontSize:".84rem", paddingTop:"5px"}}>
            <p>Hi {username} !</p>
          </li>
          <li className="nav-item active">
            {/* <button className="btn btn-primary" href="/" 
              style={{
                marginRight: "30px"
              }}
              onClick={() => {
                localStorage.removeItem("token")
                setToken(null)
              }}>
              Logout
            </button> */}
            <div onClick={() => {
              setOpenModal(!openModal)
            }} 
            style={{ width: "30px", height:"30px", borderRadius:"15px", backgroundColor:"skyblue", marginRight:"20px", userSelect:"none", cursor:"pointer", textAlign:"center"}}>
              <p>{username && username[0].toUpperCase()}</p>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
