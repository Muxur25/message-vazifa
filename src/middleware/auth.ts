import BaseError from '@/error/baseError'
import { NextFunction, Request, Response } from 'express'
import jwd from 'jsonwebtoken'

export default function (req: Request, res: Response, next: NextFunction) {
	if (!req.headers.authorization) {
		throw BaseError.Uniautoregister()
	}

	const token = req.headers.authorization.split(' ')[1]
	if (!token) {
		throw BaseError.Uniautoregister()
	}
	const isToken = jwd.verify(token, process.env.SECRET_JWD as string)
	if (!isToken) {
		throw BaseError.Uniautoregister()
	}

	req.user = isToken
	next()
}
