import React from 'react'
import { useSelector } from 'react-redux'

import UserCard from '../components/UserCard'

import axios from 'axios'

const Home = () => {
    
    // here we will feetch all the logged in users and then pass them one by one to the UserCard

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
    const id = '121212112121212121121'
    const id2 = '232323232323323232323'
    return (
        <div>
            <div className='flex min-h-screen items-center justify-center'>
                <div className='flex-shrink-0 bg-white p-5 rounded shadow-xl w-auto overflow-scroll' style={{ maxHeight: '500px'}}>
                    <div className='text-center text-2xl text-gray-900 font-semibold'>ユーザーリスト</div>
                    <UserCard id={id} name={name} Companyname={Companyname} skills={skills}/>
                    <UserCard id={id2} name={name} Companyname={Companyname} skills={skills}/>
                    <UserCard name={name} Companyname={Companyname} skills={skills}/>
                    <UserCard name={name} Companyname={Companyname} skills={skills}/>
                    <UserCard name={name} Companyname={Companyname} skills={skills}/>
                    <UserCard name={name} Companyname={Companyname} skills={skills}/>
                    <UserCard name={name} Companyname={Companyname} skills={skills}/>
                    <UserCard name={name} Companyname={Companyname} skills={skills}/>
                </div>
            </div>
        </div>
    )
}
export default Home