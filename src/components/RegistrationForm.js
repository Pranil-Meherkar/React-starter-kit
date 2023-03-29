import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import './Formik.css'
import ReactDOM from 'react-dom'

const RegistrationForm = ({openRegi,closeModal,openLogin}) => {

    if(!openRegi) return null

    const radioOptions = [
        { key: 'Email', value: 'emailmoc' },
        { key: 'Mobile No', value: 'mobmoc' }
    ]
    
    const checkboxOptions = [
        {key:`I agree all terms and conditions`, value:'accepted'}
    ]

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        modeOfContact: '',
        mobNo: '',
        terms:''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format...!').required('This field is required...!'),
        password: Yup.string().required('This field is required...!'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], `Password did'nt match`).required('This Field is required...!'),
        modeOfContact: Yup.string().required('This field is required...!'),
        mobNo: Yup.string().when('modeOfContact', {
            is: 'mobmoc',
            then:()=> Yup.string().required('This field is required...!'),
        }),
        terms: Yup.array().required('This field is required...!')
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
                <h1 className='heading'>Registration</h1>
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
                                    icon={<i className="fa-solid fa-envelope fa-lg" style={{color:'#2196F3'}}></i>}
                                    label=' Email'
                                    placeholder='Enter Your Email ID'
                                />
                                <FormikControl
                                    control='input'
                                    type='password'
                                    icon={<i className="fa-solid fa-key fa-lg" style={{color:'#2196F3'}}></i>}
                                    label=' Enter Password'
                                    name='password'
                                    placeholder='Enter New Password'
                                />
                                <FormikControl
                                    control='input'
                                    type='password'
                                    icon={<i className="fa-solid fa-key fa-lg" style={{color:'#2196F3'}}></i>}
                                    label=' Confirm Password'
                                    name='confirmPassword'
                                    placeholder='Enter Password Again'
                                />
                                <FormikControl
                                    control='radio'
                                    icon={<i className="fa-solid fa-paper-plane fa-lg" style={{color:'#2196F3'}}></i>}
                                    label=' Mode of Contact'
                                    name='modeOfContact'
                                    options={radioOptions}
                                />
                                <FormikControl
                                    control='input'
                                    type='text'
                                    icon={<i className="fa-solid fa-phone fa-lg" style={{color:'#2196F3'}}></i>}
                                    name='mobNo'
                                    label=' Mobile Number'
                                    placeholder='Enter Mobile Number'
                                />
                                <FormikControl 
                                    control='checkbox'
                                    name='terms'
                                    options={checkboxOptions}
                                />
                                <button type='submit' className='btn'>Register</button><br/>

                                <span>Already have an account?</span><span onClick={openLogin} style={{ color: 'blue', cursor: 'pointer' }}>Login</span>
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

export default RegistrationForm
