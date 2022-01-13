import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';

const Navbar = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(userAuth => userAuth)

    const handleLogout = () => {
        dispatch(logout())
    } 

    if (isAuth.userAuth.isAuth === true) {
        return (
            <div className="flex w-auto items-center justify-between p-7 text-white bg-blue-600 fixed left-0 right-0">
                <Link to="/">リアルコネクト</Link>
                <div className="flex items-center">
                    <button onClick={handleLogout} className="mx-2 cursor-pointer">Logout</button>
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