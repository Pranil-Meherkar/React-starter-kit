import "./HomeLayout.css"
import React, {useState, lazy} from 'react';
import { Outlet } from 'react-router-dom';

// const Sidebar = lazy(() => import("./../components/dashboard/Sidebar"))
// const Navbar = lazy(() => import("./../components/dashboard/Navbar"))
// const ProfileModal = lazy(() => import("../components/dashboard/modal/ProfileModal"))

import Sidebar from '../shared/SideBar/Sidebar';
import Navbar from '../shared/Navbar/Navbar';
import ProfileModal from '../pages/dashboard/modal/ProfileModal';
import ChangePwd from "../forms/changepwd/ChangePwd";


const HomeLayout = ({setToken}) => {
    const [hideSidebar, sethideSidebar] = useState(false);
    const [openChangePwd, setOpenChangePwd] = useState(false);

    const closePassModal = () => {
        setOpenChangePwd(false)
    }
    const handleHideSidebar = () => {
        sethideSidebar(!hideSidebar)
    }
    const [openModal, setOpenModal] = useState(false);
    
    return ( 
        <div className='home-layout'>
            {openModal && <ProfileModal setOpenModal={setOpenModal} setOpenChangePwd={setOpenChangePwd} setToken={setToken} username={JSON.parse(localStorage.getItem("user"))?.email}/>}
            {openChangePwd && <ChangePwd openChangePwd={openChangePwd} closeModal={closePassModal}/>}
            <Sidebar hideSidebar={hideSidebar} handleHideSidebar={handleHideSidebar}/>
            <div className='homepage-container'>
                <Navbar openModal={openModal} setOpenModal={setOpenModal} setToken={setToken} username={JSON.parse(localStorage.getItem("user"))?.email} />
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
     );
}
 
export default HomeLayout;