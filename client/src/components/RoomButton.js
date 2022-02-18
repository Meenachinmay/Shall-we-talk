import React from 'react'

const RoomButton = ({ name, roomid, takenBy }) => {

    const handleClick = () => {
        alert (takenBy)
    }

    return (
        <div>
            <button className='border-2 border-gray-500 rounded p-1 mb-1' style={{ fontSize: '12px' }} 
                onClick={handleClick}
            >{name}</button>
        </div>
    )
}

export default RoomButton