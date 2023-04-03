import React from 'react';
import loader from "../../../assets/loader.gif"

const Spinner = ({size}) => {
    return (  
        <div >
            <img style={{width: size || "100px"}} src={loader} alt="notfound" />
        </div>
    );
}
 
export default Spinner;