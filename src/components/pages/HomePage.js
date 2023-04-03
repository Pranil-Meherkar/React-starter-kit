import React, { useState } from 'react'
import LoginForm from '../LoginForm'
import RegistrationForm from '../RegistrationForm'

const HomePage = () => {
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegi, setOpenRegi] = useState(false)
    return (
        <div>
            <h1>hello</h1>
            
            <button onClick={() => setOpenRegi(true)}>Register</button>
            <RegistrationForm open={openRegi} closeModal={() => setOpenRegi(false)} />

            <button onClick={() => setOpenLogin(true)} >Login</button>
            <LoginForm open={openLogin} closeModal={() => setOpenLogin(false)} />
        </div>
    )
}

export default HomePage
