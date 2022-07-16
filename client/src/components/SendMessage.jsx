import axios from 'axios'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { checkIfUserHasAConversation } from '../utilityMethods/BackendUtilitiesMethods'

const SendMessage = () => {

    const [message, setMessage] = useState('')
    let { receiver_id, receiver_name } = useParams()
    const navigate = useNavigate()

    const loadUserFromReduxState = useSelector(state => state.user)

    /*
        If currently logged in user is already not having a conversation with the user then first create a conversation and then send a message.
        when you send a messasge to a user, then at the backend check if you are already having a conversation with the user if Yes then add the new message to that conversation or else create
        a new conversation first and then add a new message.
    */

    const sendMessage = () => {
        const conversationFound = checkIfUserHasAConversation()

        if (conversationFound) {
            try {
                axios({
                    method: 'POST',
                    url: `http://localhost:8000/apiV1/send-new-message`,
                    data: {conversation: conversationFound._id, content: message},
                    headers: { authorizaion: localStorage.getItem('token')}
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            // first create a conversation and then add message
            try {
                axios({
                    method: 'POST',
                    url: `http://localhost:8000/apiV1/create-new-conversation`,
                    data: { sender: loadUserFromReduxState.user._id, receiver: receiver_id},
                    headers: { authorizaion: localStorage.getItem('token')}
                })
                .then(response => {
                    
                })
            } catch (error) {
                console.log(error)
            }
        }
        setMessage('')
    }

    return (
        <div className=''>
            <div className='flex items-center justify-center p-4 md:p-10'>
                <div className='bg-white rounded-lg p-4 md:p-8 text-gray-800 mt-24 shadow-lg w-full md:w-3/4 z-10'>
                    <div className='flex items-center text-xl mb-2 text-indigo-600'>
                        <p className='cursor-pointer hover:underline' onClick={() => navigate(`/user-profile/${receiver_id}`)}>{receiver_name}</p>
                        <p className='text-gray-400 text-sm ml-3'>にメッセージをおくります</p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} className='w-full md:w-full p-4 md:p-8 text-gray-800 text-sm md:text-xl text-clip' type="text" placeholder='メッセージを入力してください...'/>
                    </div>
                    <div className='flex flex-col sm:space-y-0 space-y-2 items-center justify-center sm:flex-row sm:justify-between mt-8'>
                        <button disabled={message === '' ? true : false} onClick={() => sendMessage()} className='py-1 px-6 bg-indigo-600 text-white rounded hover:bg-indigo-400'>
                            送信
                        </button>
                        <button onClick={() => navigate(`/user-profile/${receiver_id}`)} className='py-1 px-6 bg-indigo-600 text-white rounded hover:bg-indigo-400'>
                            キャンセル
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMessage
