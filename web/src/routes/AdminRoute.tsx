import React from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useUserInfo } from '../store/userInfo';

interface AdminRouteProps {
  component: React.ComponentType;
}

const AdminRoute = ({
  component: Component,
}: AdminRouteProps): JSX.Element => {
    
    const {userInfo} = useUserInfo()

    if(userInfo._id === -1){
      return <Component />
    }else{
      return <Navigate to={'/'} />
    }
    
    
};

export default AdminRoute;