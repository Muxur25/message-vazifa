import { JwtPayload } from 'jsonwebtoken'

export function isJwtPayload(
	payload: string | JwtPayload
): payload is JwtPayload {
	return typeof payload !== 'string'
}
