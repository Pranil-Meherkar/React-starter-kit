import React from 'react'
import { useState } from 'react'

const Toaster = ({title}) => {

    const [list, setList] = useState([])
    let toastProperties = [
        {
            title:'Success',
            description:'This is success toast message',
            bgColor: 'green'
        },
        {
            title:'Failed',
            description:'This is Failed toast message',
            bgColor: 'Red'
        },
        {
            title:'Warning',
            description:'This is warning toast message',
            bgColor: 'yellow'
        },
    ]

    const renderToast = toastProperties.find((toast)=>toast.title===title)

  return (
    <div>
       <div className='main' style={{backgroundColor:renderToast.bgColor}}>
            <button>X</button>
            <div>
                <p>{renderToast.title}</p>
                <p>{renderToast.description}</p>
            </div>
       </div>
    </div>
  )
}

export default Toaster