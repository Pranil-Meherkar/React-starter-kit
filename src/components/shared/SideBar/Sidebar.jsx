import React, {useState} from "react";
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

  const iconComponents = {
    "Dashboard": <HomeIcon/>,
    "Roles": <PersonIcon/>,
    "Permissions": <SecurityIcon/>,
    "Bulk Upload": <DriveFolderUploadIcon/>,
    "Profiles": <AccountCircleIcon/>,
    "Settings": <SettingsIcon/>,
    "Products": <AddShoppingCartIcon/>
  }

  const headerIconComponents = {
    "roles & permissions": <SecurityIcon fontSize="large"/>,
    "Pages": <WebIcon fontSize="large" />,
  }
  const { hideSidebar, handleHideSidebar } = props;

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
                  style={{ marginTop: "5vh" }}
                />
              </div>
            ) : (
              <div style={{ marginTop: "5vh"}}>
                <KeyboardArrowLeftIcon
                  onClick={handleHideSidebar}
                  fontSize="large"
                />
              </div>
            )}
          </span>
        </li>
      </ul>
      <ul className="sidebar__ul sidebar__ul--2">
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
