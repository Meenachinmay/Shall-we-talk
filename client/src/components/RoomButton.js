import React from 'react'

import axios from 'axios'

const RoomButton = ({ name, roomid, takenBy }) => {


    const handleClick = () => {
        axios({
            method: 'POST',
            url: `http://localhost:8000/apiV1/occupiy-a-room`,
            data: { name, roomid, takenBy }
        }).then(response => {
            console.log(response.data.message)
        }).catch(error => {
            console.log(error)
        })
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