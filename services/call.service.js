const BaseError = require('../error/baseError')
const callModel = require('../models/callCenter.model')
const bcrypt = require('bcryptjs')
const jwd = require('jsonwebtoken')

class CallService {
	async callRegister(username, password, password2) {
		if (!username || !password) {
			throw BaseError.Error('Username or password not entered')
		}
		if (password !== password2) {
			throw BaseError.Error('Passwordla mos mas')
		}

		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(password, salt)
		const data = await callModel.create({ username, password: hashPassword })
		const token = jwd.sign({ ...data }, process.env.SECRET_JWD)
		return { data, token }
	}

	async callLogin(username, password) {
		if (!username || !password) {
			throw BaseError.Error('Username or password not entered')
		}
		const isUser = await callModel.findOne({ username })

		if (!username) {
			throw BaseError.Error('Username is not defained')
		}

		const isPassword = await bcrypt.compare(password, isUser.password)

		if (!isPassword) {
			throw BaseError.Error('Password xato')
		}

		const token = jwd.sign({ ...isUser }, process.env.SECRET_JWD)
		return { isUser, token }
	}
}

module.exports = new CallService()
