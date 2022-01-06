const express = require ('express')

const router = express.Router()

//
const { regsiterUsingEmailActivation, accountActivation, loginUser } = require ('../../controllers/auth/index')


//
const { runvalidator, loginValidator } = require('../../validators/index')

router.post('/create-new-user', runvalidator, regsiterUsingEmailActivation)
router.post('/account-activation', accountActivation)
router.post('/login-user', loginValidator, loginUser)



module.exports = router