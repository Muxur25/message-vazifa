import BaseError from '@/error/baseError'
import tokenModel from '@/models/token.model'
import { isJwtPayload } from '@/utils/jwtGuard'
import jwt from 'jsonwebtoken'

class TokenService {
	genereteToken(username: any = {}) {
		const refreshToken = jwt.sign(
			{ username },
			process.env.SECRET_JWD as string,
			{
				expiresIn: '30d',
			}
		)

		return refreshToken
	}

	async saveToken(userId: string, refreshToken: string) {
		const isUser = await tokenModel.findOne({ user: userId })
		if (isUser) {
			isUser.refreshToken = refreshToken
			return await isUser.save()
		}
		const token = await tokenModel.create({ user: userId, refreshToken })
		return token
	}

	async saveTokenCall(userId: string, refreshToken: string) {
		const isUser = await tokenModel.findOne({ call: userId })
		if (isUser) {
			isUser.refreshToken = refreshToken
			return await isUser.save()
		}
		const token = await tokenModel.create({ call: userId, refreshToken })
		return token
	}

	validateToken(refreshToken: string) {
		const isToken = jwt.verify(refreshToken, process.env.SECRET_JWD as string)
		if (!isJwtPayload(isToken)) {
			throw BaseError.Uniautoregister()
		}

		return isToken
	}

	async removeToken(refreshToken: string) {
		await tokenModel.findOneAndDelete({ refreshToken })
	}

	async findToken(refreshToken: string) {
		return await tokenModel.findOne({ refreshToken })
	}
}

export default new TokenService()
