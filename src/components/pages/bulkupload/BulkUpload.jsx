import React, { useState } from "react";
import Required from "../../shared/Required";
import BulkUploadModal from "./BulkUploadModal";
import "./BulkUpload.css";

const BulkUpload = () => {
  return (
    <>
      <div
        className="upload-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10vh 5vw",
          borderRadius: "5px",
        }}
      >
        <h1 className="upload-heading" style={{ fontSize: "2rem" }}>
          Bulk Upload
        </h1>
      </div>
      <div className="bulkUpload">
        <div
          style={{
            paddingTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <div>
              <BulkUploadModal />
            </div>
            <div
              className="upload-notes"
              style={{
                padding: "20px 0",
                display: "flex",
                textAlign: "left",
                color: "#999",
                fontSize: "0.8rem",
              }}
            >
              <p>
                Notes: <br />
                1. Only Excel and CSV Files are allowed <br />
                2. File size should be between 1kB to 1MB <br />
                3. Row entries should not be empty for required column fields{" "}
                <br />
              </p>
            </div>
          </div>
        </div>

        {/* <h1>BulkUpload Page</h1> */}
      </div>
    </>
  );
};

export default BulkUpload;
