import React, {useState, lazy} from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from './../components/dashboard/Sidebar';
// import Navbar from '../components/dashboard/Navbar';
// import ProfileModal from '../components/dashboard/modal/ProfileModal';

// const Sidebar = lazy(() => import("./../components/dashboard/Sidebar"))
// const Navbar = lazy(() => import("./../components/dashboard/Navbar"))
// const ProfileModal = lazy(() => import("../components/dashboard/modal/ProfileModal"))

import Sidebar from '../shared/SideBar/Sidebar';
import Navbar from '../shared/Navbar/NavbarLogin';
import ProfileModal from '../pages/dashboard/modal/ProfileModal';


const HomeLayout = ({setToken}) => {
    const [hideSidebar, sethideSidebar] = useState(false);
    const handleHideSidebar = () => {
        sethideSidebar(!hideSidebar)
    }
    const [openModal, setOpenModal] = useState(false);
    
    return ( 
        <div className='home-layout'>
            {openModal && <ProfileModal setToken={setToken} username={JSON.parse(localStorage.getItem("user"))?.email}/>}
            
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