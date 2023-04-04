import React from 'react'
import NavbarLogin from '../shared/Navbar/NavbarLogin'
import { Outlet } from 'react-router'

const MainHeader = ({setToken}) => {
  return (
    <div>
        <NavbarLogin setToken={setToken}/>
        <Outlet/>
    </div>
  )
}

export default MainHeader