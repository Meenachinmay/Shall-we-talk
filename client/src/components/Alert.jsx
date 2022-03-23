import React from 'react'

const Alert = ({ type }) => {
    if ( type === 'success') {
        return (    
            <div>
                <div className='flex justify-center items-center text-center p-4 bg-green-600 text-white font-semibold duration-500'>
                    This is an success alert message.
                </div>
            </div>
        )
    }

    if ( type === 'danger') {
        return (    
            <div>
                <div className='flex justify-center items-center text-center p-4 bg-red-600 text-white font-semibold duration-500'>
                    This is an danger alert message.
                </div>
            </div>
        )
    }

}

export default Alert