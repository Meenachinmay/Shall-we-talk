import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ id, name, email, status }) => {
    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`user/${id}`)
    }

    return (
        <button className='flex bg-white p-3 m-5 w-auto rounded shadow-lg text-gray-900　 hover:bg-slate-100 border-1 border border-gray-200' 
            onClick={handleClick} >
            <div className='flex items-center'>
                <div className='mr-2'>
                    <img className='w-20 h-20 border border-2 border-gray-300 rounded-full' src='https://avatars.githubusercontent.com/u/16211217?v=4'/>
                </div>
                <div>
                    <div>
                    <small>Name: {' '} {name}</small>
                    </div>
                    <div>
                    <small>Email: {' '} {email}</small>
                    </div>
                    <div>
                        <small className={status == 0 ? 'text-red-900' : status == 1 ? 'text-blue-900' : status == 2 ? 'text-green-900' : null }>Status: {' '} {status}</small>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default UserCard