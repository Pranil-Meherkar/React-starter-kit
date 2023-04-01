import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    let auth = localStorage.getItem('token')
    console.log("Protected",auth)
    return (
        auth===true ? <Outlet /> : <Navigate to='/' />
    )
}

export default ProtectedRoutes