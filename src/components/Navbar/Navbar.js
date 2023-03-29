import React, { useState } from 'react'
import LoginForm from '../LoginForm'
import RegistrationForm from '../RegistrationForm'

import './Navbar.css'

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openRegi, setOpenRegi] = useState(false)

  return (
    <>
      <nav>
        <ul>
          <div className='elements'></div>
          <div className='buttons'>
            <li>
              <button onClick={() => setOpenRegi(true)} className='nav-btn'>Register</button>
            </li>
            <li>
              <button onClick={() => setOpenLogin(true)} className='nav-btn'>Login</button>
            </li>
          </div>
        </ul>
      </nav>
      <RegistrationForm
        openRegi={openRegi}
        openLogin={() => {
          setOpenRegi(false)
          setOpenLogin(true)
        }}
        closeModal={() => setOpenRegi(false)} />
      <LoginForm 
      openLogin={openLogin} 
      openRegi={()=>{
        setOpenLogin(false)
        setOpenRegi(true)
      }}
      closeModal={() => setOpenLogin(false)} />
    </>
  )
}

export default Navbar
