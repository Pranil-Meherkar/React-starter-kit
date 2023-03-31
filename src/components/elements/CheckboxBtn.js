import { Checkbox } from '@mui/material'
import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../TextError'

const CheckboxBtn = (props) => {
    const { name, label, options, ...rest } = props
    return (
        <div className='form-radio'>
            {/* <label htmlFor={name}>{label}</label><br/> */}
            <Field name={name}{...rest}>
                {
                    ({field})=>{
                        return options.map((option)=>{
                            return (
                                <div key={option.key} className='checkbox'>
                                    {/* <input 
                                    {...field} 
                                    type='checkbox' 
                                    id={option.value} 
                                    value={option.value}
                                    checked={field.value.includes(option.value)} 
                                    /> */}
                                    <Checkbox 
                                    {...field}
                                    id={option.value}
                                    value={option.value}
                                    checked={field.value.includes(option.value)} 
                                    {...label}  
                                    color="success"
                                    required
                                     />
                                    <label htmlFor={option.value}>{option.key}</label><br/>
                                </div>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default CheckboxBtn

