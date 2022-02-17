import React from 'react'

const RoomButton = ({ name, roomid, takenBy,  }) => {
    return (
        <div>
            <button className='border-2 border-gray-500 rounded p-1' style={{ fontSize: '12px' }}>{name}</button>
        </div>
    )
}

export default RoomButton