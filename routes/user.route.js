const { Router } = require('express')
const { signUpCtrl, loginCtrl } = require('../controller/user.controller')
const { auth } = require('../middleware/auth')
const { validate } = require('../middleware/validate')
const { findUserById } = require('../model/user.model')
const { loginSchema } = require('../schemas/login.schema')
const { signupSchema } = require('../schemas/signup.schema')
const router = Router()


router.post('/login', validate(loginSchema), loginCtrl)

router.post('/signup', validate(signupSchema), signUpCtrl)

router.get('/account', auth, async (request, response) =>{
    const user = await findUserById(request.id)
 
    response.json({ success: true, user: user.userId })
})

module.exports = router