import { Form, Formik } from "formik"
import FormikControl from "../../formikcontrols/FormikControl"
import * as Yup from 'yup'
import { Button } from "@mui/material"
import ReactDOM from 'react-dom'
import './ChangePwd.css'
import { USERS } from "../../../services/apiEndpoints"
import { get, put } from "../../../services/publicRequest"
import { toast } from "react-toastify"

const ChangePwd = ({openChangePwd,closeModal}) => {
    const initialValues = {
        email:'',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object({
        oldPassword:Yup.string().required('This field is required...!'),
        newPassword: Yup.string().required('This field is required...!').min(8,'Password should be of minimum 8 chars'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), ''], `Password did'nt match`).required('This Field is required...!')
    })



    const onSubmit = (values, onSubmitProps) => {
        console.log("Value From change pwd",values)
        onSubmitProps.resetForm()

        get(USERS)
            .then(resp => {
                // console.log(resp.data)
                const user = resp.data.find((item) => item.email === values.email)
                if(!user) toast.warn('Please Enter Correct Email ID',{autoClose:2000})
                console.log("Getting user",user)
                    if (values.oldPassword==user.password) {
                        if(values.oldPassword===values.newPassword)
                        {
                            toast.warn('Old and new Password must be different')
                        }
                        else{
                        put(USERS,user.id,{...user,password:values.newPassword,confirmPassword:values.newPassword})
                        .then(resp=>console.log(resp.data))
                        closeModal()
                        toast.success('Password chnaged successfully',{autoClose:2000})
                    }
                    }
                    else { 
                        toast.error('Invalid old Password',{autoClose:2000})
                    }
                

          })
        }

    if(!openChangePwd) return null

    return ReactDOM.createPortal(
        <>
            <div className="change-pwd">
                    <p className='close-btn' onClick={closeModal}><i className="fa-solid fa-xmark fa-lg"></i></p>
                    <h2 className='heading-chng'>Change Password</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {
                            formik => {
                                return <Form>
                                    <FormikControl
                                        control='input'
                                        type='email'
                                        name='email'
                                        icon={<i className="fa-solid fa-envelope fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Email'
                                        placeholder='Enter Your Email ID'
                                    />
                                    
                                    <FormikControl
                                        control='password'
                                        icon={<i className="fa-solid fa-key fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Enter Old Password'
                                        name='oldPassword'
                                        placeholder='Enter New Password'
                                    />
                                    <FormikControl
                                        control='password'
                                        icon={<i className="fa-solid fa-key fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Enter New Password'
                                        name='newPassword'
                                        placeholder='Enter New Password'
                                    />
                                    <FormikControl
                                        control='password'
                                        icon={<i className="fa-solid fa-key fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Confirm Password'
                                        name='confirmPassword'
                                        placeholder='Enter Password Again'
                                    />
                                    <div className='modal-btn-chng'>
                                        <Button type='submit' variant="contained" className='mui-btn'>Change Password</Button><br /></div>

                                </Form>
                            }
                        }

                    </Formik>
                </div>
            
            <div className='overlay'>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ChangePwd