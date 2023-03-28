import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../TextError'

const Select = (props) => {
    const { name, label, options, ...rest } = props
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field
                as='select'
                id={name}
                name={name}
                className='field'
                {...rest}
            >
                {
                    options.map((option,index)=><option key={index} value={option.value}>{option.value}</option>)
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Select
