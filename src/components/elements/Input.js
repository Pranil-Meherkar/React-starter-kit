import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'

const Input = (props) => {
    const { label, name, icon, ...rest } = props
    return (
        <div className='form-control'>
            <label htmlFor={name}>{icon}{label}</label>
            <Field id={name}
                name={name}
                {...rest}
                className="field"
            />
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Input
