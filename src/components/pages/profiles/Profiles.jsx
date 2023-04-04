import React from "react";

const Profiles = () => {
  return (
    <div>
      <div
        className="profiles-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10vh 5vw",
          borderRadius: "5px",
        }}
      >
        <h1 className="profiles-heading" style={{ fontSize: "2rem" }}>
          Profiles
        </h1>
      </div>
    </div>
  );
};

export default Profiles;
