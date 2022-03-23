import React, { useState } from 'react'

const SendMessage = () => {

    const [message, setMessage] = useState(null)

    const sendMessage = () => {
        alert("Call the message send API" + ` with message ${message}`)
        setMessage(null)
    }
    
    return (
        <div className='container mx-auto'>
            <div className='flex items-center justify-center p-4 md:p-8'>
                <div className='bg-white rounded-lg p-4 md:p-8 text-gray-800 mt-24 shadow-lg w-3/4 z-10'>
                    <div className='flex flex-col items-center justify-center'>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} className='w-full md:w-full p-4 md:p-8 text-gray-800 text-sm md:text-xl text-clip' type="text" placeholder='メッセージを入力してください...'/>
                    </div>
                    <div className='flex flex-col sm:space-y-0 space-y-2 items-center justify-center sm:flex-row sm:justify-between mt-8'>
                        <button onClick={() => sendMessage()} className='py-1 px-6 bg-indigo-600 text-white rounded hover:bg-indigo-400'>
                            送信
                        </button>
                        <a href='/user-profile' className='py-1 px-6 bg-indigo-600 text-white rounded hover:bg-indigo-400'>
                            キャンセル
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMessage