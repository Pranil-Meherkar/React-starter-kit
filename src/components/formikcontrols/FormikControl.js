import React from 'react'
import Input from './Input'
import RadioButtons from './RadioButtons'
import Select from './Select'
import TextArea from './TextArea'
import Checkbox from './CheckboxBtn'
import DatePicker from './DatePicker'
import Password from './Password'

const FormikControl = (props) => {
    const { control, ...rest } = props
    switch (control) {
        case 'input': return <Input {...rest} />

        case 'textarea': return <TextArea {...rest} />

        case 'select': return <Select {...rest} />

        case 'radio':return <RadioButtons {...rest} />

        case 'checkbox': return <Checkbox {...rest} />

        case 'date': return <DatePicker {...rest} />

        case 'password': return <Password {...rest} />

        default: return null
    }
}

export default FormikControl
