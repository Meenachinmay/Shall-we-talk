import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditProfile = () => {
    
    const { user_id } = useParams()
    const navigate = useNavigate()

    return (
        <div className='container mx-auto'>
            <div className='flex justify-center'>
                <div className='p-2 sm:p-8 bg-white mt-12 border border-gray-200 rounded w-3/4 sm:w-2/4 shadow-md'>
                    <span className='text-indigo-600 font-semibold text-xl'>Edit profile</span>
                    <div className='flex flex-col justify-start mt-2 space-y-2'>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Password:
                            </div>
                            <div>
                                <input type='password' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Confirm password:
                            </div>
                            <div>
                                <input type='password' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Company name:
                            </div>
                            <div>
                                <input type='password' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Company profile:
                            </div>
                            <div>
                                <input type='password' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                age:
                            </div>
                            <div>
                                <input type='password' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <button className='text-sm bg-indigo-600 w-full rounded text-white py-1 px-2 hover:bg-indigo-400'>
                            Update profile
                        </button>
                        <div onClick={() => navigate(`/user-profile/${user_id}`)} className='text-sm bg-red-600 w-full rounded text-white text-center py-1 px-2 hover:bg-indigo-400'>
                           キャンセル
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile