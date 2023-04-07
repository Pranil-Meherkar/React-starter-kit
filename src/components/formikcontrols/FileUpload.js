import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../shared/TextError/TextError'
import { Button } from '@mui/material'


const FileUpload = (props) => {
    const { label, name, icon, ...rest } = props
    return (
        <div className='input-control'>
            <label htmlFor={name}>{icon}</label>
            <Field name={name} {...rest}>
                {
                    ({ field }) => {
                        return (
                            <Button
                                variant="outlined"
                                component="label"
                            >
                                {label}
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default FileUpload