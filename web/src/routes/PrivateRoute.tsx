import React from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useUserInfo } from '../store/userInfo';
import Login from '../pages/LoginPage/Login';

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute = ({
  component: Component,
}: PrivateRouteProps): JSX.Element => {
    
    const {userInfo} = useUserInfo()

    if(userInfo._id === 0){
        return <Navigate to={'/'} />
    }else{
        return <Component />
    }
};

export default PrivateRoute;