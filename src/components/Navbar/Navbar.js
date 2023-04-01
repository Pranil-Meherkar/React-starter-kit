import React, { useState } from 'react'
import LoginForm from '../LoginForm'
import RegistrationForm from '../RegistrationForm'
import { googleLogout } from '@react-oauth/google';

import './Navbar.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router';

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openRegi, setOpenRegi] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  console.log("registration", isRegister)

  const navigate = useNavigate()

  const logout = () => {
    googleLogout();
    localStorage.removeItem('token')
    navigate('/')
    console.log("Logout successful")
    setIsRegister(false)
    setIsLogin(false)
  }



  return (
    <>
      <div className='nav-main'>
        <nav className='nav'>
          <div className='logo'>LOGO</div>
          <ul>
            
              <li>
                {
                  isRegister ? null : <Button variant="contained" onClick={() => setOpenRegi(true)} >Register</Button>
                }
              </li>
              <li>
                {
                  isLogin ? <Button variant="contained" onClick={logout}>Logout</Button> : <Button variant="contained" onClick={() => setOpenLogin(true)} >Login</Button>
                }
              </li>
            
          </ul>
        </nav>
      </div>
      <RegistrationForm
        setIsRegister={setIsRegister}
        openRegi={openRegi}
        openLogin={() => {
          setOpenRegi(false)
          setOpenLogin(true)
        }}
        closeModal={() => setOpenRegi(false)} />
      <LoginForm
        setIsLogin={setIsLogin}
        setIsRegister={setIsRegister}
        openLogin={openLogin}
        openRegi={() => {
          setOpenLogin(false)
          setOpenRegi(true)
        }}
        closeModal={() => setOpenLogin(false)} />
    </>
  )
}

export default Navbar
