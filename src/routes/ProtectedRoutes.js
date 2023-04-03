import React from 'react'
import { Navigate } from 'react-router'

const ProtectedRoutes = (props) => {
    const {Component} = props
    // const navigate = useNavigate()
    let token = localStorage.getItem('token')
    // if(!token){
    //     navigate('/')
    // }
    console.log('protected', token)
    return (
        <div>{
            token ?
            <Component />:
            <Navigate to="/"/>
        }

        </div>
    )
}

export default ProtectedRoutes