import React, { useState } from 'react'

const Users = () => {

    const [showVSpace, setShowVSpace] = useState(false)
    
    return (
        <div className='p-5 h-screen bg-gray-100'>
            <div className='flex flex-col flex-grow sm:flex-row sm:items-center'>
                <h1 className='text-xl mb-2 sm:mr-8'>Logged in User's List</h1>
                <button onClick={() => setShowVSpace(!showVSpace)} className='text-xs mb-2 underline text-indigo-600'>Switch between virtual map and list view</button>
            </div>
            {/* for non mobile devices */}
            { !showVSpace ? <div className='overflow-auto rounded-lg shadow hidden md:block' style={{ maxHeight: '600px'}}>
                <table className='w-full'>
                        <thead className='bg-gray-50 border-b-2 border-gray-200'>
                            <tr>
                                <th className='w-20 p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email</th>
                                <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                                <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Company</th>
                                <th className='w-32 p-3 text-sm font-semibold tracking-wide text-left'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            <tr className='bg-white'>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <a className='font-bold text-blue-500 hover:underline' href='/user-profile'>Chinmay anand</a>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    chinmayanand896@icloud.com
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <span className='p-1.5 text-xs font-medium uppercase 
                                    tracking-wide text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50'>Ready</span>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    Real connect
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <button className='rounded-lg bg-green-400 px-3 py-1 text-gray-700 font-semibold'>Send request</button>
                                </td>
                            </tr>
                            <tr className='bg-white'>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <a className='font-bold text-blue-500 hover:underline' href='#'>Ayumu Oshiro</a>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    ayumuoshiro@real-cnt.com
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <span className='p-1.5 text-xs font-medium uppercase 
                                    tracking-wide text-green-800 bg-green-200 rounded-lg bg-opacity-50'>Let's talk</span>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    Real connect
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                     <button className='rounded-lg bg-green-400 px-3 py-1 text-gray-700 font-semibold'>Send request</button>
                                </td>
                            </tr>
                            <tr className='bg-white'>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <a className='font-bold text-blue-500 hover:underline' href='#'>Mahima Chaudhary</a>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    mahima@real-cnt.com
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <span className='p-1.5 text-xs font-medium uppercase 
                                    tracking-wide text-red-800 bg-red-200 rounded-lg bg-opacity-50'>Not now</span>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    Real connect
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <button className='rounded-lg bg-green-400 px-3 py-1 text-gray-700 font-semibold'>Send request</button>
                                </td>
                            </tr>
                        </tbody>
                    
                </table>
            </div> : 
            <div className='overflow-auto rounded-lg shadow' style={{ maxHeight: '600px'}}>
                you have clicked on the show virtual space button, here we will show the virtual space map.
            </div>
            }

            {/* for mobile devices */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden'>
                <div className='bg-white space-y-3 p-4 rounded-lg shadow'>
                    <div className='flex items-center space-x-2 text-sm'>
                        <div>
                            <a href='#' className='text-blue-500 font-bold hover:underline'>Chinmay anand</a>
                        </div>
                        <div className='text-gray-500'>Real connect</div>
                        <div>
                        <span className='p-1.5 text-xs font-medium uppercase 
                                tracking-wide text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50'>Ready</span>
                        </div>
                    </div>
                    <div className='text-sm text-gray-700'>
                        chinmayanand896@icloud.com
                    </div>
                    <div className='text-sm font-medium text-black'>
                        <button className='rounded-lg bg-green-400 px-3 py-1 text-gray-700 font-semibold'>Send request</button>
                    </div>
                </div>
                <div className='bg-white space-y-3 p-4 rounded-lg shadow'>
                    <div className='flex items-center space-x-2 text-sm'>
                        <div>
                            <a href='#' className='text-blue-500 font-bold hover:underline'>Ayumu oshiro</a>
                        </div>
                        <div className='text-gray-500'>Real connect</div>
                        <div>
                        <span className='p-1.5 text-xs font-medium uppercase 
                                tracking-wide text-green-800 bg-green-200 rounded-lg bg-opacity-50'>Let's talk</span>
                        </div>
                    </div>
                    <div className='text-sm text-gray-700'>
                        ayumuoshiro@real-cnt.com
                    </div>
                    <div className='text-sm font-medium text-black'>
                        <button className='rounded-lg bg-green-400 px-3 py-1 text-gray-700 font-semibold'>Send request</button>
                    </div>
                </div>
                <div className='bg-white space-y-3 p-4 rounded-lg shadow'>
                    <div className='flex items-center space-x-2 text-sm'>
                        <div>
                            <a href='#' className='text-blue-500 font-bold hover:underline'>Mahima Chaudhary</a>
                        </div>
                        <div className='text-gray-500'>Real connect</div>
                        <div>
                        <span className='p-1.5 text-xs font-medium uppercase 
                                tracking-wide text-red-800 bg-red-200 rounded-lg bg-opacity-50 '>Not now</span>
                        </div>
                    </div>
                    <div className='text-sm text-gray-700'>
                        mahima@real-cnt.com
                    </div>
                    <div className='text-sm font-medium text-black'>
                        <button className='rounded-lg bg-green-400 px-3 py-1 text-gray-700 font-semibold'>Send request</button>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Users;