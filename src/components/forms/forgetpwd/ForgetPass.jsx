
import ForgetPassGif from '../../../assets/gifs/gif-resetpass.gif'
import ReactDOM from 'react-dom'
import { Formik,Form } from 'formik'
import FormikControl from '../../formikcontrols/FormikControl'
import { Button } from '@mui/material'
import * as Yup from 'yup'
import './ForgetPass.css'
import { USERS } from '../../../services/apiEndpoints'
import { get } from '../../../services/publicRequest'
import { toast } from 'react-toastify'

const ForgetPass = ({ openForget, closeModal, openRegi}) => {

    const initialValues = {
        email: '',
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format...!').required('This field is required...!'),
    })
    
    const onSubmit = (values, onSubmitProps) => {
        console.log(values)
        onSubmitProps.resetForm()

        const notExist = () => {
            
            toast.warn(`User didn't Exist..
                        Please register first`,{autoClose:3000})
                        closeModal()
                        openRegi()
        }

        const alreadyExist = () => {

            toast.success(`Password reset mail sent successfully
                            Please reset your password`,{autoClose:3000})
                            closeModal()
           
        }
        get(USERS)
            .then(resp => {
                const user = resp.data.find((user) => user.email === values.email)
                user
                    ?
                    alreadyExist()
                    :
                    notExist()

            })
            .catch((err)=>console.log(err.message))
    }
    
    
    

    if (!openForget) return null

    

    return ReactDOM.createPortal(
        <>
            <div className='main-div'>
                <div className='form-card'>
                   <img src={ForgetPassGif} alt='Forget Password GIF' className='gif'/>
                    <p onClick={closeModal} className='close-btn'><i className="fa-solid fa-xmark fa-lg"></i></p>
                    <p className='content'>Enter your email and we'll send you a link to reset your password</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {
                            formik =>{
                                return <Form>
                                    <FormikControl
                                        control='input'
                                        type='email'
                                        name='email'
                                        icon={<i className="fa-solid fa-envelope fa-lg" style={{ color: '#2196F3' }}></i>}
                                        label=' Email'
                                        placeholder='Enter Your Email ID'
                                    />
                                    <div className='modal-btn' style={{marginTop:'20px'}}>
                                        <Button type='submit' variant="contained" className='mui-btn'>Submit</Button><br /></div>

                                
                                </Form>
                            }
                        }
                    </Formik>
                    <p className='back-login' onClick={closeModal}>Back to login</p>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ForgetPass