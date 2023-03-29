import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../TextError'

const RadioButtons = (props) => {
    const { name, label, options,icon, ...rest } = props
    return (
        <div>
            <label htmlFor={name}>{icon}{label}</label><br/>
            <div className='form-radio-div'>
            <Field name={name}{...rest}>
                {
                    ({field})=>{
                        return options.map((option)=>{
                            return (
                                <span key={option.key} className='form-radio'>
                                    <input 
                                    {...field}
                                    type='radio' 
                                    id={option.value}  
                                    value={option.value}
                                    checked={field.value===option.value} 
                                    />
                                    <label htmlFor={option.value}>{option.key}</label><br/>
                                </span>
                            )
                        })
                    }
                }
            </Field>
            </div>
            <ErrorMessage name={name} component={TextError}/>
            
        </div>
    )
}

export default RadioButtons
