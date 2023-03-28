import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../TextError'

const Checkbox = (props) => {
    const { name, label, options, ...rest } = props
    return (
        <div className='form-radio'>
            <label htmlFor={name}>{label}</label><br/>
            <Field name={name}{...rest}>
                {
                    ({field})=>{
                        return options.map((option)=>{
                            return (
                                <div key={option.key}>
                                    <input 
                                    {...field} 
                                    type='checkbox' 
                                    id={option.value} 
                                    value={option.value}
                                    checked={field.value.includes(option.value)} 
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

export default Checkbox

