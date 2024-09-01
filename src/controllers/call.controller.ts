import { NextFunction, Request, Response } from 'express'

import callService from '@/services/call.service'

class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { username, password, password2 } = req.body
			const data = await callService.register(username, password, password2)
			res.cookie('refreshToken', data.token, {
				httpOnly: false,
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			res.json(data)
		} catch (error) {
			console.error(error)
			next(error)
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { username, password } = req.body
			const data = await callService.login(username, password)
			res.cookie('refreshToken', data.token, {
				httpOnly: false,
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			res.json(data)
		} catch (error) {
			next(error)
		}
	}

	async getLoginPage(req: Request, res: Response, next: NextFunction) {
		try {
			res.render('index')
		} catch (error) {
			next(error)
		}
	}

	async logOut(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies
			res.clearCookie('refreshToken')
			const { message } = await callService.logout(refreshToken)
			res.json(message)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies
			const data = await callService.refresh(refreshToken)
			res.cookie('refreshToken', data.token, {
				httpOnly: false,
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			res.json(data)
		} catch (error) {
			next(error)
		}
	}

	async activeRoom(req: Request, res: Response, next: NextFunction) {
		const data = await callService.activeRoom()
		res.json(data)
	}
}

export default new UserController()
