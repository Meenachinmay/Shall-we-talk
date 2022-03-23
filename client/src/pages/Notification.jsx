import React from 'react'

const Notification = () => {
    return (
        <div className='container mx-auto flex flex-col items-center justify-center'>
            <div className='mt-12 w-3/4 p-4 md:p-8 bg-white border-1 shadow-lg rounded-lg overflow-y-scroll' style={{ maxHeight: '600px'}}>
                <div className='flex flex-col overflow-clip space-y-2 mb-2 border border-gray-200 p-2 rounded'>
                    <span className='text-sm text-gray-800 font-semibold'>Notification content - title</span>
                    <span className='text-xs text-gray-400'>description - User a accepted your talk request.</span>
                </div>
                <div className='flex flex-col overflow-clip space-y-2 mb-2 border border-gray-200 p-2 rounded'>
                    <span className='text-sm text-gray-800 font-semibold'>Notification content - title</span>
                    <span className='text-xs text-gray-400'>description - User b rejected your talk request.</span>
                </div>
                <div className='flex flex-col overflow-clip space-y-2 mb-2 border border-gray-200 p-2 rounded'>
                    <span className='text-sm text-gray-800 font-semibold'>Notification content - title</span>
                    <span className='text-xs text-gray-400'>description - User a accepted your talk request.</span>
                </div>
                <div className='flex flex-col overflow-clip space-y-2 mb-2 border border-gray-200 p-2 rounded'>
                    <span className='text-sm text-gray-800 font-semibold'>Notification content - title</span>
                    <span className='text-xs text-gray-400'>description - User a accepted your talk request.</span>
                </div>
                <div className='flex flex-col overflow-clip space-y-2 mb-2 border border-gray-200 p-2 rounded'>
                    <span className='text-sm text-gray-800 font-semibold'>Notification content - title</span>
                    <span className='text-xs text-gray-400'>description - User a accepted your talk request.</span>
                </div>
            </div>
        </div>
    )
}

export default Notification