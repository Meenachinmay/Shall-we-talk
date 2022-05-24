import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserProfile = () => {
    const navigate = useNavigate()
    const { user_id } = useParams()
    const [userProfile, setUserProfile] = useState({})
    let receiver_name = "Chinmay"
    let receiver_id = user_id

    useEffect(() => {
        const fetchSingleUser = async() => {
            axios({
                method: "POST",
                url: "http://localhost:8000/apiV1/get-user-profile",
                data: { userID: user_id },
                headers: { authorization: localStorage.getItem('token')}
            })
            .then(response => {
                const userProfile = response.data.userProfile
                setUserProfile({...userProfile, userProfile})
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
        }

        fetchSingleUser()

    }, [user_id])
    
    return (
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-center'>
            <div className='mt-12 w-3/4 p-8 bg-white border-1 shadow-lg rounded-lg'>
                <a href='/edit-profile' className='flex justify-end text-sm text-gray-400 hover:underline hover:text-indigo-600 cursor-pointer'>編集</a>
                <div className='flex flex-col items-center justify-center pt-10 text-center'>
                    <img className="shrink-0 w-20 h-20 sm:w-32 sm:h-32 rounded-full" 
                        src='https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png' alt=''/>
                    <h1 className='text-gray-800 font-semibold text-sm sm:text-xl mt-5'>{userProfile.user.name}</h1>
                    <h1 className='text-gray-400 text-xs sm:text-sm'>{userProfile.gender}, {26}歳</h1>
                    <h1 className='text-gray-400 text-xs sm:text-sm'>{userProfile.company_name}, {userProfile.company_profile} 企業</h1>
                    <h1 className='text-gray-400 text-xs sm:text-sm'>{userProfile.skills}</h1>
                    <h1 className='text-gray-400 text-xs sm:text-sm p-4'>
                        {userProfile.introduction}
                    </h1>
                </div>
                <div className='flex items-center justify-between p-4'>
                    <div className='flex items-center space-x-2'>
                        <button onClick={() => alert('Call send request API from backend')} className='text-xs text-gray-800 py-1 px-2 border-2 border-indigo-600 cursor-pointer 
                        hover:border-indigo-400 duration-500 rounded-md'>リクエスト送信</button>
                        {'/'}
                        <button onClick={() => navigate(`/send-message/${receiver_name}/${receiver_id}`)} className='text-xs text-gray-800 py-1 px-2 border-2 border-indigo-600 cursor-pointer
                         hover:border-indigo-400 duration-500 rounded-md'>メッセージ送信</button>
                    </div>
                    <div>
                        <div className='text-xs text-gray-800 py-1 px-2 border-2 border-indigo-600 cursor-pointer
                         hover:border-indigo-400 duration-500 rounded-md'>
                            ステータス情報
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default UserProfile