import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import './Formik.css'
import ReactDOM from 'react-dom'
import { Button } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { toast } from 'react-toastify'
// import Toaster from './shared/Toaster/Toaster'

const RegistrationForm = ({ openRegi, closeModal, openLogin, setIsRegister,setIsLogin }) => {

    const navigate = useNavigate()
    const [isSuccess, setIsSuccess] = useState(true)


    const login = useGoogleLogin({
        onSuccess: async response => {
            console.log(response)
            const data = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            })
            console.log(data)
            if (data.data.email_verified === true) {

                const postUser = () => {
                    axios.post('http://localhost:8080/users', data.data)
                    setIsRegister(true)
                    localStorage.setItem('token', data.data.email)
                    closeModal()
                    // setIsLogin(true)
                    navigate('/dashboard')
                    toast.success('Login Successful')

                }

                const alreadyExist = () => {
                    console.log(`${data.data.email} already exist`)
                    setIsRegister(true)
                    localStorage.setItem('token', data.data.email)
                    closeModal()
                    // setIsLogin(true)
                    navigate('/dashboard')
                    toast.success('Login Successful')
                }

                axios.get('http://localhost:8080/users')
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
    const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        mobNo: '',
        terms: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format...!').required('This field is required...!'),
        password: Yup.string().required('This field is required...!'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], `Password did'nt match`).required('This Field is required...!'),
        mobNo: Yup.string().required('This field is required...!').matches(phoneRegExp, 'Phone number is not valid'),
        terms: Yup.array().required('This field is required...!')
    })



    const onSubmit = (values, onSubmitProps) => {
        console.log(values)
        onSubmitProps.resetForm()

        const postUser = () => {
            axios.post('http://localhost:8080/users', values)
            setIsRegister(true)
            setIsSuccess(true)
            openLogin()
            toast.success(`User Login Successfully
                            Please Login`,{autoClose:3000})
        }

        const alreadyExist = () => {
            console.log(`${values.email} already exist`)
            toast.warn(`User already Exists Please Login`,{autoClose:3000})
            openLogin()
        }

        axios.get('http://localhost:8080/users')
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
            <div className='main'>
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
