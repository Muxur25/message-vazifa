import userController from '@/controllers/user.controller'
import { Router } from 'express'

const router = Router()

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/login', userController.getLoginPage)

router.get('/logout', userController.logOut)

router.get('/refresh', userController.refresh)

export default router
