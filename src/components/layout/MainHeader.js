import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router'

const MainHeader = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default MainHeader