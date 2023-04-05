import React, {  useEffect, useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import './Navbar.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const RegistrationForm = React.lazy(() => import('../../forms/registration/RegistrationForm'));
const LoginForm = React.lazy(()=>import('../../forms/login/LoginForm'))

const Navbar = ({setToken}) => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openRegi, setOpenRegi] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
 

  const navigate = useNavigate()

  const logout = () => {
    googleLogout();
    localStorage.removeItem('token')
    navigate('/')
    toast.success('Logout Successful', { autoClose: 2000 })
    console.log("Logout successful")
    setIsRegister(false)
    setIsLogin(false)
  }
useEffect(()=>{
localStorage.getItem('token') && setIsRegister(true)
localStorage.getItem('token') && setIsLogin(true)

},[])

  return (
    <>
      <div className='nav-main'>
        <nav className='nav bg-light'>
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
            setToken={setToken}
            setIsRegister={setIsRegister}
            setIsLogin={setIsLogin}
            openRegi={openRegi}
            openLogin={() => {
              setOpenRegi(false)
              setOpenLogin(true)
            }}
            
            closeModal={() => setOpenRegi(false)} />
       
      
        <LoginForm
        setToken={setToken}
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
