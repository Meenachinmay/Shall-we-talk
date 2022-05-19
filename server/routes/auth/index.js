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
        sendRequest,
        loadSingleUser,
        sendUserDataForRequests,
        createNewRoom,
        getAllTheRooms,
        occupiyARoom
 } = require ('../../controllers/auth/index')

// import validator
const { runvalidator, loginValidator, userProfileDataValidator } = require('../../validators/index')

// import middleware
const { authenticated } = require ('../../Authorization/authMiddleware')

router.post('/create-new-user', runvalidator, regsiterUsingEmailActivation)
router.post('/account-activation', accountActivation)
router.post('/login-user', loginValidator, loginUser)
router.post('/create-user-profile', authenticated, userProfileDataValidator, createUserProfile)
router.post('/update-user-profile', authenticated, userProfileDataValidator, updateUserProfile)
router.post('/get-user-profile', authenticated, getUserProfile)
router.get('/get-all-logged-in-users', authenticated, getAllLoggedInUsers)
router.delete('/delete-user-profile', authenticated, deleteUserProfile)
router.delete('/logout-user', authenticated, logoutUser)
router.post('/change-status', authenticated, changeStatus)
router.post('/send-request', authenticated, sendRequest)
router.post('/load-user', authenticated, loadSingleUser)
router.post('/pending-request-user-data', authenticated, sendUserDataForRequests)
router.post('/create-a-new-room', authenticated, createNewRoom)
router.get('/get-all-the-rooms', authenticated, getAllTheRooms)
router.post('/occupiy-a-room', authenticated, occupiyARoom)



module.exports = router