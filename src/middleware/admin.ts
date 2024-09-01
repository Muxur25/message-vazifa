import BaseError from '@/error/baseError'
import callCenterModel from '@/models/callCenter.model'
import tokenService from '@/services/token.service'
import { NextFunction, Request, Response } from 'express'

export async function adminMiddle(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { refreshToken } = req.cookies
	const isToken = tokenService.validateToken(refreshToken)
	if (!isToken) {
		throw BaseError.Uniautoregister()
	}
	const isAdmin = await callCenterModel.findOne({ username: isToken.username })
	if (!isAdmin) {
		return res.status(400).json({ message: 'Siz admin emassiz' })
	}
	next()
}
