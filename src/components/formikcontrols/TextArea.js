import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../shared/TextError/TextError'

const TextArea = (props) => {
    const { label, name, ...rest } = props
    return (
        <>
        <div className='input-control'>
            <label htmlFor={name}>{label}</label>
            <Field
                as='textarea'
                id={name}
                name={name}
                {...rest}
                className='field'
            />
            
        </div>
        <ErrorMessage name={name} component={TextError} />
        </>
    )
}

export default TextArea
