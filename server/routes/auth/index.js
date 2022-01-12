const express = require ('express')

const router = express.Router()

// import methods from controller
const { regsiterUsingEmailActivation, accountActivation, loginUser, createUserProfile,updateUserProfile, getUserProfile, deleteUserProfile } = require ('../../controllers/auth/index')

// import validator
const { runvalidator, loginValidator, userProfileDataValidator } = require('../../validators/index')

// import middleware
const { ifUserAuth } = require ('../../Authorization/authMiddleware')

router.post('/create-new-user', runvalidator, regsiterUsingEmailActivation)
router.post('/account-activation', accountActivation)
router.post('/login-user', loginValidator, loginUser)
router.post('/create-user-profile', userProfileDataValidator, createUserProfile)
router.post('/update-user-profile', userProfileDataValidator, updateUserProfile)
router.get('/get-user-profile', getUserProfile)
router.delete('/delete-user-profile', deleteUserProfile)



module.exports = router