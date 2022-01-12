import React from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios'

const Home = () => {
    
    const authState = useSelector(userAuth => userAuth)
    const user = authState.userAuth.user._id
    const handleSubmit = () => {
        axios({
            method: 'POST',
            url: `http://localhost:8000/apiV1/get-user-profile`,
            data: { user }
          })
          .then(response => {
              console.log(response.data.userProfile)
          })
          .catch(error => {
              console.error(error)
          })
    }
    return (
        <div className=''>
            <div className='p-5 bg-blue-800 mt-48'>
                <p className='mx-auto text-center text-white font-semibold'>This application will help you to talk to strangers at the place where you are, This is a business app.</p>
                <button className='flex mx-auto bg-white text-center mt-2 rounded p-2 text-blue-800' onClick={handleSubmit}>Get profile</button>
            </div>
        </div>
    )
}

export default Home