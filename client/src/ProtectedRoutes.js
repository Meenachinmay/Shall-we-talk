import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoutes = () => {
    const isAuth = useSelector(userAuth => userAuth)

    return isAuth.userAuth.isAuth ? <Outlet /> : <Navigate to='/login' />
    
}

export default ProtectedRoutes;