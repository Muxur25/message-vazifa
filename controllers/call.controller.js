const callService = require('../services/call.service')

class CallController {
	async register(req, res, next) {
		try {
			const { username, password, password2 } = req.body
			const data = await callService.callRegister(username, password, password2)
			res.json(data)
		} catch (error) {
			next(error)
		}
	}
	async login(req, res, next) {
		try {
			const { username, password } = req.body
			const data = await callService.callLogin(username, password)
			res.json(data)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new CallController()
