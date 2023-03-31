import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import './Formik.css'
import ReactDOM from 'react-dom'
import { Button } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button'
import axios from 'axios'

const RegistrationForm = ({ openRegi, closeModal, openLogin }) => {

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
            if(data.data.email_verified===true){
                openLogin()
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
        axios.post('http://localhost:8080/users',values)
        openLogin()
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
                                    <Button type='submit' variant="contained" className='mui-btn'>Register</Button><br />

                                    <div className='already'><div >Already have an account?</div><div onClick={openLogin} style={{ color: 'blue', cursor: 'pointer' }}>Login</div></div>
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

export default RegistrationForm
