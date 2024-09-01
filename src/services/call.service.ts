const BaseError = require('../error/baseError')
import callModel from '@/models/callCenter.model'
import roomModel from '@/models/room.model'
import bcrypt from 'bcryptjs'
import tokenService from './token.service'

class CallService {
	async register(username: string, password: string, password2: string) {
		if (!username || !password) {
			throw BaseError.Error('Username or password not entered')
		}
		if (password !== password2) {
			throw BaseError.Error('Passwordla mos mas')
		}

		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(password, salt)
		const data = await callModel.create({ username, password: hashPassword })
		if (!data) {
			throw BaseError.Uniautoregister()
		}
		const secret = process.env.SECRET_JWD
		if (!secret) {
			throw BaseError.Error('Topilmadi')
		}
		if (!data) {
			throw BaseError.Uniautoregister()
		}
		const stringId: string = data._id.toHexString()
		const token = tokenService.genereteToken(data.username)
		await tokenService.saveTokenCall(stringId, token)
		return { data, token }
	}

	async login(username: string, password: string) {
		if (!username || !password) {
			throw BaseError.Error('Username or password not entered')
		}
		const isUser = await callModel.findOne({ username })

		if (!isUser) {
			throw BaseError.Error('Username is not defained')
		}

		const isPassword = await bcrypt.compare(password, isUser.password)

		if (!isPassword) {
			throw BaseError.Error('Password xato')
		}

		const secret = process.env.SECRET_JWD
		if (!secret) {
			throw BaseError.Error('Topilmadi')
		}
		const stringId: string = isUser._id.toHexString()
		const token = tokenService.genereteToken(isUser.username)
		await tokenService.saveTokenCall(stringId, token)

		return { isUser, token }
	}

	async logout(refreshToken: string) {
		await tokenService.removeToken(refreshToken)
		return { message: 'Logout' }
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw BaseError.Uniautoregister()
		}
		const validate = tokenService.validateToken(refreshToken)
		const findToken = await tokenService.findToken(refreshToken)
		if (!validate || !findToken) {
			throw BaseError.Error('Xato')
		}
		console.log(validate)

		const user = await callModel.findOne({ username: validate.username })
		if (!user) {
			throw BaseError.Error('Bomadi')
		}
		const stringId: string = user._id.toHexString()
		const token = tokenService.genereteToken(user.username)
		await tokenService.saveTokenCall(stringId, token)
		return { user, token }
	}

	async activeRoom() {
		const activeRoom = await roomModel
			.find({ status: 'active' })
			.populate('userId')

		return activeRoom
	}
}

export default new CallService()
