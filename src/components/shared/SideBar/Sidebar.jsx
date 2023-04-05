import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import Menu from "../../../routes/routesJSON/Menu.json"
import "./Sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import WebIcon from '@mui/icons-material/Web';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Sidebar = (props) => {

  const [showSubMenuItems, setShowSubMenuItems] = useState(Menu.map(item => false));
  const [windowSmall, setWindowSmall] = useState(false);

  const iconComponents = {
    "Dashboard": <HomeIcon fontSize="small"/>,
    "Roles": <PersonIcon fontSize="small"/>,
    "Permissions": <SecurityIcon fontSize="small"/>,
    "Bulk Upload": <DriveFolderUploadIcon fontSize="small"/>,
    "Profiles": <AccountCircleIcon fontSize="small"/>,
    "Settings": <SettingsIcon fontSize="small"/>,
    "Products": <AddShoppingCartIcon fontSize="small"/>
  }

  const headerIconComponents = {
    "roles & permissions": <SecurityIcon fontSize="medium"/>,
    "Pages": <WebIcon fontSize="medium" />,
  }
  const { hideSidebar, handleHideSidebar } = props;

  // useEffect(() => {
  //   if(window.innerWidth <= 1200){
  //     !hideSidebar && handleHideSidebar()
  //   }
  // }, [])

  const setSidebarSmall = () => {
    if(window.innerWidth <= 1200){
          !hideSidebar && handleHideSidebar()
    }
    if(window.innerWidth <= 700){
      setWindowSmall(true)
    }else{
      setWindowSmall(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', setSidebarSmall);
    return () => window.removeEventListener('resize', setSidebarSmall);
  }, [])

  console.log("windoww", windowSmall)

  return (
    <div className={`sidebar ${hideSidebar ? "small" : null}`}>
      <ul className="sidebar__ul sidebar__ul--1">
        <li className="sidebar__ul--li sidebar__ul--li-head">
          {/* {hideSidebar ? (
            ""
          ) : (
            <NavLink
              to="/dashboard"
              className="sidebar__ul--li-nav sidebar__ul--li-nav-head"
            >
              <img
                src={""}
                className="sidebar__ul--li-nav-img"
                alt="image"
              ></img>
            </NavLink>
          )} */}
          <span className={`sidebar__ul--li-head-span ${hideSidebar ? "small" : null}`}>
            {hideSidebar ? (
              <div>
                <MenuIcon
                  onClick={handleHideSidebar}
                  style={{ marginTop: "5vh" , pointerEvents: windowSmall && "none"}}
                />
              </div>
            ) : (
              <div style={{ marginTop: "5vh"}}>
                <KeyboardArrowLeftIcon
                  onClick={handleHideSidebar}
                  fontSize="medium"
                />
              </div>
            )}
          </span>
        </li>
      </ul>
      <ul className={`sidebar__ul sidebar__ul--2 ${hideSidebar ? "small" : null}`}>
        {Menu.map((header) => (
          <div key={header.id} >
            {header.masterName !== "home" ? (
              <li key={header.id} className="sidebar__ul--li-1" onClick={() => {
                let temp = showSubMenuItems
                temp[header.id -1] = !temp[header.id -1]
                setShowSubMenuItems([...temp])
              }}>
                <p className="sidebar__ul--li-title"><span style={{ cursor:"pointer", userSelect:"none"}}>{headerIconComponents[header.masterName]}</span> 
                {!hideSidebar && (
                 ` ${header.masterName} `
                )}
                </p>
                
              </li>
            ) : (
              <li className="sidebar__ul--li-nav-1"></li>
            )}
            <div className="sub-menu-items">
              {(showSubMenuItems[header.id - 1] || !(header.id -1)) && header.masterPanel.map((panel) => (
                <li key={panel.id} className="sidebar__ul--li">
                  <NavLink to={`${panel.link}`} className="sidebar__ul--li-nav">
                    <span>{iconComponents[panel.name]}</span>
                    {!hideSidebar && <span>{panel.name}</span>}
                    {panel.link === "/requestClient" ? (
                      <span
                        style={{
                          backgroundColor: "#63B8EC",
                          color: "white",
                          // padding: "0.3125rem",
                          borderRadius: "50px",
                        }}
                      >
                        {0}
                      </span>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
              ))}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
