import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { accountActivation } from '../actions/auth'

const Activation = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    // useDispatch to call the action REGISTER_SUCCESS
    const isAuth = useSelector(userAuth => userAuth)
    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(accountActivation({token}))
        if (isAuth.userAuth.error && isAuth.userAuth.message === null) {
          navigate('/')
        }
        if (isAuth.userAuth.message) {
          navigate('/login')
        }
    }

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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">アカウントActivation</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Activate
              </button>
            </div>
          </form>
        </div>
      </div>
      </form>
    </>
  )
}

export default Activation