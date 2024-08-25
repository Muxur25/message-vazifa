const BaseError = require('../error/baseError')

module.exports = function (err, req, res, next) {
	if (err instanceof BaseError) {
		return res.status(err.status).json({
			message: err.message,
			error: err.error,
		})
	}

	return res.status(501).json({
		message: 'server error',
	})
}
