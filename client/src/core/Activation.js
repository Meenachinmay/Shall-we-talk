import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'
import { LockClosedIcon } from '@heroicons/react/solid'

const Activation = () => {
    const { token } = useParams()

    const [values, setValues] = useState({
        username: '',
        token:'',
        show: true
    })


    const handleSubmit = event => {
        event.preventDefault()

        console.log(token)

        axios({
            method: 'POST',
            url: `http://localhost:8000/apiV1/account-activation`,
            data: { token }
        })
        .then(response => {
            console.log("Acount activation", response.data)
            setValues({...values, show: false})
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }

  return (
    <>
    <form>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
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
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
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