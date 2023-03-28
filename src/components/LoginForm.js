import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import './Formik.css'

const LoginForm = () => {

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

    return (
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
                            label='Enter Username'
                            name='email'
                        />
                        <FormikControl
                            control='input'
                            type='password'
                            label='Enter Password'
                            name='password'
                        />
                        <button type='submit' disabled={!formik.isValid}>Submit</button>
                    </Form>
                }
            }

        </Formik>
    )
}

export default LoginForm
