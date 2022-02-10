import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { loadUser, setUserStatus } from '../actions/auth'
import { setTalkRequestNotification } from '../actions/auth'

import UserCard from '../components/UserCard'
import TalkRequest from '../components/TalkRequest'

import axios from 'axios'
import io from 'socket.io-client'
import EVENTS from '../config/default'

const socket = io('http://localhost:8000')

const Home = () => {
    const [users, setUsers] = useState([])
    const [new_request_notification, setDataNewRequestNotification] = useState('')
    const [new_request_sender, setNewRequestSender] = useState('')
    const [msg, setMsg] = useState()
    const dispatch = useDispatch()
    const loggedinuser = useSelector(userAuth => userAuth)
    const getTalkRequestFeed = useSelector(talkRequestNotification => talkRequestNotification)
    const loggedInUserStatus = loggedinuser.userAuth.user.status
    const loggedInUserPendingRequests = loggedinuser.userAuth.user.pendingRequests
    const loggedInUserAcceptedRequests = loggedinuser.userAuth.user.acceptedRequests
    const loggedInUserRejectedRequests  = loggedinuser.userAuth.user.rejectedRequested
    

    // here we will feetch all the logged in users and then pass them one by one to the UserCard
    useEffect( async () => {
        console.log ('useeffect rendered')
    
        // all the socket events
        socket.on('status_change', ({ message, current_status }) => {
            setMsg(current_status)
            console.log(message + ' ' + current_status)
        })

        // get this event from server and update the user activity feed
        socket.on('new_request', (new_request_data) => {
            dispatch(setTalkRequestNotification(new_request_data.new_request_notification))
            setDataNewRequestNotification(new_request_data.new_request_notification)
            setNewRequestSender(new_request_data.request_sender)
        })

        dispatch(setUserStatus(loggedInUserStatus))
        
        // write flash here
        console.log('loading...')

        axios({
            method: 'GET',
            url: `http://localhost:8000/apiV1/get-all-logged-in-users`,
            data: { }
          })
          .then(response => {
            // remove flash here
            console.log('loding is done...')

            const res = response.data.users
            Array.from(res)
            setUsers(res)
          })
          .catch(error => {
              console.error(error)
          })
          console.log('just before return')
          return () => socket.off()
    },[msg])

    // remove current user from logged in users list, we do not want to render current logged in user in the list
    const filteredUsers = users.filter(item => item._id !== loggedinuser.userAuth.user._id)

    return (
        <div>
            <div className='flex min-h-screen items-center justify-center'>
                <div className='bg-white p-5 rounded shadow-xl overflow-scroll' style={{ maxHeight: '500px', minWidth: '500px'}}>
                    <div className='text-center text-2xl text-gray-900 font-semibold'>ユーザーリスト</div>
                    {
                        filteredUsers.map((item, index) => (
                            <UserCard key={item._id} id={item._id} name={item.username} email={item.email} status={item.status}/>
                        ))
                    }
                    </div>
                    <div className='bg-white p-3 rounded shadow-xl ml-10 overflow-scroll' style={{ minWidth: '300px', maxWidth: '300px', minHeight: '300px', maxHeight: '300px'}}>
                        <div className='border-b-2 p-1 text-center mb-2 font-semibold'>User activity feed</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>
                            {new_request_sender === loggedinuser.userAuth.user._id ? 
                                <p>{new_request_notification}</p> : 'no recent updates for you'}
                        </div>
                    </div>
                    <div className='bg-white p-3 rounded shadow-xl ml-10 overflow-scroll' style={{ minWidth: '300px', maxWidth: '300px', minHeight: '300px', maxHeight: '300px'}}>
                        <div className='border-b-2 p-1 text-center mb-2 font-semibold'>Request manager</div>
                        <TalkRequest name={'Ayumu oshiro'}/>
                        <TalkRequest name={'Chinmay'}/>

                    </div>
            </div>
        </div>
    )
}
export default Home