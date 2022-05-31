import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoutes = () => {

    const loadUserFromReduxState = useSelector(state => state.user)
    const { login } = loadUserFromReduxState

    useEffect(() => {
        // check for the auto logout logic here
        
    }, [])

    return login ? <Outlet /> : <Navigate to='/login-register' />
    
}

export default ProtectedRoutes;