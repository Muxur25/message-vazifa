const jwd = require('jsonwebtoken')
const BaseError = require('../error/baseError')

module.exports = function (req, res, next) {
	if (!req.headers.authorization) {
		throw new BaseError.Uniautoregister()
	}

	const token = req.headers.authorization.split(' ')[1]
	if (!token) {
		throw new BaseError.Uniautoregister()
	}
	const isToken = jwd.verify(token, process.env.SECRET_JWD)
	if (!isToken) {
		throw new BaseError.Uniautoregister()
	}

	req.user = isToken
	next()
}
