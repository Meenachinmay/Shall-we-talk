import React from 'react'

const FlashMessage = () => {
    const message = 'This is a flash message'
    return (
        <div>
            <div className="flex p-4 bg-green-600 text-white justify-center top-0 bottom-0">
                {message}
            </div>
        </div>
    )
}

export default FlashMessage