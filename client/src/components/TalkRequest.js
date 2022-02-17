import React from 'react'

const TalkRequest = ({id, name}) => {

    const handleAcceptRequest = () => {
        alert ('request accepted')
    }

    const handleRejectRequest = () => {
        alert ('request rejected')
    }

    return (
        <div className='p-2 text-sm text-clip border border-gray-300 mb-1 font-bold'>
            <p className='overflow-hidden'>{name}</p>
            <div className='flex items-center justify-between mt-1'>
                <button className='p-1 bg-green-900 text-white rounded' onClick={handleAcceptRequest}>
                    Accept
                </button>
                <button className='p-1 bg-red-900 text-white rounded' onClick={handleRejectRequest}>
                    Reject
                </button>
            </div>
        </div>
    )
}

export default TalkRequest