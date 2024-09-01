import callController from '@/controllers/call.controller'
import { adminMiddle } from '@/middleware/admin'
import { Router } from 'express'

const router = Router()

router.post('/register', callController.register)

router.post('/login', callController.login)

router.get('/login', callController.getLoginPage)

router.get('/logout', callController.logOut)

router.get('/refresh', callController.refresh)

router.get('/all-room', adminMiddle, callController.activeRoom)

export default router
