import BaseError from '@/error/baseError'
import roomModel from '@/models/room.model'
import userModel from '@/models/user.model'
import bcrypt from 'bcryptjs'
import tokenService from './token.service'

class UserService {
	async register(username: string, password: string, password2: string) {
		if (!username || !password) {
			throw BaseError.Error('Username or password not entered')
		}
		if (password !== password2) {
			throw BaseError.Error('Passwordla mos mas')
		}

		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(password, salt)
		const data = await userModel.create({ username, password: hashPassword })
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
		await tokenService.saveToken(stringId, token)
		return { data, token }
	}

	async login(username: string, password: string) {
		if (!username || !password) {
			throw BaseError.Error('Username or password not entered')
		}
		const isUser = await userModel.findOne({ username })

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

		let isRoom = await roomModel.findOne({ userId: isUser._id })
		if (!isRoom) {
			isRoom = await roomModel.create({ userId: isUser._id })
		}
		const stringId: string = isUser._id.toHexString()
		const token = tokenService.genereteToken(isUser.username)
		await tokenService.saveToken(stringId, token)

		return { isUser, token, isRoom }
	}

	async logout(refreshToken: string) {
		const user = tokenService.validateToken(refreshToken)
		const isUser = await userModel.findOne({ username: user.username })
		if (!isUser) {
			throw BaseError.Uniautoregister()
		}
		const stringId: string = isUser._id.toHexString()
		await roomModel.findOneAndDelete({ userId: stringId })
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

		const user = await userModel.findOne({ username: validate.username })
		if (!user) {
			throw BaseError.Error('Bomadi')
		}
		const stringId: string = user._id.toHexString()
		const token = tokenService.genereteToken(user.username)
		await tokenService.saveToken(stringId, token)
		return { user, token }
	}
}

export default new UserService()
