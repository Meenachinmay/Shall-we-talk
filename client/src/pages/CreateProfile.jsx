import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const CreateProfile = () => {

    const params = useParams()
    const navigate = useNavigate()

    return (
        <div className='container mx-auto'>
            <div className='flex justify-center'>
                <div className='p-2 sm:p-8 bg-white mt-12 border border-gray-200 rounded w-3/4 sm:w-2/4 shadow-md'>
                    <span className='text-indigo-600 font-semibold text-xl'>Create new profile</span>
                    <div className='flex flex-col justify-start mt-2 space-y-2'>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Age:
                            </div>
                            <div>
                                <input type='text' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Gender:
                            </div>
                            <div>
                                <input type='text' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Company Name:
                            </div>
                            <div>
                                <input type='text' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Company Profile:
                            </div>
                            <div>
                                <input type='text' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Skills:
                            </div>
                            <div>
                                <input type='text' className='text-sm py-1 px-2 border border-gray-200 rounded w-full' placeholder='Please type skills with commas'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm text-gray-400'>
                                Introduction:
                            </div>
                            <div>
                                <textarea rows={4} type='text' className='text-sm py-1 px-2 border border-gray-200 rounded w-full'/>
                            </div>
                        </div>
                        <button className='text-sm bg-indigo-600 w-full rounded text-white py-1 px-2 hover:bg-indigo-400'>
                            Create new profile
                        </button>
                        <div onClick={() => navigate(-1)} className='text-sm bg-red-600 w-full rounded text-white text-center py-1 px-2 hover:bg-indigo-400'>
                           Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProfile