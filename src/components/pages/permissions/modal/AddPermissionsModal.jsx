import React, { useState, useEffect, useRef } from "react";
import Required from "../../../shared/Required";
import publicRequest from "../../../../services/publicRequest";
import { toast } from "react-toastify";
import { PERMISSSIONS } from "../../../../services/apiEndpoints";

const initialValues = {
  permission: "",
  description: "",
  roles: "",
}

const AddPermissionsModal = ({
  rolesData,
  getPermissionsData,
  setMyRef,
  loadData,
  setLoadValues,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  setMyRef(modalRef);

  const validate = () => {
    let permError = "";
    let desError = "";
    let rolError = "";
    permError = !formData.permission && "Required";
    desError = !formData.description && "Required";
    rolError = !formData.roles && "Required";
    setErrors({
      permission: permError,
      description: desError,
      roles: rolError,
    });

    if (formData.roles && formData.description && formData.permission) {
      setErrors(initialValues);
    }
  };

  useEffect(() => {
    loadData
      ? setFormData(loadData)
      : setFormData(initialValues);
  }, [loadData]);

  useEffect(validate, [formData])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(formData).join("").length) return false;

    console.log("errors", Object.values(errors).join("").length);
    if (Object.values(errors).join("").length) {
      return false;
    }
    loadData
      ? publicRequest
          .put(`${PERMISSSIONS}/${loadData.id}`, {
            id: loadData.id,
            ...formData,
          })
          .then(() => {
            getPermissionsData();
            closeRef.current.click();
            setLoadValues(null);
            toast.success("Permission updated successfully")
          })
      : publicRequest.post(PERMISSSIONS, formData).then(() => {
          getPermissionsData();
          closeRef.current.click();
          setLoadValues(null);
          toast.success("Permission added successfully")
        });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
        style={{ height: "40px" }}
        ref={modalRef}
      >
        Add Permissions
      </button>

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ marginTop: "20vh", width: "30vw", fontSize: "1.5rem" }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {(loadData ? "Edit" : "Add") + " Permissions"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
                onClick={() => {
                  setLoadValues(null);
                  setErrors(initialValues);
                  setFormData(initialValues)
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="add-role-form" style={{textAlign: "left", padding: "20px"}}>
                <form>
                  <div className="form-group">
                    <label htmlFor="permission">
                      Permission Name
                      <Required />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="permission"
                      value={formData.permission}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          permission: e.target.value,
                        });
                      }}
                      placeholder="Enter Role"
                      style={{ height: "35px", fontSize: "1.2rem" }}
                    />
                    {errors.permission && (
                      <p style={{ color: "red", fontSize: "1.25rem" }}>
                        {errors.permission}
                      </p>
                    )}
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="permission-description">
                      Description
                      <Required />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="permission-description"
                      value={formData.description}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        });
                      }}
                      placeholder="Enter Description"
                      style={{ height: "35px", fontSize: "1.2rem" }}
                    />
                    {errors.description && (
                      <p style={{ color: "red", fontSize: "1.25rem" }}>
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="roles">
                      Roles
                      <Required />
                    </label>
                    <select
                      class="form-select"
                      value={formData.roles}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          roles: e.target.value,
                        });
                      }}
                      aria-label="Default select example"
                      style={{ height: "35px", fontSize: "1.2rem" }}
                    >
                      <option selected value="">Select roles</option>
                      {rolesData &&
                        rolesData.map((item) => {
                          return (
                            <option key={item.id} value={item.role}>
                              {item.role}
                            </option>
                          );
                        })}
                    </select>
                    {errors.roles && (
                      <p style={{ color: "red", fontSize: "1.25rem" }}>
                        {errors.roles}
                      </p>
                    )}
                  </div>
                  <br />
                  <div style={{display:"flex", justifyContent:"right"}}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ fontSize: "1.3rem", padding: "10px", marginRight:"10px" }}
                      onClick={handleSubmit}
                    >
                      {(loadData ? "Edit" : "Add") + " Permissions"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPermissionsModal;