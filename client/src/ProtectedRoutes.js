import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

const ProtectedRoutes = () => {
    
    const loadeduser = useSelector(state => state.user)
    const { login } = loadeduser

    return login ? <Outlet /> : <Navigate to='/login-register' />
    
}

export default ProtectedRoutes;