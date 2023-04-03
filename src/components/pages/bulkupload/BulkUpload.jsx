import React, { useState, useRef } from "react";
import Required from "../../shared/Required";
import "./BulkUpload.css";

const BulkUpload = () => {
  // const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState("");
  const uploadRef = useRef(null);

  const validate = (file) => {
    if (file.type === "text/csv" || file.type === "application/vnd.ms-excel") {
      return true;
    }
    return false;
  };

  return (<>
      <div
        className="upload-header"
        style={{display: "flex", justifyContent:"space-between", padding:"10vh 5vw", borderRadius: "5px"}}
      >
        <h1 className="upload-heading">Bulk Upload</h1>
      </div>
    <div className="bulkUpload">
      <div className="bulkUpload-form">
          <div className="form-group" style={{marginTop:"20px"}}>
            <label htmlFor="upload-file" className="upload-label">
              Upload Excel File
              <Required />
            </label>
            <input
              type="file"
              className="form-control"
              id="upload-file"
              placeholder="Enter Excel or CSV file"
              ref={uploadRef}
              onChange={(e) => {
                if (validate(e.target.files[0])) {
                  // setUploadFile(e.target.files[0]);
                  error && setError("");
                } else {
                  setError("Enter valid Excel or csv file");
                  uploadRef.current.value = "";
                }
              }}
              // style={{ height: "35px", fontSize: "1.2rem" }}
            />
            <p className="upload-error">{error}</p>
            <div className="upload-form-buttons" style={{display:"flex", gap:"20px", justifyContent:"center"}}>
              <button className="btn btn-primary">Upload</button>
              <button className="btn btn-primary" onClick={() => {
                uploadRef.current.value = ""
              }}>Clear</button>
            </div>
            <div className="upload-notes" style={{display:"flex", textAlign:"left", color:"#999", fontSize:"1.25rem"}}>
              <p>
                Notes: <br />
                1. Only Excel and CSV Files are allowed <br />
                2. File size should be between 1kB to 1MB <br />
                3. Row entries should not be empty for required column fields <br />
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
