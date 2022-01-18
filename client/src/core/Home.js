import React, { useEffect, useState } from 'react'

import UserCard from '../components/UserCard'

import axios from 'axios'

const Home = () => {

    const [users, setUsers] = useState([])
    // here we will feetch all the logged in users and then pass them one by one to the UserCard
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/apiV1/get-all-logged-in-users`,
            data: { }
          })
          .then(response => {
            const res = response.data.users
            Array.from(res)
            setUsers(res)
          })
          .catch(error => {
              console.error(error)
          })
    },[])

    return (
        <div>
            <div className='flex min-h-screen items-center justify-center'>
                <div className='flex-shrink-0 bg-white p-5 rounded shadow-xl overflow-scroll' style={{ maxHeight: '500px', minWidth: '500px'}}>
                <div className='text-center text-2xl text-gray-900 font-semibold'>ユーザーリスト</div>
                {
                    users.map((item, index) => (
                        <UserCard key={item._id} id={item._id} name={item.username} email={item.email} status={item.status}/>
                    ))
                }
                </div>
            </div>
        </div>
    )
}
export default Home