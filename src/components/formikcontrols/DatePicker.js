import React from 'react'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ErrorMessage, Field } from 'formik'
import TextError from '../shared/TextError/TextError'

const DatePicker = (props) => {
    const { label, name, ...rest } = props
    return (
        <>
        <div className='input-control'>
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {
                    ({ form, field }) => {
                        const { setFieldValue } = form
                        const { value } = field
                        return (<DateView
                            id={name}
                            {...field}
                            {...rest}
                            selected={value}
                            onChange={val => setFieldValue(name,val)}
                        />)
                    }
                }
            </Field>
            
        </div>
        <ErrorMessage name={name} component={TextError}/>
        </>
    )
}

export default DatePicker
