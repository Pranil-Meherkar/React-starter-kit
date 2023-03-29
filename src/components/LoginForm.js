import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import './Formik.css'
import ReactDOM from 'react-dom'

const LoginForm = ({openLogin,closeModal,openRegi}) => {

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
        console.log(values)
        onSubmitProps.resetForm()
    }

    return ReactDOM.createPortal(
        <>
        <div className='main'>
            <div className='form-card'>
            <p onClick={closeModal} className='close-btn'><i className="fa-solid fa-xmark fa-lg"></i></p>
                <h1 className='heading'>Login</h1>
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
                                    control='input'
                                    type='password'
                                    icon={<i className="fa-solid fa-key fa-lg" style={{ color: '#2196F3' }}></i>}
                                    label=' Enter Password'
                                    placeholder='Enter Your Password'
                                    name='password'
                                />
                                <button type='submit' className='btn'>Login</button><br />
                                <span>Don't have an account?</span><span onClick={openRegi} style={{ color: 'blue', cursor: 'pointer' }}>Register</span>
                            </Form>
                        }
                    }

                </Formik>
            </div>
        </div>
        <div className='overlay'></div>
        </>,
        document.getElementById('portal')
    )
}

export default LoginForm
