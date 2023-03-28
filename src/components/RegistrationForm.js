import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import './Formik.css'

const RegistrationForm = () => {

    const options = [
        { key: 'Email', value: 'emailmoc' },
        { key: 'Mobile No', value: 'mobmoc' }
    ]

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        modeOfContact: '',
        mobNo: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format...!').required('This field is required...!'),
        password: Yup.string().required('This field is required...!'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], `Password did'nt match`).required('This Field is required...!'),
        modeOfContact: Yup.string().required('This field is required...!'),
        mobNo: Yup.string().when('modeOfContact', {
            is: 'mobmoc',
            then:()=> Yup.string().required('This field is required...!'),
        })
    })

    const onSubmit = (values, onSubmitProps) => {
        console.log(values)
        onSubmitProps.resetForm()
    }

    return (
        <div className='main'>
            <div className='form-card'>
                <h1 className='heading'>Registration Form</h1>
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
                                    label='Email'
                                    placeholder='Enter Your Email ID'
                                />
                                <FormikControl
                                    control='input'
                                    type='password'
                                    label='Enter Password'
                                    name='password'
                                    placeholder='Enter New Password'
                                />
                                <FormikControl
                                    control='input'
                                    type='password'
                                    label='Confirm Password'
                                    name='confirmPassword'
                                    placeholder='Enter Password Again'
                                />
                                <FormikControl
                                    control='radio'
                                    label='Mode of Contact'
                                    name='modeOfContact'
                                    options={options}
                                />
                                <FormikControl
                                    control='input'
                                    type='text'
                                    name='mobNo'
                                    label='Mobile Number'
                                    placeholder='Enter Mobile Number'
                                />
                                <button type='submit' disabled={!formik.isValid} className='btn'>Submit</button>
                            </Form>
                        }
                    }

                </Formik>
            </div>
        </div>
    )
}

export default RegistrationForm
