const express = require ('express')

const router = express.Router()

// import methods from controller
const { regsiterUsingEmailActivation, 
        accountActivation, 
        loginUser, 
        createUserProfile, 
        updateUserProfile, 
        getUserProfile, 
        deleteUserProfile, 
        getAllLoggedInUsers, 
        logoutUser,
        changeStatus,
        sendRequest
 } = require ('../../controllers/auth/index')

// import validator
const { runvalidator, loginValidator, userProfileDataValidator } = require('../../validators/index')

// import middleware
const { ifUserAuth } = require ('../../Authorization/authMiddleware')

router.post('/create-new-user', runvalidator, regsiterUsingEmailActivation)
router.post('/account-activation', accountActivation)
router.post('/login-user', loginValidator, loginUser)
router.post('/create-user-profile', userProfileDataValidator, createUserProfile)
router.post('/update-user-profile', ifUserAuth, userProfileDataValidator, updateUserProfile)
router.post('/get-user-profile', ifUserAuth, getUserProfile)
router.get('/get-all-logged-in-users', getAllLoggedInUsers)
router.delete('/delete-user-profile', ifUserAuth, deleteUserProfile)
router.delete('/logout-user', ifUserAuth, logoutUser)
router.post('/change-status', changeStatus)
router.post('/send-request', sendRequest)



module.exports = router