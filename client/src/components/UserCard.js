import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ key, id, name, Companyname, skills }) => {
    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`user/${id}`)
    }

    return (
        <button className='flex bg-white p-3 m-5 rounded shadow-lg text-gray-900　 hover:bg-slate-100 border-1 border border-gray-200' 
            onClick={handleClick} style={{minWidth: '300px'}}>
            <div className='flex items-center'>
                <div className='mr-2'>
                    <img className='w-20 h-20 border border-2 border-gray-300 rounded-full' src='https://avatars.githubusercontent.com/u/16211217?v=4'/>
                </div>
                <div>
                    <div>
                    <small>名前: {' '} {name}</small>
                    </div>
                    <div>
                    <small>会社名: {' '} {Companyname}</small>
                    </div>
                    <div>
                    <small>スキル: {' '} {skills}</small>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default UserCard