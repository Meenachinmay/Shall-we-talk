import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const navigate = useNavigate()
    const receiver_name = "チンメイ"
    const receiver_id = 1234
    return (
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-center'>
            <div className='mt-12 w-3/4 p-8 bg-white border-1 shadow-lg rounded-lg'>
                <a href='/edit-profile' className='flex justify-end text-sm text-gray-400 hover:underline hover:text-indigo-600 cursor-pointer'>プロフィールを編集する</a>
                <div className='flex flex-col items-center justify-center pt-10 text-center'>
                    <img className="shrink-0 w-20 h-20 sm:w-32 sm:h-32 rounded-full" 
                        src='https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png' alt=''/>
                    <h1 className='text-gray-800 font-semibold text-sm sm:text-xl mt-5'>沈明</h1>
                    <h1 className='text-gray-400 text-xs sm:text-sm'>男子, ２０歳</h1>
                    <h1 className='text-gray-400 text-xs sm:text-sm'>リアルコネクト, IT企業</h1>
                    <h1 className='text-gray-400 text-xs sm:text-sm'>marketing, IT, sales, finance</h1>
                    <h1 className='text-gray-400 text-xs sm:text-sm p-4'>
                        私はアメリカで生まれ、10歳のときに日本に来ました。幼いころからパソコンに興味はあったものの、英語教師を目指していた為大学では外国語を専攻して、
                        イギリス文学を勉強しながら教員免許を取得しました。しかし、大学を卒業するころにはプログラミングに興味をもち、
                        文理問わず新入社員を受け入れてくれる会社に就職しました。本格的にプログラミングを始めたのは24歳からです。
                    </h1>
                </div>
                <div className='flex items-center justify-between p-4'>
                    <div className='flex items-center space-x-2'>
                        <button onClick={() => alert('Call send request API from backend')} className='text-xs text-gray-800 py-1 px-2 border-2 border-indigo-600 cursor-pointer 
                        hover:border-indigo-400 duration-500 rounded-md'>リクエスト送信</button>
                        {'/'}
                        <button onClick={() => navigate(`/send-message/${receiver_name}/${receiver_id}`)} className='text-xs text-gray-800 py-1 px-2 border-2 border-indigo-600 cursor-pointer
                         hover:border-indigo-400 duration-500 rounded-md'>メッセージ送信</button>
                    </div>
                    <div>
                        <div className='text-xs text-gray-800 py-1 px-2 border-2 border-indigo-600 cursor-pointer
                         hover:border-indigo-400 duration-500 rounded-md'>
                            ステータス情報
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default UserProfile