import React from "react";

const Settings = () => {
  return (
    <div className="dashboard">
      <div
        className="settings-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10vh 5vw",
          borderRadius: "5px",
        }}
      >
        <h1 className="settings-heading" style={{ fontSize: "2rem" }}>
          Settings
        </h1>
      </div>
    </div>
  );
};

export default Settings;
