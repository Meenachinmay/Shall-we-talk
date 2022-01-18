import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Profile = () => {

    const [values, setValues] = useState({
        gender:'',
        profile_image:'',
        company_name:'',
        company_profile:'',
        skills: '',
        introduction:'',
        user_status:'',
        username:'',
        password:'',
        email:''
    })

    const authState = useSelector(userAuth => userAuth)
    const user = authState.userAuth.user._id

    const { gender, company_name, company_profile, profile_image, introduction, skills, user_status } = values

    const handleChange = (name) => (event) =>{
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios({
          method: 'POST',
          url: `http://localhost:8000/apiV1/create-user-profile`,
          data: { user, gender, company_name, company_profile, profile_image, introduction, skills, user_status }
        })
        .then(response => {
            console.log(response.data.userProfile)
        })
        .catch(error => {
            console.error(error)
        })
    }

  return (
    <>
    <form>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mt-20 max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Create or Update your profile here</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div className='mb-2'>
                    <label htmlFor="text" className="sr-only">
                    Gender
                    </label>
                    <input
                    onChange={handleChange('gender')} 
                    value={gender}
                    id="gender"
                    name="gender"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="gender"
                    />
                </div>
                <div style={{marginBottom: '8px'}}>
                  <label htmlFor="company_name" className="sr-only">
                    Company Name
                  </label>
                  <input
                    onChange={handleChange('company_name')} 
                    value={company_name}
                    id="company_name"
                    name="company_name"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Company name"
                  />
                </div>
                <div style={{marginBottom: '8px'}}>
                  <label htmlFor="text" className="sr-only">
                    Company Profile
                  </label>
                  <input
                      onChange={handleChange('company_profile')} 
                      value={company_profile}
                      id="company_profile"
                      name="company_profile"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Company Profile"
                  />
                </div>
                <div style={{marginBottom: '8px'}}>
                  <label htmlFor="text" className="sr-only">
                    Profile image
                  </label>
                  <input
                      onChange={handleChange('profile_image')} 
                      value={profile_image}
                      id="profile_image"
                      name="profile_image"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="profile_image"
                  />
                </div>
                <div style={{marginBottom: '8px'}}>
                  <label htmlFor="text" className="sr-only">
                    Introduction
                  </label>
                  <input
                      onChange={handleChange('introduction')} 
                      value={introduction}
                      id="introduction"
                      name="introduction"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="introduction"
                  />
                </div>
                <div style={{marginBottom: '8px'}}>
                  <label htmlFor="text" className="sr-only">
                    Skills
                  </label>
                  <input
                      onChange={handleChange('skills')} 
                      value={skills}
                      id="skills"
                      name="skills"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Skills"
                  />
                </div>
                <div style={{marginBottom: '8px'}}>
                  <label htmlFor="text" className="sr-only">
                    User status
                  </label>
                  <input
                      onChange={handleChange('user_status')} 
                      value={user_status}
                      id="user_status"
                      name="user_status"
                      type="user_status"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="user_status"
                  />
                </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create or update
              </button>
            </div>
          </form>
        </div>
      </div>
      </form>
    </>
  )
}

export default Profile