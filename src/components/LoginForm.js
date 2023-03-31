import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import './Formik.css'
import ReactDOM from 'react-dom'
import { Button } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import GoogleButton from 'react-google-button'

const LoginForm = ({openLogin,closeModal,openRegi}) => {

    const login = useGoogleLogin({
        onSuccess: async response => {
            console.log(response)
            const data = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            })
            console.log(data)
            if(data.data){
                axios.post("http://localhost:8080/users",data.data)

            }
        }

    });

    if(!openLogin) return null

    
    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email Format').required('This field is Required'),
        password: Yup.string().required('This Field is required')
    })

    const onSubmit = (values, onSubmitProps) => {
        // console.log(values)
        onSubmitProps.resetForm()
        axios.get(`http://localhost:8080/users`)
        .then(resp => {
            console.log(resp.data)
            const user = resp.data.find((item)=> item.email===values.email)
            if(user.password===values.password){
                console.log("Login successful")
                // direct to dashboard
            }
            else{
                console.log("Login failed")
                // redirect to login page
            }
        })
        
    }

    return ReactDOM.createPortal(
        <>
        <div className='main'>
            <div className='form-card'>
            <p onClick={closeModal} className='close-btn'><i className="fa-solid fa-xmark fa-lg"></i></p>
                <h2 style={{marginLeft:'140px'}}>Login</h2>
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
                                <div className='already'><div>Don't have an account?</div><div onClick={openRegi} style={{ color: 'blue', cursor: 'pointer' }}>Register</div></div>
                            </Form>
                        }
                    }

                </Formik>
                <div>------------------OR------------------</div>
                    
                        <GoogleButton onClick={login} className="google-btn"/>
            </div>
        </div>
        <div className='overlay'></div>
        </>,
        document.getElementById('portal')
    )
}

export default LoginForm
