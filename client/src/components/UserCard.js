import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setTalkRequestNotification } from '../actions/auth'

const UserCard = ({ id, name, email, status }) => {

    const dispatch = useDispatch()
    const getStateFromStore = useSelector(userAuth => userAuth)
    const sender = getStateFromStore.userAuth.user._id
    const receiver = id
    const message = "Hello world from here!!!"
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`user/${id}`)
    }

    const sendTalkRequest = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:8000/apiV1/send-request',
            data: { sender, receiver, message }
          })
          .then(response => {
              console.log(response.data.message)
              dispatch(setTalkRequestNotification(response.data.message))
          })
          .catch(error => {
              console.error(error)
          })
    }

    return (
        <div className=' bg-white p-3 m-5 w-auto rounded shadow-lg text-gray-900　border-1 border border-gray-200'>
            <div className='flex items-center border border-1 border-gray-300 p-1'>
                <div className='mr-2'>
                    <img className='w-20 h-20 border border-2 border-gray-300 rounded-full' src='https://avatars.githubusercontent.com/u/16211217?v=4'/>
                </div>
                <div>
                    <div>
                    <small>Name: {' '} {name}</small>
                    </div>
                    <div>
                    <small>Email: {' '} {email}</small>
                    </div>
                    <div>
                        <small className={status == 0 ? 'text-red-900' : status == 1 ? 'text-blue-900' : status == 2 ? 'text-green-900' : null }>Status: {' '} {status}</small>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between border border-1 border-gray-300 mt-3 p-1'>
                <button className='bg-blue-600 text-white rounded text-sm p-1 hover:bg-blue-300' onClick={sendTalkRequest}>Send talk request</button>
                <button className='bg-blue-600 text-white rounded text-sm p-1 hover:bg-blue-300' onClick={handleClick}>View profile</button>
            </div>
        </div>
    )
}

export default UserCard