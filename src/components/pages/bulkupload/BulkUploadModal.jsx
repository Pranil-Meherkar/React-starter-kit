import React, { useState, useRef } from "react";
import Required from "../../shared/Required";

const BulkUploadModal = () => {
  const uploadRef = useRef(null);
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const validate = (file) => {
    if (file.type === "text/csv" || file.type === "application/vnd.ms-excel") {
      return true;
    }
    return false;
  };
  return (
    <>
      <div data-bs-toggle="modal" data-bs-target="#bulkUploadModal">
        <button className="btn btn-primary"> Bulk Upload</button>
      </div>

      <div
        className="modal fade"
        id="bulkUploadModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ marginTop: "20vh", fontSize: "1.2rem" }}
          >
            <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
                Bulk Upload
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="bulkUpload-form">
                <div className="form-group" style={{ marginTop: "20px"}}>
                  <label htmlFor="upload-file" className="upload-label" style={{fontSize: ".9rem"}}>
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
                    style={{ width: "80%", fontSize: ".9rem" }}
                  />
                  <p className="upload-error">{error}</p>
                  <div
                    className="upload-form-buttons"
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "right",
                    }}
                  >
                    <button className="btn btn-primary">Upload</button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        uploadRef.current.value = "";
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkUploadModal;
