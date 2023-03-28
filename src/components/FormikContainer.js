import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import './Formik.css'

const FormikContainer = () => {

    const dropDownOptions = [
        {key:0,value:'Select an Option'},
        {key:1,value:' Option 1'},
        {key:2,value:' Option 2'},
        {key:3,value:' Option 3'},
        {key:4,value:' Option 4'},
        {key:5,value:' Option 5'},

    ]

    const radioOptions = [
        {key:' Option 1',value:' rOption 1'},
        {key:' Option 2',value:' rOption 2'},
        {key:' Option 3',value:' rOption 3'},
        {key:' Option 4',value:' rOption 4'},
        {key:' Option 5',value:' rOption 5'},

    ]

    const checkboxOptions = [
        {key:' Option 1',value:' cOption 1'},
        {key:' Option 2',value:' cOption 2'},
        {key:' Option 3',value:' cOption 3'},
        {key:' Option 4',value:' cOption 4'},
        {key:' Option 5',value:' cOption 5'},

    ]

    const initialValues = {
        email: '',
        description:'',
        selectOption:'',
        radioOption:'',
        checkboxOption:[],
        birthDate:null
    }

    const validationSchema = Yup.object({
        email: Yup.string().required('This field is required...!'),
        description: Yup.string().required('This field is required...!'),
        selectOption: Yup.string().required('This field is required...!'),
        radioOption: Yup.string().required('This field is required...!'),
        checkboxOption: Yup.array().required('This field is required...!'),
        birthDate: Yup.string().required('This field is required...!').nullable()
    })

    const onSubmit = (values,onSubmitProps) => {
        console.log(values)
        onSubmitProps.resetForm()
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {
                formik => (
                    <Form>
                        <FormikControl
                            control='input'
                            label='Email'
                            name='email'
                            placeholder='Enter Your Email ID'
                        />

                        <FormikControl
                            control='textarea'
                            label='Description'
                            name='description'
                            placeholder='Description'
                        />

                        <FormikControl
                            control='select'
                            label='Select a Option'
                            name='selectOption'
                            options={dropDownOptions}
                        />
                        <FormikControl
                            control='radio'
                            label='Pick a Option'
                            name='radioOption'
                            options={radioOptions}
                        />
                        <FormikControl
                            control='checkbox'
                            label='Checkbox topic'
                            name='checkboxOption'
                            options={checkboxOptions}
                        />
                        <FormikControl
                            control='date'
                            label='Date of Birth'
                            name='birthDate'
                        />

                        <button type='submit'>Submit</button>
                    </Form>
                )
            }
        </Formik>
    )
}

export default FormikContainer
