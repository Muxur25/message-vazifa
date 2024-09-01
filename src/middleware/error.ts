import BaseError from '@/error/baseError'
import { NextFunction, Request, Response } from 'express'

export function errorMiddleware(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof BaseError) {
		return res.status(err.status).json({
			message: err.message,
			error: err.error,
		})
	}

	console.error(err.message)
	return res.status(501).json({
		message: 'server error',
	})
}
