import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import axios from 'axios'

const UserProfile = () => {
    const { userid } = useParams()
    const [user, setUser] = useState({
        username:'',
        email:'',
        gender:'',
        profile_image:'',
        company_name:'',
        company_profile:'',
        skills:'',
        introduction:'',
        user_status:''
    })

    const token = localStorage.getItem('token')

    useEffect(() => {
        axios({
            method: 'POST',
            url: `http://localhost:8000/apiV1/get-user-profile`,
            data: { token, userid }
          })
          .then(response => {
              const data = response.data.userProfile
              setUser({
                  username: data.user.username,
                  email: data.user.email,
                  gender: data.gender,
                  profile_image: data.profile_image,
                  company_name: data.company_name,
                  company_profile: data.company_profile,
                  skills: data.skills,
                  introduction: data.introduction,
                  user_status: data.user_status
              })
          })
          .catch(error => {
              console.error(error)
          })
    }, [userid])

    return (
        <div>
            <div className='flex min-h-screen items-center justify-center'>
            <div className='bg-white p-5 rounded shadow-xl overflow-scroll' style={{width: '740px', minWidth:'440px'}}>
                <div className='text-center text-2xl text-gray-900 font-semibold mb-4'>ユーザープロフィール</div>
                <div className='flex items-center'>
                    <div className='mr-2'>
                        <img className='mr-5 w-32 h-32 border border-2 border-gray-300 rounded-full' src={user.profile_image}/>
                        </div>
                            <div>
                                <div>
                                <small className='font-semibold'>Name: {' '} {user.username}</small>
                                </div>
                                <div>
                                <small className='font-semibold'>email: {' '} {user.email}</small>
                                </div>
                                <div>
                                <small className='font-semibold'>Gender: {' '} {user.gender}</small>
                                </div>
                                <div>
                                <small className='font-semibold'>Companyname: {' '} {user.company_name}</small>
                                </div>
                                <div>
                                <small className='font-semibold'>CompanyProfile: {' '} {user.company_profile}</small>
                                </div>
                                <div>
                                <small className='font-semibold'>skills: {' '} {user.skills}</small>
                                </div>
                                <div className='text-clip font-semibold'>
                                <small>Introduction: {' '} {user.introduction}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default UserProfile