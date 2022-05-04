import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setNewAlert } from '../actions/alert';
import { userLogout } from '../actions/user';
import Alert from './Alert';

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alertState = useSelector(alert => alert)

    const user = localStorage.getItem('token')

    const handleAlert = async() => {
        const newalert = {
            type: 'success',
            message: 'This is an success alert'
        }
        await dispatch(setNewAlert(newalert))
    }

    const handleLogout = () => {
        dispatch(userLogout({ navigate }))
    }

    return (
        <div className='shadow-md w-full'>
            <div className='md:flex items-center md:justify-between bg-white py-4 md:px-10 px-7'>
                <div className='md:flex md:items-center'>
                    <a href='/' className='flex items-center md:justify-start justify-center font-bold text-xl cursor-pointer text-gray-800'>
                        <div className='text-indigo-600'>
                            shall we
                        </div>
                        <div>&nbsp;</div>
                        <div>
                            talk
                        </div>
                    </a>  

                    <ul className='md:pb-0 pb-4'>
                        <div className='md:flex md:items-center'>
                            <li className='md:ml-8 md:my-0 my-4'>
                                <a href='#' className='text-gray-800 text-xs md:text-sm hover:text-gray-400 duration-500'>準備オッケー</a>
                            </li>
                            <li className='md:ml-8 md:my-0 my-4'>
                                <a href='#' className='text-gray-800 text-xs md:text-sm hover:text-gray-400 duration-500'>話そう</a>
                            </li>
                            <li className='md:ml-8 md:my-0 my-4'>
                                <a href='#' className='text-gray-800 text-xs md:text-sm hover:text-gray-400 duration-500'>今じゃない</a>
                            </li>
                            <li className='md:ml-8 md:my-0 my-4'>
                                <a href='/users' className='text-white bg-indigo-600 py-1 px-2 rounded text-xs md:text-sm hover:text-gray-400 duration-500'>Check users space</a>
                            </li>
                        </div>
                    </ul>
                </div>

                <div className='flex items-center'>
                    { user ? 
                        <button onClick={handleLogout} className='mr-3 bg-indigo-600 text-white text-xs md:text-sm py-1 px-2 rounded md:ml-8 hover:bg-indigo-400 duration-500'>
                            ログアウト
                        </button>
                    : 
                        <button onClick={() => navigate('/login-register')} className='mr-3 bg-indigo-600 text-white text-xs md:text-sm py-1 px-2 rounded hover:bg-indigo-400 duration-500'>
                            サインイン
                        </button>
                    }
                    <a href='/notification' className='hover:bg-gray-200 rounded p-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </a>
                    <a href='/user-profile'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </a>
                </div>
            </div>
            { alertState.alert.showAlert ? <Alert type={alertState.alert.newalert.type} message={alertState.alert.newalert.message}/> : '' }
        </div>
    )
}

export default Navbar;