const { response } = require('express')
const { request } = require('express')
const { Router } = require('express')
const { signUpCtrl, loginCtrl } = require('../controller/user.controller')
const { auth } = require('../middleware/auth')
const { findUserById } = require('../model/user.model')
const router = Router()


router.post('/login', loginCtrl)

router.post('/signup', signUpCtrl)

router.get('/account', auth, async (request, response) =>{
    const user = await findUserById(request.id)
 
    response.json({ success: true, user: user.userId })
})

module.exports = router