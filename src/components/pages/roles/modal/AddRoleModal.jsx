import React,{useState, useEffect, useRef} from "react";
import publicRequest from "../../../../services/publicRequest";
import { toast } from "react-toastify";
import { ROLES_DATA } from "../../../../services/apiEndpoints";
import Required from './../../../shared/Required';


const initialValues = {
  role:"",
  description:""
}

const initialValuesTouched = {
  role: false,
  description: false
}

const AddRoleModal = ({getRolesData, setMyRef,loadData,setLoadValues}) => {
    const [formData, setFormData] = useState(initialValues);
    const [touched, setTouched] = useState(initialValuesTouched);
    const [errors, setErrors] = useState(initialValues);


    const modalRef = useRef(null)
    const closeRef = useRef(null)
    setMyRef(modalRef)

    const validateChange = () => {
      let roleError = ""
      let desError = ""
      roleError = (!formData.role && touched.role) && "This field is Required"
      desError = (!formData.description && touched.description) && "This field is Required"
        setErrors({
          role: roleError,
          description: desError
        })

        if(formData.role && formData.description){
            setErrors(initialValues)
        }
    }

    const validate = () => {
      let roleError = ""
      let desError = ""
      roleError = (!formData.role) && "This field is Required"
      desError = (!formData.description) && "This field is Required"
        setErrors({
          role: roleError,
          description: desError
        })

        if(formData.role && formData.description){
            setErrors(initialValues)
        }
    }

    useEffect(()=> {
        loadData ? setFormData(loadData): setFormData(initialValues)
    },[loadData])

    useEffect(()=> {
        validateChange()
    },[formData, touched])


    const handleSubmit = (e) => {
        validate()
        e.preventDefault()
        if(!Object.values(formData).join("").length) return false

        console.log("errors", Object.values(errors).join("").length)
        if((Object.values(errors).join("").length)){
            return false
        }
        loadData ?
        (publicRequest
            .put(`${ROLES_DATA}/${loadData.id}`, {
                id: loadData.id,
                ...formData
            })
            .then(()=> {
                getRolesData()
                closeRef.current.click()
                setLoadValues(null)
                toast.success("Role updated successfully")
            })) :
        (publicRequest
            .post(ROLES_DATA, formData)
            .then(()=> {
                getRolesData()
                closeRef.current.click()
                setLoadValues(null)
                toast.success("Role added successfully")
            })) 

        setFormData(initialValues)
    }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
        style={{height:"40px"}}
        ref={modalRef}
      >
        Add Role
      </button>

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{marginTop:"5vh",fontSize:"0.92rem" /*backgroundColor:"#99a3bd"*/}}>
            <div className="modal-header" >
              <h1 className="modal-title fs-5" id="exampleModalLabel" >
                {(loadData? "Edit": "Add") +" Role"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
                onClick={() => {
                    setTouched(initialValuesTouched)
                    setLoadValues(null)
                    setErrors(initialValues);
                    setFormData(initialValues)
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="add-role-form" style={{textAlign: "left", padding: "20px", maxHeight: "65vh", overflowY:"scroll", overflowX: "hidden"}}>
              <form style={{paddingRight:"20px"}}>
                <div className="form-group">
                  <label htmlFor="role">Role<Required/></label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    value={formData.role}
                    onBlur={() => {
                      setTouched({
                        ...touched,
                        role: true
                      })
                    }}
                    onChange={(e)=>{
                        setFormData({
                            ...formData,
                            role: e.target.value
                        })
                    }}
                    placeholder="Enter Role"
                    style={{height:"35px", fontSize:"0.85rem"}}
                  />
                  {errors.role && <p style={{color:"red", fontSize:"0.85rem"}}>{errors.role}</p>}
                </div><br />
                <div className="form-group">
                  <label htmlFor="role-description">Description<Required/></label>
                  <input
                    type="text"
                    className="form-control"
                    id="role-description"
                    value={formData.description}
                    onBlur={() => {
                      setTouched({
                        ...touched,
                        description: true
                      })
                    }}
                    onChange={(e)=>{
                        setFormData({
                            ...formData,
                            description: e.target.value
                        })
                    }}
                    placeholder="Enter Description"
                    style={{height:"35px", fontSize:"0.85rem"}}
                  />
                  {errors.description && <p style={{color:"red", fontSize:"0.85rem"}}>{errors.description}</p>}
                </div><br />
                <div style={{display:"flex", justifyContent:"right"}}>
                  <button type="submit" className="btn btn-primary" style={{fontSize:"0.9rem", padding: "10px", marginRight:"10px"}}
                    onClick={handleSubmit}  
                  >
                    {(loadData? "Edit": "Add") + " Role"}
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

export default AddRoleModal;
