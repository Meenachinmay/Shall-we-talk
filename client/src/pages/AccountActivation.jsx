import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { accountActivate } from '../actions/user'

const AccountActiviation = () => {
    
    let { auth_token } = useParams()
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.user)

    const handleAccountActiviate = () => {
        dispatch(accountActivate(auth_token))
    }

    return (
        <div className="h-screen bg-indigo-600">
            <div className='flex items-center justify-center'>
                <button onClick={handleAccountActiviate} className='mt-12 p-5 bg-white text-indigo-600 font-semibold rounded-md'>Activate your account here</button>
            </div>
        </div>
    )
}

export default AccountActiviation