import { Button } from '@mui/material'
import React, { useState } from 'react'
import ChangePwd from '../forms/changepwd/ChangePwd'

const Dashboard = () => {
  const [openChangePwd,setOpenChangePwd] = useState(false)
  return (
    <div>Welcome to Dashboard
    <Button variant='contained' onClick={()=>setOpenChangePwd(true)}>Change Password</Button>
    <ChangePwd openChangePwd={openChangePwd} closeModal={()=>setOpenChangePwd(false)}/>
    </div>
  )
}

export default Dashboard