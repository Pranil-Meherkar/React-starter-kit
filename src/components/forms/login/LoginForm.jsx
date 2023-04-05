import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../formikcontrols/FormikControl'
import './LoginForm.css'
import ReactDOM from 'react-dom'
import { Button } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GOOGLE_API_URL, USERS } from '../../../services/apiEndpoints'
import { get } from '../../../services/publicRequest'
import ForgetPass from '../forgetpwd/ForgetPass'
import { EMAILREGEX } from '../../../utils/regEx'

const LoginForm = ({ openLogin,setToken, closeModal, openRegi, setIsLogin, setIsRegister }) => {
    const [openForget, setOpenForget] = useState(false)
    
    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: async response => {
            console.log(response)
            const data = await axios.get(GOOGLE_API_URL, {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            })
            if (data.data.email_verified === true) {
                localStorage.setItem('token', data.data.email)
                setToken(data.data.email)
                closeModal()
                setIsLogin(true)
                setIsRegister(true)
                navigate('/dashboard')
                toast.success('Login Successful',{autoClose:3000})

            }
            else {
                localStorage.removeItem('token')
                setToken(null)
                toast.error('Invalid Username or Password')
            }
        }

    });

    


    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().required('This field is Required').matches(EMAILREGEX, 'Email ID is not valid'),
        password: Yup.string().required('This Field is required')
    })

    const onSubmit = (values, onSubmitProps) => {
        // console.log(values)
        onSubmitProps.resetForm()
        get(USERS)
            .then(resp => {
                console.log(resp.data)
                const user = resp.data.find((item) => item.email === values.email)
                if (resp.data.length > 0) {
                    if (user.password === values.password) {
                        localStorage.setItem("token", values.email)
                        setToken(values.email)
                        navigate('/dashboard')
                        setIsLogin(true)
                        setIsRegister(true)
                        closeModal()
                        toast.success('Login Successful',{autoClose:3000})
                    }
                    else {
                        localStorage.removeItem('token')
                        setToken(null)
                        navigate('/')
                        toast.error('Invalid Username or Password',{autoClose:3000})
                    }
                }
                else {
                    navigate('/')
                }
            })

    }
    const handleOpen = ()=>{
        
        setOpenForget(true)
        
    }
    
    
    // useEffect(()=>{
    //     if(openForget){
    //         closeModal()
    //     }
        
    // },[openForget])


    if (!openLogin) return null

    return ReactDOM.createPortal(
        <>
            <div className='main-login-form'>
            <p onClick={closeModal} className='close-btn'><i className="fa-solid fa-xmark fa-lg"></i></p>
                    <h2 style={{ marginLeft: '140px' }}>Login</h2>
                <div className='login-form-card'>
                    
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {
                            formik => {
                                return <Form>
                                    <FormikControl
                                        control='input'
                                        type='email'
                                        icon={<i className="fa-solid fa-user fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Enter Username'
                                        placeholder='Enter Your Username'
                                        name='email'
                                    />
                                    <FormikControl
                                        control='password'
                                        icon={<i className="fa-solid fa-key fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Enter Password'
                                        placeholder='Enter Your Password'
                                        name='password'
                                    />
                                    
                                    <div className='login-div'>
                                        <Button type='submit' variant="contained" className='mui-login-btn'>Login</Button><br /></div>
                                        <div onClick={handleOpen} className='forget-pass'>Forget Password ?</div>
                                        <ForgetPass openForget={openForget} closeModal={()=>setOpenForget(false)}
                                        openRegi={openRegi}/>
                                    <div className='already'><div>Don't have an account?</div><div onClick={openRegi} style={{ color: 'blue', cursor: 'pointer' }}>Register</div></div>
                                </Form>
                            }
                        }

                    </Formik>
                    <div>------------------OR------------------</div>

                    <GoogleButton onClick={login} className="google-btn" />
                </div>
            </div>
            <div className='overlay'></div>
        </>,
        document.getElementById('portal')
    )
}

export default LoginForm
