import React from 'react';
import { Navigate} from 'react-router-dom';

const PrivateRoute = ({component: Component ,token, setToken}) => {
    return (
        token ? <Component setToken={setToken} /> : <Navigate to="/"/>
    )
}
 
export default PrivateRoute;