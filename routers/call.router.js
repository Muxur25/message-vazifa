const { Router } = require('express')
const auth = require('../middleware/auth')
const callController = require('../controllers/call.controller')

const router = Router()

router.post('/login', callController.login)

router.post('/register', callController.register)

module.exports = router
