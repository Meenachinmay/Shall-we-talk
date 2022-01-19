import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, changeUserStatus, setUserStatus } from '../actions/auth';
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

const Navbar = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(userAuth => userAuth)
    const navigate = useNavigate()
    let loggedInAs = null
    let user = null

    // if user is logged in then only fetch these details from redux store
    if (isAuth.userAuth.isAuth === true) {
        loggedInAs = isAuth.userAuth.user.username
        user = isAuth.userAuth.user._id
    }

    const token = localStorage.getItem('token')
    const status = useSelector(userStatus => userStatus)

    const handleLogout = () => {
        const user = isAuth.userAuth.user._id
        dispatch(logout({ user }))
        dispatch(setUserStatus(0))
        if (isAuth.userAuth.isAuth === null) {
            navigate('/login')
        }
    } 

    function changeStatus(status) {
        dispatch(changeUserStatus({user, status, token}))
        navigate('/')
    }

    if (isAuth.userAuth.isAuth === true) {
        return (
            <div>
                <div className="flex w-auto items-center justify-between p-7 text-white bg-blue-600 fixed left-0 right-0">
                    <Link to="/">リアルコネクト</Link>
                        <button className='bg-red-300 rounded px-3' onClick={() => changeStatus('0')}>Do not want to talk</button>
                        <button className='bg-green-300 rounded px-3' onClick={() => changeStatus('2')}>Want to talk</button>
                        <button className='bg-blue-300 rounded px-3' onClick={() => changeStatus('1')}>Ready to talk</button>
                        <button className='px-3'>Current Status: {status.userStatus.status}</button>

                    <div className="flex items-center">
                        <p className='mr-2 text-white font-thin text-sm'>Logged in as {loggedInAs}</p>
                        <button onClick={handleLogout} className="mx-2 cursor-pointer">Logout</button>
                    </div>
                </div>
             </div>
        )
    } else {
        return (
            <div className="flex items-center justify-between p-7 text-white fixed left-0 right-0"　style={{background: '#4f46e5'}}>
                <Link to="/">リアルコネクト</Link>
                <div className="flex items-center">
                    <Link to='/register' className="mx-2 cursor-pointer">サインアップ</Link>
                    <Link to='/login' className="mx-2 cursor-pointer">サインイン</Link>
                </div>
            </div>
        )
    }
}

export default Navbar;