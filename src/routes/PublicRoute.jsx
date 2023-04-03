import React from 'react';
import { Navigate} from 'react-router-dom';

const PublicRoute = ({component: Component , token , setToken}) => {
    return (
        !token ? <Component setToken={setToken} /> : <Navigate to="/dashboard" /> 
    )
}
 
export default PublicRoute;