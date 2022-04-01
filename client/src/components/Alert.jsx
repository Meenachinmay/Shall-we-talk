import React from 'react'

const Alert = ({ type, message }) => {
    if ( type === 'success') {
        return (    
            <div>
                <div className='flex justify-center items-center text-center p-4 bg-green-600 text-white font-semibold duration-500 ease-in-out'>
                    { message }
                </div>
            </div>
        )
    }

    if ( type === 'danger') {
        return (    
            <div>
                <div className='flex justify-center items-center text-center p-4 bg-red-600 text-white font-semibold duration-500'>
                    { message }
                </div>
            </div>
        )
    }

    if ( type === 'info') {
        return (    
            <div>
                <div className='flex justify-center items-center text-center p-4 bg-blue-600 text-white font-semibold duration-500'>
                    { message }
                </div>
            </div>
        )
    }

}

export default Alert