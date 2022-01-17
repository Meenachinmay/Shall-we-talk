import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import UserCard from '../components/UserCard'

import axios from 'axios'

const Home = () => {

    const test = []

    // here we will feetch all the logged in users and then pass them one by one to the UserCard
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/apiV1/get-all-profiles`,
            data: { }
          })
          .then(response => {
              const res = response.data.profiles
             
              for (var i = 0; i < res.length; i ++){
                test.push(res[i])
              }

              test.map(item => (
                  console.log(item.user.username)
              ))
          })
          .catch(error => {
              console.error(error)
          })
    },[])
    
    const name = 'Chinmay anand'
    const Companyname = 'Real connect'
    const skills = 'javascript, java, c++'
    const id = '121212112121212121121'
    const id2 = '232323232323323232323'

    return (
        <div>
            <div className='flex min-h-screen items-center justify-center'>
                <div className='flex-shrink-0 bg-white p-5 rounded shadow-xl w-auto overflow-scroll' style={{ maxHeight: '500px'}}>
                    <div className='text-center text-2xl text-gray-900 font-semibold'>ユーザーリスト</div>
                    {
                        test.map((item, index) => (
                            <UserCard key={item._id} id={item._id} name={item.user.username} Companyname={item.company_name} skills={item.skills}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Home