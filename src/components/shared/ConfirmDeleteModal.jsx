import React, { useRef } from "react";


const ConfirmDeleteModal = ({
  handleDelete,
  id
}) => {

    const closeRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
    <>
      <div
        data-bs-toggle="modal"
        data-bs-target="#confirmDeleteModal"
      ><i className="fa-solid fa-trash" style={{color:" #ff0000"}}></i></div>

      <div
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ marginTop: "20vh", width: "30vw", fontSize: "0.92rem" }}
          >
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              ></button>
            </div>
            <div className="modal-body">
              <div className="add-role-form">
                <p style={{padding: "30px 0"}}>Are you sure you want to delete this?</p>
                <div style={{ width: "60%", display: "flex", justifyContent:"space-between", margin:"auto"}}>
                    <button className="btn btn-danger" onClick={() => {
                        handleDelete(id)
                        closeRef.current.click()
                    }}>Yes, Delete</button>
                    <button className="btn btn-primary" onClick={()=>{
                        closeRef.current.click()
                    }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteModal;
