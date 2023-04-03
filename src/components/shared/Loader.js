import React from 'react'
import loader from '../../assets/gifs/loader.gif'
const Loader = () => {
  return (
    <div>
        <img src={loader} alt='Loading...'  style={{height:'50px'}}/>
    </div>
  )
}

export default Loader