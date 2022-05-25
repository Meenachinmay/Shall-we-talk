import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const UserSettingsPage = () => {

    const navigate = useNavigate()
    const params = useParams()

    return (
        <div className='container mx-auto'>
            <div className='flex justify-center px-4'>
                <div className='flex flex-col justify-center space-y-10 sm:border sm:border-gray-200 mt-12 sm:mt-48 p-8 sm:p-10 rounded w-full sm:w-1/4 items-center'>
                    <div className=''>
                        <button onClick={() => navigate(`/create-new-user-profile/${params.user_id}`)} className='w-[350px] sm:w-[300px] bg-indigo-600 text-white font-bold py-1 px-2 rounded hover:bg-indigo-400'>
                            Create new Profile
                        </button>
                    </div>
                    <div>
                        <button onClick={() => navigate(`/edit-profile/${params.user_id}`)} className='w-[350px] sm:w-[300px] bg-indigo-600 text-white font-bold py-1 px-2 rounded hover:bg-indigo-400'>
                            Edit/Update profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettingsPage