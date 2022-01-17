import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/solid'
import { register } from '../actions/auth'

const Register = () => {

    const [values, setValues] = useState({
        username:'',
        email:'',
        password:'',
    })

    // useSelector hook from redux to get the state from redux store
    const isAuth = useSelector(userAuth => userAuth)
    //initialize useDispatch hook - this will help to dipatch an action to reducers
    const dispatch = useDispatch()
    //navigate from react-router-dom to navigate the user
    const navigate = useNavigate()

    const { username, email, password } = values

    const handleChange = (name) => (event) =>{
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(register({username, email, password}))
    }

    // useEffect hook to call navigate method to redirect user to home page if they are logged in already
    useEffect (() => {
      if (isAuth.userAuth.isAuth === true){
        navigate('/')
      }
    },[isAuth.userAuth.isAuth])

  return (
    <>
    <form>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mt-20 max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">新規アカウントを作成</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="text" className="sr-only">
                    Username
                    </label>
                    <input
                    onChange={handleChange('username')} 
                    value={username}
                    id="username"
                    name="usernami"
                    type="text"
                    autoComplete="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="お名前"
                    />
                </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={handleChange('email')} 
                  value={email}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="メールアドレス"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                    onChange={handleChange('password')} 
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="パスワード"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                サインアップ
              </button>
            </div>
          </form>
        </div>
      </div>
      </form>
    </>
  )
}

export default Register