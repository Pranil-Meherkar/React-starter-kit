import "./Roles.css"
import React, {useState, useEffect, useMemo} from 'react';
import AddRoleModal from './modal/AddRoleModal';
import { ROLES_DATA } from "../../../services/apiEndpoints";
import publicRequest from "../../../services/publicRequest";
import ConfirmDeleteModal from './../../shared/ConfirmDeleteModal';
import Pagination from './../../shared/Pagination';

const Roles = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [rolesData, setRolesData] = useState(null);
    const [loadValues, setLoadValues] = useState(null)
    const [myRef, setMyRef] = useState(null);
    const [id, setId] = useState(null);

    const handleDelete = (id) => {
        publicRequest
            .delete(`${ROLES_DATA}/${id}`)
            .then(() => {
                getRolesData()
            })
    }

    const getRolesData = async() => {
        const res = await publicRequest.get(ROLES_DATA)
        setRolesData(res.data)
    }

    useEffect(()=>{
        getRolesData()
    },[])

    const currentPageData = useMemo(() => {
        const lastCardIndex = itemsPerPage * currentPage;
        const firstCardIndex = lastCardIndex - itemsPerPage;
        return rolesData && rolesData.slice(firstCardIndex, lastCardIndex);
      }, [currentPage, rolesData, itemsPerPage]);

    return ( 
        <div className='roles-main'>
            <div className="roles-header" style={{display: "flex", justifyContent:"space-between", padding:"2.5vh 5vw", borderRadius: "5px"}}> 
                <p className='roles-heading'>Roles</p>
                <div>
                    <AddRoleModal getRolesData={getRolesData} loadData={loadValues} setMyRef={setMyRef} setLoadValues={setLoadValues}/>
                </div>
                
                {/* <button onClick={handleAdd} className="add-role" >Add Role</button> */}
            </div>
            <div className="roles-table">
                <table className="table">
                    <thead style={{backgroundColor: "#d5ddf0"}}>
                        <tr className="roles-table-row">
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="roles-table-body">
                        {
                            currentPageData && currentPageData.map(item => {
                                return (
                                    <tr key={item.id} className="roles-table-row">
                                        <td>{item?.role}</td>
                                        <td>{item?.description}</td>
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
                                                <div className="roles-actions-icons" 
                                                onClick={() => {
                                                    setId(item.id)
                                                }}
                                                >
                                                    <ConfirmDeleteModal id={id} handleDelete={handleDelete}/>
                                                    {/* <i class="fa-solid fa-trash" style={{color:" #ff0000"}}></i> */}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
            <Pagination itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={rolesData? rolesData.length: 0} />
        </div>
     );
}
 
export default Roles;