import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, userRegister } from '../actions/user'
import { useNavigate } from 'react-router-dom'

import * as yup from 'yup';

const LoginRegister = () => {
    
    // getting react hooks
    const dispatch = useDispatch()
    const loadeduser = useSelector(state => state.user)
    const navigate = useNavigate()

    // getting data from redux store
    const { user, loading, error, login, logout } = loadeduser

    // states for login
    const [checkbox, setCheckBox] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // states for register
    const [name, setName] = useState('')
    const [emailRegister, setEmailRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')

    // schemas for validation check
    let loginSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    })

    let registerSchema = yup.object().shape({
        name: yup.string().required().max(36),
        email: yup.string().email().required(),
        password: yup.string().required()
    })

    useEffect(() => {
        if ( localStorage.getItem('token') || login) {
            navigate('/')
        }
    })

    const handleLogin = () => {
        dispatch(userLogin(email, password))
        if ( login ) {
            navigate('/')
        }
    }

    const handleRegister = () => {
        dispatch(userRegister(name, emailRegister, passwordRegister))
        
    }

    return (
        <div className='container mx-auto'>
           <div className='flex flex-col sm:flex sm:flex-row items-center justify-center sm:space-x-2 space-x-0 p-10'>
               
               {/* Login screen */}
                <div className='flex flex-grow flex-col mt-12 w-full sm:w-1/3 p-10 bg-white border-1 shadow-lg rounded-lg' style={{height: '400px'}}>
                    <div className='flex flex-col items-center justify-center pt-8 text-center'>
                        <h1 className='text-3xl text-indigo-600'>ログイン</h1>
                        <span className='text-xs text-gray-400'>お使いのメールアドレスやパスワードでログイン</span>
                    </div>
                    <div className='flex flex-col mt-8 space-y-2'>
                        <div className='flex flex-col items-center justify-start space-x-2'>
                            <input onChange={(e) => setEmail(e.target.value)} className='border border-gray-400 rounded focus:outline-none px-2 py-1 w-full' type="text" placeholder="メールを入力ください" />
                        </div>
                        <div className='flex flex-col items-center space-x-2'>
                            <input onChange={(e) => setPassword(e.target.value)} className='border border-gray-400 rounded focus:outline-none px-2 py-1 w-full' type="password" placeholder="パスワードを入力ください" />
                        </div>
                    </div>
                    <div onClick={handleLogin} className='bg-indigo-600 text-center p-1 mt-4 rounded text-white cursor-pointer hover:bg-indigo-400'>
                        ログイン
                    </div>
                    <div className='flex items-center mt-4 space-x-2'>
                        <input type='checkbox' className='' onChange={(e) => setCheckBox(e.target.checked)}/>
                        <span className='text-sm text-gray-400'>ログインしたまま</span>
                    </div>
                    <a className='text-sm text-gray-400 mt-2 hover:underline cursor-pointer hover:text-indigo-600'>パスワードを忘れた場合</a>
                </div>

                <span className='hidden sm:block text-indigo-600 text-2xl p-4'>又は</span>
                
                {/* Register screen */}
                <div className='flex flex-grow flex-col mt-12 w-full sm:w-2/6 p-10 bg-white border-1 shadow-lg rounded-lg' style={{height: '400px'}}>
                    <div className='flex flex-col items-center justify-center pt-8 text-center'>
                    <h1 className='text-3xl text-indigo-600'>新規登録</h1>
                    <span className='text-xs text-gray-400'>新規登録の場合はこちらのほうです</span>
                    </div>
                    <div className='flex flex-col mt-8 space-y-2'>
                        <div className='flex flex-col items-center justify-start space-x-2'>
                            <input onChange={(e) => setName(e.target.value)} className='border border-gray-400 rounded focus:outline-none px-2 py-1 w-full' type="text" placeholder="お名前を入力ください" required/>
                        </div>
                        <div className='flex flex-col items-center space-x-2'>
                            <input onChange={(e) => setEmailRegister(e.target.value)} className='border border-gray-400 rounded focus:outline-none px-2 py-1 w-full' type="email" placeholder="メールを入力ください" required/>
                        </div>
                        <div className='flex flex-col items-center justify-start space-x-2'>
                            <input onChange={(e) => setPasswordRegister(e.target.value)} className='border border-gray-400 rounded focus:outline-none px-2 py-1 w-full' type="password" placeholder="パスワードを入力ください" required/>
                        </div>
                        <div onClick={handleRegister} className='bg-indigo-600 text-center p-1 mt-4 rounded text-white cursor-pointer hover:bg-indigo-400'>
                            行動
                        </div>
                    </div>
                </div>

           </div>
        </div>
    )
}   

export default LoginRegister