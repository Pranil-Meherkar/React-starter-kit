import React from 'react'
import NavbarLogin from '../shared/Navbar/NavbarLogin'
import { Outlet } from 'react-router'

const MainHeader = () => {
  return (
    <div>
        <NavbarLogin/>
        <Outlet/>
    </div>
  )
}

export default MainHeader