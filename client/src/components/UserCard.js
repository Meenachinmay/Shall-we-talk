import React from 'react'

const UserCard = ({ name, Companyname, skills}) => {
    return (
        <div className='bg-white p-3 m-5 rounded shadow-lg text-gray-900'>
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
        </div>
    )
}

export default UserCard