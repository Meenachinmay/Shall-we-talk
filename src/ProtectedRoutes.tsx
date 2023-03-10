import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { currentUserState } from './atoms/currentUserState'

const ProtectedRoutes: React.FC = () => {
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState)
  return currentUser.id || currentUser.email ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
