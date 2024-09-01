export default class BaseError extends Error {
	status
	error
	constructor(status: number, message: string, error: any = []) {
		super(message)
		this.status = status
		this.error = error
	}

	static Uniautoregister() {
		return new BaseError(401, 'Unautoregister')
	}

	static Error(message: string, error: any = []) {
		return new BaseError(400, message, error)
	}
}
