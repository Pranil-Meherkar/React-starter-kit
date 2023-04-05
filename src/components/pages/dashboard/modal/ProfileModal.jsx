import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfileModal = ({ setOpenModal,setOpenChangePwd ,username, setToken}) => {
  const [profilePic, setProfilePic] = useState(null);

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    toast.success("Logout Successful")
  }

  return (
    <div
      className="profile-modal"
      style={{
        position: "absolute",
        backgroundColor:"white",
        zIndex: 1,
        top: "40px",
        right: "15px",
        borderRadius: "5px",
        boxShadow: "1px 1px 3px #aaa",
      }}
    >
      <div style={{display: "flex", padding: "30px 30px 15px"}}>
        <div className="profile-pic">
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              backgroundColor: "skyblue",
              marginRight: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {profilePic ? (
              <img src={profilePic} alt="link-not-working" />
            ) : (
              <p style={{ fontSize: "80px", fontWeight: "1" }}>
                {username && username[0].toUpperCase()}
              </p>
            )}
          </div>
        </div>
        <div
          className="profile-details"
          style={{ fontSize: "0.92rem", marginTop: "10px"}}
        >
          <p>{username}</p>
          <button className="btn btn-primary" onClick={() => {
            setOpenChangePwd(true)
            setOpenModal(false)
          }}>Change Password</button>
        </div>
      </div>
      <div style={{display:"flex", justifyContent:"right", padding:"15px 30px", backgroundColor: "#eee", borderRadius:"0 0 5px 5px"}}>
        <button className="btn btn-secondary" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileModal;
