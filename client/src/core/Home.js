import React from 'react'
import { useSelector } from 'react-redux'

import UserCard from '../components/UserCard'

import axios from 'axios'

const Home = () => {
    
    // const authState = useSelector(userAuth => userAuth)
    // const user = authState.userAuth.user._id
    // const handleSubmit = () => {
    //     axios({
    //         method: 'POST',
    //         url: `http://localhost:8000/apiV1/get-user-profile`,
    //         data: { user }
    //       })
    //       .then(response => {
    //           console.log(response.data.userProfile)
    //       })
    //       .catch(error => {
    //           console.error(error)
    //       })
    // }
    const name = 'Chinmay anand'
    const Companyname = 'Real connect'
    const skills = 'javascript, java, c++'
    return (
        <div>
            <div className='min-h-screen flex items-center justify-center'>
                <div className='bg-gray-500 p-5 rounded shadow-xl w-1/4'>
                    <div className='text-center text-2xl text-white font-semibold'>All users</div>
                    <UserCard name={name} Companyname={Companyname} skills={skills}/>
                </div>
            </div>
        </div>
    )
}

export default Home