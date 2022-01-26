import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUserStatus } from '../actions/auth'

import UserCard from '../components/UserCard'

import axios from 'axios'
import io from 'socket.io-client'
import EVENTS from '../config/default'

const socket = io('http://localhost:8000')

const Home = () => {
    const [users, setUsers] = useState([])
    const [msg, setMsg] = useState()
    const dispatch = useDispatch()
    const loggedinuser = useSelector(userAuth => userAuth)
    const getTalkRequestFeed = useSelector(talkRequestNotification => talkRequestNotification)
    const loggedInUserStatus = loggedinuser.userAuth.user.status
    

    // here we will feetch all the logged in users and then pass them one by one to the UserCard
    useEffect( async () => {
        console.log ('useeffect rendered')
    
        socket.on('status_change', ({ message, current_status }) => {
            setMsg(current_status)
            console.log(message + ' ' + current_status)
        })

        socket.on('new_request', ({new_request_notification}) => {
            
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
                            {getTalkRequestFeed.talkRequestNotification.talk_request_notification}
                        </div>
                        {/* <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Rohan anand rejected your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Ayumu oshiro rejected your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Chinmay anand accepted your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Rohan anand rejected your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Ayumu oshiro rejected your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Chinmay anand accepted your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Rohan anand rejected your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Ayumu oshiro rejected your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Chinmay anand accepted your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Rohan anand rejected your talk request</div>
                        <div className='p-1 text-sm text-clip border border-gray-300 mb-1'>Ayumu oshiro rejected your talk request</div>     */}
                    </div>
            </div>
        </div>
    )
}
export default Home