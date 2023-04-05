import "../roles/Roles.css"
import React, {useState, useEffect, useMemo} from 'react';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddPermissionsModal from "./modal/AddPermissionsModal";
import Pagination from "../../shared/Pagination";
import publicRequest from "../../../services/publicRequest";
// import ConfirmDeleteModal from './../components/common/ConfirmDeleteModal';
import { toast } from "react-toastify";
import { PERMISSSIONS, ROLES_DATA } from "../../../services/apiEndpoints";
import ConfirmDeleteModal from "../../shared/ConfirmDeleteModal";
import Spinner from "../../shared/Spinner/Spinner";


const Permissions = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [rolesData, setRolesData] = useState(null);
    const [permissionsData, setPermissionsData] = useState(null);
    const [loadValues, setLoadValues] = useState(null)
    const [myRef, setMyRef] = useState(null);
    const [id, setId] = useState(null);

    const handleDelete = (id) => {
        publicRequest
            .delete(`${PERMISSSIONS}/${id}`)
            .then(() => {
                getPermissionsData()
                toast.success("Permission Deleted")
            })
    }

    const getRolesData = async() => {
        const res = await publicRequest.get(ROLES_DATA)
        setRolesData(res.data)
    }

    const getPermissionsData = async() => {
        const res = await publicRequest.get(PERMISSSIONS)
        setPermissionsData(res.data)
    }

    useEffect(()=>{
        getRolesData()
        getPermissionsData()
    },[])

    const currentPageData = useMemo(() => {
        const lastCardIndex = itemsPerPage * currentPage;
        const firstCardIndex = lastCardIndex - itemsPerPage;
        return permissionsData && permissionsData.slice(firstCardIndex, lastCardIndex);
      }, [currentPage, permissionsData, itemsPerPage]);

    return ( 
        <div className='roles-main'>
            <div className="roles-header" style={{display: "flex", justifyContent:"space-between", padding:"2.5vh 5vw", borderRadius: "5px"}}> 
                <p className='roles-heading'>Permissions</p>
                <div>
                    <AddPermissionsModal rolesData={rolesData} getPermissionsData={getPermissionsData} getRolesData={getRolesData} loadData={loadValues} setMyRef={setMyRef} setLoadValues={setLoadValues}/>
                </div>
                
                {/* <button onClick={handleAdd} className="add-role" >Add Role</button> */}
            </div>
            <div className="roles-table">
                <table className="table">
                    <thead style={{backgroundColor: "#d5ddf0"}}>
                        <tr className="roles-table-row">
                            <th>Name</th>
                            <th>Description</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="roles-table-body">
                        {
                            currentPageData ? (currentPageData.length ? (currentPageData.map(item => {
                                return (
                                    <tr key={item.id} className="roles-table-row">
                                        <td>{item?.permission}</td>
                                        <td>{item?.description}</td>
                                        <td>{item?.roles}</td>
                                        <td>
                                            <div style={{display:"flex", justifyContent:"center", gap: "1vw"}}>
                                                <div className="roles-actions-icons"
                                                    onClick={()=> {
                                                        setLoadValues(item)
                                                        myRef.current.click()
                                                    }}
                                                >
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </div>
                                                <div className="roles-actions-icons" onClick={() => {
                                                    setId(item.id)
                                                }}>
                                                    <ConfirmDeleteModal handleDelete={handleDelete} id={id}/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })): <tr className="roles-table-row"><td></td><td></td><td style={{textAlign:"left", color:"red"}}>No Data</td><td></td></tr>)
                            :
                            <tr><td></td><td><Spinner/></td><td></td><td></td></tr>
                        }
                    </tbody>

                </table>
            </div>
            <Pagination itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={permissionsData? permissionsData.length: 0} />
        </div>
     );
}
 
export default Permissions;