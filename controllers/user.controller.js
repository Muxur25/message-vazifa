const userService = require('../services/user.service')

class UserController {
	async register(req, res, next) {
		try {
			const { username, password, password2 } = req.body
			const data = await userService.register(username, password, password2)
			res.json(data)
		} catch (error) {
			next(error)
		}
	}
	async login(req, res, next) {
		try {
			const { username, password } = req.body
			const data = await userService.login(username, password)
			res.json(data)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController()
