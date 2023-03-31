import React from 'react'
import Input from './elements/Input'
import RadioButtons from './elements/RadioButtons'
import Select from './elements/Select'
import TextArea from './elements/TextArea'
import Checkbox from './elements/CheckboxBtn'
import DatePicker from './elements/DatePicker'
import Password from './elements/Password'

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
