import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../formikcontrols/FormikControl'
import './Formik.css'
import ReactDOM from 'react-dom'
import { Button } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { GOOGLE_API_URL, USERS } from '../../services/apiEndpoints'
import { get, post } from '../../services/publicRequest'
import { PHONEREGEX,EMAILREGEX } from '../../utils/regEx'
// import Toaster from './shared/Toaster/Toaster'

const RegistrationForm = ({ setToken ,openRegi, closeModal, openLogin, setIsRegister,setIsLogin }) => {

    const navigate = useNavigate()
    


    const login = useGoogleLogin({
        onSuccess: async response => {
            console.log(response)
            const data = await axios.get(GOOGLE_API_URL, {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            })
            console.log(data)
            if (data.data.email_verified === true) {

                const postUser = () => {
                    post(USERS, data.data)
                    setIsRegister(true)
                    localStorage.setItem('token', data.data.email)
                    setToken(data.data.email)
                    closeModal()
                    setIsLogin(true)
                    navigate('/dashboard')
                    toast.success('Login Successful')

                }

                const alreadyExist = () => {
                    console.log(`${data.data.email} already exist`)
                    setIsLogin(true)
                    setIsRegister(true)
                    
                    localStorage.setItem('token', data.data.email)
                    setToken(data.data.email)
                    closeModal()
                    
                    navigate('/dashboard')
                    
                    toast.success('Login Successful')
                    
                }

                get(USERS)
                    .then(resp => {
                        const user = resp.data.find((user) => user.email === data.data.email)
                        user
                            ?
                            alreadyExist()
                            :
                            postUser()

                    })
            }
        }

    });


    if (!openRegi) return null

    const checkboxOptions = [
        { key: `I agree all terms and conditions`, value: 'accepted' }
    ]
    

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        mobNo: '',
        terms: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().required('This field is required...!').matches(EMAILREGEX, 'Email ID is not valid'),
        password: Yup.string().required('This field is required...!').min(8,'Password should be of minimum 8 chars'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], `Password did'nt match`).required('This Field is required...!'),
        mobNo: Yup.string().required('This field is required...!').matches(PHONEREGEX, 'Phone number is not valid'),
        terms: Yup.array().required('This field is required...!')
    })



    const onSubmit = (values, onSubmitProps) => {
        console.log(values)
        onSubmitProps.resetForm()

        const postUser = () => {
            post(USERS, values)
            setIsRegister(true)
            openLogin()
            toast.success(`User Register Successfully
                            Please Login`,{autoClose:3000})
        }

        const alreadyExist = () => {
            console.log(`${values.email} already exist`)
            toast.warn(`User already Exists Please Login`,{autoClose:3000})
            openLogin()
        }

        get(USERS)
            .then(resp => {
                const user = resp.data.find((user) => user.email === values.email)
                user
                    ?
                    alreadyExist()
                    :
                    postUser()

            })
            .catch((err)=>console.log(err.message))
    }



    return ReactDOM.createPortal(
        <>
            <div className='main-form'>
                <div className='form-card'>
                    <p onClick={closeModal} className='close-btn'><i className="fa-solid fa-xmark fa-lg"></i></p>
                    <h2 className='heading'>Registration</h2>
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
                                        name='email'
                                        icon={<i className="fa-solid fa-envelope fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Email'
                                        placeholder='Enter Your Email ID'
                                    />
                                    <FormikControl
                                        control='password'
                                        icon={<i className="fa-solid fa-key fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Enter Password'
                                        name='password'
                                        placeholder='Enter New Password'
                                    />
                                    <FormikControl
                                        control='password'
                                        icon={<i className="fa-solid fa-key fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Confirm Password'
                                        name='confirmPassword'
                                        placeholder='Enter Password Again'
                                    />

                                    <FormikControl
                                        control='input'
                                        icon={<i className="fa-solid fa-phone fa-lg" style={{ color: '#2196F3' }}></i>}
                                        name='mobNo'
                                        label=' Mobile Number'
                                        placeholder='Enter Mobile Number'
                                    />
                                    <FormikControl
                                        control='checkbox'
                                        name='terms'
                                        options={checkboxOptions}
                                    />
                                    <div className='modal-btn'>
                                        <Button type='submit' variant="contained" className='mui-btn'>Register</Button><br /></div>

                                    <div className='already'><div >Already have an account?</div><div onClick={openLogin} style={{ color: 'blue', cursor: 'pointer' }}>Login</div></div>
                                </Form>
                            }
                        }

                    </Formik>
                    <div>------------------OR------------------</div>

                    <GoogleButton onClick={login} className="google-btn" />


                </div>
            </div>
            <div className='overlay'>
            </div>
        </>,
        document.getElementById('portal')
    )

}

export default RegistrationForm
