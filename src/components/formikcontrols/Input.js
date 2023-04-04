import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../shared/TextError'
import { TextField } from '@mui/material'

const Input = (props) => {
    const { label, name, icon, ...rest } = props
    return (
        <div className='input-control'>
            <label htmlFor={name}>{icon}</label>
            <Field name={name} {...rest}>
                {
                    ({field})=>{
                        return(
                            <TextField 
                            {...field}
                            id={name} 
                            label={label}
                            variant="standard" 
                            className='input-field'
                            required
                            />
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Input