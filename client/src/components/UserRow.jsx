import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserRow = ({ id, name, email, status, companyName}) => {

    const navigate = useNavigate()
    const [userStatus, setUserStatus] = useState('')
    const [statusColor, setStatusColor] = useState('')

    let temp1, temp2
    
    useEffect(() => {
        temp1 = status === '0' ? "Do not want to talk" : status === '1' ? "Ready to talk" : status === '2' ? "Let's talk" : null
        setUserStatus(temp1)
        temp2 = status === '0' ? "bg-red-200 text-red-800" : status === '1' ? "bg-yellow-200 text-yellow-800" : status === '2' ? "bg-green-200 text-green-800" : null
        setStatusColor(temp2)
    }, [])

    return (
        <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <a className='font-bold text-blue-500 hover:underline' onClick={() => navigate(`/user-profile/${id}`)}>{name}</a>
            </td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                {email}
            </td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <span className={`p-1.5 text-xs uppercase 
                tracking-wide ${statusColor} rounded-lg bg-opacity-50`}>{userStatus}</span>
            </td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                {companyName}
            </td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <button className='rounded-lg bg-green-400 px-3 py-1 text-gray-700 font-semibold'>Send request</button>
            </td>
        </tr>
    )
}

export default UserRow