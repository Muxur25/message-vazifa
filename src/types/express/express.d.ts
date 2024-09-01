import { JwtPayload } from 'jsonwebtoken'

declare global {
	namespace Express {
		interface Request {
			user?: string | JwtPayload // JWT verify natijasini mos tip bilan kiritasiz
			isAdmin?: string | any
		}
	}
}
